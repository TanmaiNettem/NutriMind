import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import {
  MealAnalysisResult,
  ChatMessage,
  MacroTotals,
  DashboardTab,
  AssistantAIResponse,
  SavedConversation
} from '../types';
import { chatWithNutritionAI } from '../services/nutritionAI';
import { useAuth } from './AuthContext';
import {
  syncUserProfile,
  saveMealToFirestore,
  loadUserMealsFromFirestore,
  updateMealInFirestore,
  deleteMealFromFirestore,
  saveConversationHeader,
  saveConversationMessage,
  loadUserConversations,
  loadConversationMessages,
  getLocalDateString
} from '../services/firestoreService';

const SESSION_MESSAGES_KEY = 'nutrimind_session_messages';
const CURRENT_CONVERSATION_KEY = 'nutrimind_current_conv_id';

interface NutritionContextType {
  meals: MealAnalysisResult[];
  todaysMeals: MealAnalysisResult[];
  dailyTotals: MacroTotals;
  messages: ChatMessage[];
  conversations: SavedConversation[];
  activeConversationId: string;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isLoading: boolean;
  isInitialLoading: boolean;
  processingStage: 'understanding' | 'breaking_down' | 'estimating' | 'complete';
  errorMessage: string | null;
  saveStatusMessage: string | null;
  lastPrompt: string;
  activeCorrectionMeal: MealAnalysisResult | null;
  setActiveCorrectionMeal: (meal: MealAnalysisResult | null) => void;
  processUserMessage: (text: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
  loadMeals: () => Promise<void>;
  refreshMeals: () => Promise<void>;
  addMeal: (meal: MealAnalysisResult) => Promise<void>;
  updateMeal: (id: string, updated: Partial<MealAnalysisResult>) => Promise<void>;
  removeMeal: (id: string) => Promise<void>;
  retrySaveMeal: (meal: MealAnalysisResult) => Promise<void>;
  clearSession: () => void;
  startNewConversation: () => void;
  selectConversation: (convId: string) => Promise<void>;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('assistant');

  // Core Persistent State
  const [meals, setMeals] = useState<MealAnalysisResult[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    try {
      return sessionStorage.getItem(CURRENT_CONVERSATION_KEY) || `conv_${Date.now()}`;
    } catch {
      return `conv_${Date.now()}`;
    }
  });

  // In-memory chat messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_MESSAGES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<
    'understanding' | 'breaking_down' | 'estimating' | 'complete'
  >('understanding');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [activeCorrectionMeal, setActiveCorrectionMeal] = useState<MealAnalysisResult | null>(null);

  // In-flight saving mutex to prevent duplicate Firestore meal writes
  const savingMealIdsRef = useRef<Set<string>>(new Set());

  // Keep active conversation ID in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(CURRENT_CONVERSATION_KEY, activeConversationId);
    } catch {
      // ignore
    }
  }, [activeConversationId]);

  // Keep messages in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Sync User Profile and Load Meals from Firestore on User Auth change
  useEffect(() => {
    let isCancelled = false;

    async function initializeUserData() {
      if (!user) {
        // User logged out: clear in-memory and session state completely
        setMeals([]);
        setMessages([]);
        setConversations([]);
        setActiveCorrectionMeal(null);
        setErrorMessage(null);
        setSaveStatusMessage(null);
        setIsInitialLoading(false);
        try {
          sessionStorage.removeItem(SESSION_MESSAGES_KEY);
          sessionStorage.removeItem(CURRENT_CONVERSATION_KEY);
        } catch {
          // ignore
        }
        return;
      }

      setIsInitialLoading(true);
      setErrorMessage(null);

      try {
        // 1. Sync user profile document (users/{uid})
        await syncUserProfile({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });

        if (isCancelled) return;

        // 2. Load meals from Firestore (users/{uid}/meals)
        const firestoreMeals = await loadUserMealsFromFirestore(user.uid);

        if (isCancelled) return;

        // 3. Migration check: if session had un-saved temporary meals, migrate them
        let mergedMeals = [...firestoreMeals];
        try {
          const oldSession = sessionStorage.getItem('nutrimind_session_meals');
          if (oldSession) {
            const parsedSession = JSON.parse(oldSession);
            if (Array.isArray(parsedSession) && parsedSession.length > 0) {
              for (const tempMeal of parsedSession) {
                // If not already in firestore
                if (!mergedMeals.some((m) => m.id === tempMeal.id || m.mealName === tempMeal.mealName)) {
                  try {
                    const saved = await saveMealToFirestore(user.uid, tempMeal);
                    mergedMeals.unshift(saved);
                  } catch {
                    // ignore migration item failure
                  }
                }
              }
              sessionStorage.removeItem('nutrimind_session_meals');
            }
          }
        } catch {
          // ignore
        }

        if (!isCancelled) {
          setMeals(mergedMeals);
        }

        // 4. Load recent conversations
        const convs = await loadUserConversations(user.uid);
        if (!isCancelled) {
          setConversations(convs);
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Failed to load user data from Firestore:', err);
          setErrorMessage(err?.message || "Couldn't load your meals. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsInitialLoading(false);
        }
      }
    }

    initializeUserData();

    return () => {
      isCancelled = true;
    };
  }, [user]);

  // Determine Today's Meals based on user's local date
  const todaysMeals = useMemo<MealAnalysisResult[]>(() => {
    const todayStr = getLocalDateString();
    return meals.filter((meal) => {
      if (meal.dateString) {
        return meal.dateString === todayStr;
      }
      return true; // fallback to include if dateString not yet populated
    });
  }, [meals]);

  // Calculate Daily Totals deterministically from today's actual saved meals
  const dailyTotals = useMemo<MacroTotals>(() => {
    return todaysMeals.reduce<MacroTotals>(
      (acc, meal) => ({
        calories: Math.round(acc.calories + (meal.totals?.calories || 0)),
        protein: Math.round(acc.protein + (meal.totals?.protein || 0)),
        carbs: Math.round(acc.carbs + (meal.totals?.carbs || 0)),
        fat: Math.round(acc.fat + (meal.totals?.fat || 0)),
        fiber: Math.round(acc.fiber + (meal.totals?.fiber || 0))
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  }, [todaysMeals]);

  // Refresh meals from Firestore
  const loadMeals = useCallback(async () => {
    if (!user) return;
    try {
      setIsInitialLoading(true);
      const loaded = await loadUserMealsFromFirestore(user.uid);
      setMeals(loaded);
    } catch (err: any) {
      setErrorMessage(err?.message || "Couldn't load your meals. Please try again.");
    } finally {
      setIsInitialLoading(false);
    }
  }, [user]);

  const refreshMeals = loadMeals;

  // Save or Add Meal with Deduplication and Optimistic UI
  const addMeal = useCallback(
    async (meal: MealAnalysisResult) => {
      if (!user) return;
      const mealId = meal.id || `meal_${Date.now()}`;
      if (savingMealIdsRef.current.has(mealId)) {
        return; // Prevent duplicate write
      }
      savingMealIdsRef.current.add(mealId);

      const optimisticMeal: MealAnalysisResult = {
        ...meal,
        id: mealId,
        dateString: meal.dateString || getLocalDateString(),
        saveStatus: 'saving'
      };

      // Optimistically add to UI
      setMeals((prev) => [optimisticMeal, ...prev.filter((m) => m.id !== mealId)]);
      setSaveStatusMessage('Saving meal to cloud...');

      try {
        const savedMeal = await saveMealToFirestore(user.uid, optimisticMeal);
        setMeals((prev) =>
          prev.map((m) => (m.id === mealId ? { ...savedMeal, saveStatus: 'saved' } : m))
        );
        setSaveStatusMessage('Saved to Cloud');
        setTimeout(() => setSaveStatusMessage(null), 3000);
      } catch (err: any) {
        console.error('Failed to save meal:', err);
        setMeals((prev) =>
          prev.map((m) => (m.id === mealId ? { ...m, saveStatus: 'error' } : m))
        );
        setSaveStatusMessage("Meal analyzed, but not saved.");
        setErrorMessage("Your meal was analyzed, but we couldn't save it. Please try again.");
      } finally {
        savingMealIdsRef.current.delete(mealId);
      }
    },
    [user]
  );

  // Retry saving a failed meal
  const retrySaveMeal = useCallback(
    async (meal: MealAnalysisResult) => {
      await addMeal(meal);
    },
    [addMeal]
  );

  // Update existing meal in Firestore
  const updateMeal = useCallback(
    async (id: string, updated: Partial<MealAnalysisResult>) => {
      // Optimistic update
      setMeals((prev) =>
        prev.map((meal) => (meal.id === id ? { ...meal, ...updated, saveStatus: 'saving' } : meal))
      );

      if (user) {
        try {
          await updateMealInFirestore(user.uid, id, updated);
          setMeals((prev) =>
            prev.map((meal) => (meal.id === id ? { ...meal, saveStatus: 'saved' } : meal))
          );
        } catch (err: any) {
          console.error('Failed to update meal in Firestore:', err);
          setErrorMessage("Couldn't update your meal in the cloud. Please try again.");
        }
      }
    },
    [user]
  );

  // Delete meal from Firestore and local state
  const removeMeal = useCallback(
    async (id: string) => {
      // Optimistically remove from local state
      setMeals((prev) => prev.filter((m) => m.id !== id));
      setMessages((prev) =>
        prev.map((msg) => (msg.analysis?.id === id ? { ...msg, analysis: undefined } : msg))
      );
      if (activeCorrectionMeal?.id === id) {
        setActiveCorrectionMeal(null);
      }

      if (user) {
        try {
          await deleteMealFromFirestore(user.uid, id);
        } catch (err: any) {
          console.error('Failed to delete meal from Firestore:', err);
          setErrorMessage("Couldn't delete your meal from the cloud. Please try again.");
          // Reload meals on failure to synchronize state
          loadMeals();
        }
      }
    },
    [user, activeCorrectionMeal, loadMeals]
  );

  // Reset chat messages
  const clearSession = useCallback(() => {
    setMessages([]);
    setActiveCorrectionMeal(null);
    setErrorMessage(null);
    setSaveStatusMessage(null);
    try {
      sessionStorage.removeItem(SESSION_MESSAGES_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Start a fresh conversation
  const startNewConversation = useCallback(() => {
    const newId = `conv_${Date.now()}`;
    setActiveConversationId(newId);
    clearSession();
  }, [clearSession]);

  // Select an existing conversation
  const selectConversation = useCallback(
    async (convId: string) => {
      if (!user) return;
      setActiveConversationId(convId);
      try {
        setIsLoading(true);
        const msgs = await loadConversationMessages(user.uid, convId);
        setMessages(msgs);
      } catch (err) {
        console.warn('Could not switch conversation:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  // Conversational AI message processor
  const processUserMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setErrorMessage(null);
      setSaveStatusMessage(null);
      setLastPrompt(trimmed);
      setIsLoading(true);
      setProcessingStage('understanding');

      const userMessageId = `user-${Date.now()}`;
      const assistantMessageId = `assistant-${Date.now()}`;

      const userMessage: ChatMessage = {
        id: userMessageId,
        sender: 'user',
        text: trimmed,
        timestamp: new Date()
      };

      const pendingAssistantMessage: ChatMessage = {
        id: assistantMessageId,
        sender: 'assistant',
        text: '',
        timestamp: new Date(),
        isProcessing: true,
        stage: 'understanding'
      };

      setMessages((prev) => [...prev, userMessage, pendingAssistantMessage]);

      // Save user message to Firestore conversation subcollection if authenticated
      if (user) {
        saveConversationHeader(user.uid, activeConversationId, trimmed.slice(0, 40));
        saveConversationMessage(user.uid, activeConversationId, userMessage);
      }

      // Progressive visual stages
      const stage1 = setTimeout(() => {
        setProcessingStage('breaking_down');
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessageId ? { ...m, stage: 'breaking_down' } : m))
        );
      }, 450);

      const stage2 = setTimeout(() => {
        setProcessingStage('estimating');
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessageId ? { ...m, stage: 'estimating' } : m))
        );
      }, 850);

      try {
        // Send today's actual Firestore meals & totals as context
        const response: AssistantAIResponse = await chatWithNutritionAI({
          input: trimmed,
          history: messages,
          sessionMeals: todaysMeals,
          sessionTotals: dailyTotals,
          currentMeal: activeCorrectionMeal
        });

        clearTimeout(stage1);
        clearTimeout(stage2);
        setProcessingStage('complete');

        let resolvedMeal: MealAnalysisResult | undefined = response.meal;

        // Process meal persistence if Gemini returned a structured meal analysis
        if (response.meal) {
          if (response.isCorrection && activeCorrectionMeal) {
            // Update existing meal
            const updatedMeal: MealAnalysisResult = {
              ...response.meal,
              id: activeCorrectionMeal.id,
              dateString: activeCorrectionMeal.dateString || getLocalDateString(),
              saveStatus: 'saving'
            };
            resolvedMeal = updatedMeal;

            // Update in local state
            setMeals((prev) =>
              prev.map((m) => (m.id === activeCorrectionMeal.id ? updatedMeal : m))
            );

            // Persist update to Firestore
            if (user) {
              setSaveStatusMessage('Updating meal in cloud...');
              try {
                await updateMealInFirestore(user.uid, activeCorrectionMeal.id, updatedMeal);
                setMeals((prev) =>
                  prev.map((m) =>
                    m.id === activeCorrectionMeal.id ? { ...m, saveStatus: 'saved' } : m
                  )
                );
                setSaveStatusMessage('Saved');
                setTimeout(() => setSaveStatusMessage(null), 3000);
              } catch (err: any) {
                console.error('Failed to update meal in Firestore:', err);
                setSaveStatusMessage('Not saved');
                setErrorMessage("Your meal correction was analyzed, but we couldn't save it.");
              }
            }
          } else {
            // Add new analyzed meal
            const newMeal: MealAnalysisResult = {
              ...response.meal,
              id: response.meal.id || `meal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              dateString: getLocalDateString(),
              saveStatus: user ? 'saving' : 'saved'
            };
            resolvedMeal = newMeal;

            // Add to local state immediately
            setMeals((prev) => [newMeal, ...prev]);

            // Persist to Firestore
            if (user) {
              setSaveStatusMessage('Saving...');
              try {
                const saved = await saveMealToFirestore(user.uid, newMeal);
                setMeals((prev) =>
                  prev.map((m) => (m.id === newMeal.id ? { ...saved, saveStatus: 'saved' } : m))
                );
                setSaveStatusMessage('Saved');
                setTimeout(() => setSaveStatusMessage(null), 3000);
              } catch (err: any) {
                console.error('Firestore save failed:', err);
                setMeals((prev) =>
                  prev.map((m) => (m.id === newMeal.id ? { ...m, saveStatus: 'error' } : m))
                );
                setSaveStatusMessage('Not saved');
                setErrorMessage("Your meal was analyzed, but we couldn't save it. Please try again.");
              }
            }
          }
        }

        // Reset active correction
        setActiveCorrectionMeal(null);

        // Finalize assistant message
        const finalAssistantMessage: ChatMessage = {
          id: assistantMessageId,
          sender: 'assistant',
          text: response.assistantMessage,
          responseType: response.responseType,
          analysis: resolvedMeal,
          isProcessing: false,
          stage: 'complete',
          suggestedFollowUps: response.suggestedFollowUps,
          structuredSummary: response.structuredSummary,
          timestamp: new Date()
        };

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessageId ? finalAssistantMessage : m))
        );

        // Persist assistant message in conversation subcollection
        if (user) {
          saveConversationMessage(user.uid, activeConversationId, finalAssistantMessage);
        }
      } catch (err: any) {
        clearTimeout(stage1);
        clearTimeout(stage2);
        console.error('Nutrition assistant error:', err);
        const errText =
          err?.message || 'Unable to connect to nutrition assistant. Please try again.';
        setErrorMessage(errText);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));
      } finally {
        setIsLoading(false);
      }
    },
    [
      isLoading,
      messages,
      todaysMeals,
      dailyTotals,
      activeCorrectionMeal,
      user,
      activeConversationId
    ]
  );

  const retryLastMessage = useCallback(async () => {
    if (lastPrompt) {
      await processUserMessage(lastPrompt);
    }
  }, [lastPrompt, processUserMessage]);

  const value = {
    meals,
    todaysMeals,
    dailyTotals,
    messages,
    conversations,
    activeConversationId,
    activeTab,
    setActiveTab,
    isLoading,
    isInitialLoading,
    processingStage,
    errorMessage,
    saveStatusMessage,
    lastPrompt,
    activeCorrectionMeal,
    setActiveCorrectionMeal,
    processUserMessage,
    retryLastMessage,
    loadMeals,
    refreshMeals,
    addMeal,
    updateMeal,
    removeMeal,
    retrySaveMeal,
    clearSession,
    startNewConversation,
    selectConversation
  };

  return <NutritionContext.Provider value={value}>{children}</NutritionContext.Provider>;
};

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
