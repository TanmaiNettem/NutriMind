import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { MealAnalysisResult, FoodItem, MacroTotals, ChatMessage, SavedConversation, UserProfile } from '../types';

/**
 * Returns today's date in user's local timezone as YYYY-MM-DD.
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format a timestamp (Firestore Timestamp, Date, or string) into local date string YYYY-MM-DD.
 */
export function formatTimestampToLocalDate(ts: any): string {
  if (!ts) return getLocalDateString();
  if (ts instanceof Timestamp) {
    return getLocalDateString(ts.toDate());
  }
  if (ts instanceof Date) {
    return getLocalDateString(ts);
  }
  if (typeof ts === 'string' || typeof ts === 'number') {
    const d = new Date(ts);
    if (!isNaN(d.getTime())) {
      return getLocalDateString(d);
    }
  }
  return getLocalDateString();
}

/**
 * Format a timestamp into user-friendly time string (e.g., "12:30 PM").
 */
export function formatTimestampToTime(ts: any): string {
  if (!ts) {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  let d: Date;
  if (ts instanceof Timestamp) {
    d = ts.toDate();
  } else if (ts instanceof Date) {
    d = ts;
  } else {
    d = new Date(ts);
  }
  if (isNaN(d.getTime())) {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Validate and sanitize meal data prior to writing to Firestore.
 */
export function validateAndSanitizeMeal(
  meal: Partial<MealAnalysisResult>
): {
  mealName: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other';
  userInput: string;
  foods: FoodItem[];
  totals: MacroTotals;
  assumptions: string[];
  nutritionInsight: string;
  focusAreas: string[];
  dateString: string;
} {
  const rawName = String(meal.mealName || '').trim();
  const mealName = rawName.length > 0 ? rawName.slice(0, 100) : 'Logged Meal';

  const validTypes: Array<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other'> = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Other'
  ];
  let mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other' = 'Other';
  if (meal.mealType) {
    const matched = validTypes.find(
      (t) => t.toLowerCase() === String(meal.mealType).toLowerCase().trim()
    );
    if (matched) mealType = matched;
  }

  const userInput = String(meal.userInput || '').slice(0, 500);

  // Validate and sanitize food items
  const foods: FoodItem[] = Array.isArray(meal.foods)
    ? meal.foods.map((f) => ({
        name: String(f.name || 'Food item').slice(0, 80),
        estimatedPortion: String(f.estimatedPortion || '1 serving').slice(0, 50),
        rawComponents: Array.isArray(f.rawComponents)
          ? f.rawComponents.map((c) => String(c).slice(0, 50)).slice(0, 20)
          : [],
        calories: Math.max(0, Math.min(10000, Math.round(Number(f.calories) || 0))),
        protein: Math.max(0, Math.min(500, Math.round(Number(f.protein) || 0))),
        carbs: Math.max(0, Math.min(1000, Math.round(Number(f.carbs) || 0))),
        fat: Math.max(0, Math.min(500, Math.round(Number(f.fat) || 0))),
        fiber: Math.max(0, Math.min(200, Math.round(Number(f.fiber) || 0)))
      }))
    : [];

  // Validate and sanitize macronutrient totals
  const totals: MacroTotals = {
    calories: Math.max(0, Math.min(20000, Math.round(Number(meal.totals?.calories) || 0))),
    protein: Math.max(0, Math.min(1000, Math.round(Number(meal.totals?.protein) || 0))),
    carbs: Math.max(0, Math.min(2000, Math.round(Number(meal.totals?.carbs) || 0))),
    fat: Math.max(0, Math.min(1000, Math.round(Number(meal.totals?.fat) || 0))),
    fiber: Math.max(0, Math.min(300, Math.round(Number(meal.totals?.fiber) || 0)))
  };

  const assumptions = Array.isArray(meal.assumptions)
    ? meal.assumptions.map((a) => String(a).slice(0, 200)).slice(0, 10)
    : [];

  const nutritionInsight = String(
    meal.nutritionInsight || 'A wholesome meal contributing to your daily nutrition.'
  ).slice(0, 500);

  const focusAreas = Array.isArray(meal.focusAreas)
    ? meal.focusAreas.map((fa) => String(fa).slice(0, 50)).slice(0, 10)
    : [];

  const dateString = meal.dateString || getLocalDateString();

  return {
    mealName,
    mealType,
    userInput,
    foods,
    totals,
    assumptions,
    nutritionInsight,
    focusAreas,
    dateString
  };
}

/**
 * Ensure the authenticated user has a non-sensitive profile document in Firestore.
 */
export async function syncUserProfile(user: {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}): Promise<void> {
  if (!user.uid || !isFirebaseConfigured) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const existing = await getDoc(userRef);

    if (!existing.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(userRef, {
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        updatedAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn('Could not sync user profile to Firestore:', err);
  }
}

/**
 * Persist a validated meal to Firestore or local storage.
 */
export async function saveMealToFirestore(
  uid: string,
  meal: MealAnalysisResult
): Promise<MealAnalysisResult> {
  if (!uid) {
    throw new Error('User must be authenticated to save meals.');
  }

  const sanitized = validateAndSanitizeMeal(meal);
  const mealId = meal.id || `meal_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // If Firebase is not configured, save locally
  if (!isFirebaseConfigured) {
    try {
      const storageKey = `nutrimind_meals_${uid}`;
      const saved = localStorage.getItem(storageKey);
      const meals: any[] = saved ? JSON.parse(saved) : [];
      const updated = [{ ...sanitized, id: mealId, createdAt: new Date().toISOString() }, ...meals.filter(m => m.id !== mealId)];
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return {
      ...meal,
      ...sanitized,
      id: mealId,
      saveStatus: 'saved'
    };
  }

  const mealRef = doc(db, 'users', uid, 'meals', mealId);

  try {
    const payload = {
      ...sanitized,
      id: mealId,
      updatedAt: serverTimestamp()
    };

    // If this is a brand new meal record, attach createdAt
    const existingSnap = await getDoc(mealRef);
    if (!existingSnap.exists()) {
      (payload as any).createdAt = serverTimestamp();
    }

    await setDoc(mealRef, payload, { merge: true });

    return {
      ...meal,
      ...sanitized,
      id: mealId,
      saveStatus: 'saved'
    };
  } catch (err: any) {
    console.error('Firestore saveMeal error:', err);
    if (err?.code === 'permission-denied') {
      throw new Error('You do not have permission to save this meal.');
    }
    throw new Error("Your meal was analyzed, but we couldn't save it. Please try again.");
  }
}

/**
 * Fetch all meals for an authenticated user from Firestore or local storage.
 */
export async function loadUserMealsFromFirestore(uid: string): Promise<MealAnalysisResult[]> {
  if (!uid) return [];

  if (!isFirebaseConfigured) {
    try {
      const storageKey = `nutrimind_meals_${uid}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  }

  const mealsCol = collection(db, 'users', uid, 'meals');

  try {
    let snapshot;
    try {
      // Query with orderBy createdAt desc
      const q = query(mealsCol, orderBy('createdAt', 'desc'), limit(100));
      snapshot = await getDocs(q);
    } catch {
      // Fallback in case composite index is absent or building
      snapshot = await getDocs(mealsCol);
    }

    const meals: MealAnalysisResult[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const dateString = data.dateString || formatTimestampToLocalDate(data.createdAt);
      const timeString = formatTimestampToTime(data.createdAt);

      meals.push({
        id: docSnap.id,
        timestamp: timeString,
        userInput: data.userInput || '',
        mealName: data.mealName || 'Logged Meal',
        mealType: data.mealType || 'Other',
        foods: Array.isArray(data.foods) ? data.foods : [],
        totals: data.totals || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
        nutritionInsight: data.nutritionInsight || '',
        focusAreas: Array.isArray(data.focusAreas) ? data.focusAreas : [],
        dateString,
        saveStatus: 'saved',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    });

    // Ensure client-side sort by createdAt or timestamp desc
    meals.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });

    return meals;
  } catch (err: any) {
    console.error('Firestore loadMeals error:', err);
    if (err?.code === 'permission-denied') {
      throw new Error('You do not have permission to access this data.');
    }
    throw new Error("Couldn't load your meals. Please try again.");
  }
}

/**
 * Update an existing meal in Firestore or local storage.
 */
export async function updateMealInFirestore(
  uid: string,
  mealId: string,
  updates: Partial<MealAnalysisResult>
): Promise<void> {
  if (!uid || !mealId) return;

  if (!isFirebaseConfigured) {
    try {
      const storageKey = `nutrimind_meals_${uid}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const meals: any[] = JSON.parse(saved);
        const updated = meals.map(m => m.id === mealId ? { ...m, ...updates } : m);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    } catch {
      // ignore
    }
    return;
  }

  const mealRef = doc(db, 'users', uid, 'meals', mealId);

  try {
    const sanitized = validateAndSanitizeMeal(updates);
    await updateDoc(mealRef, {
      ...sanitized,
      updatedAt: serverTimestamp()
    });
  } catch (err: any) {
    console.error('Firestore updateMeal error:', err);
    if (err?.code === 'permission-denied') {
      throw new Error('You do not have permission to update this meal.');
    }
    throw new Error("Couldn't update your meal in the cloud. Please try again.");
  }
}

/**
 * Delete a meal from Firestore or local storage.
 */
export async function deleteMealFromFirestore(uid: string, mealId: string): Promise<void> {
  if (!uid || !mealId) return;

  if (!isFirebaseConfigured) {
    try {
      const storageKey = `nutrimind_meals_${uid}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const meals: any[] = JSON.parse(saved);
        localStorage.setItem(storageKey, JSON.stringify(meals.filter(m => m.id !== mealId)));
      }
    } catch {
      // ignore
    }
    return;
  }

  const mealRef = doc(db, 'users', uid, 'meals', mealId);

  try {
    await deleteDoc(mealRef);
  } catch (err: any) {
    console.error('Firestore deleteMeal error:', err);
    if (err?.code === 'permission-denied') {
      throw new Error('You do not have permission to delete this meal.');
    }
    throw new Error("Couldn't delete your meal. Please try again.");
  }
}

/**
 * Save an assistant conversation session for the user.
 */
export async function saveConversationHeader(
  uid: string,
  conversationId: string,
  title: string
): Promise<void> {
  if (!uid || !conversationId || !isFirebaseConfigured) return;

  try {
    const convRef = doc(db, 'users', uid, 'conversations', conversationId);
    await setDoc(
      convRef,
      {
        id: conversationId,
        title: title.slice(0, 100),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not save conversation header:', err);
  }
}

/**
 * Save a message into the conversation subcollection.
 */
export async function saveConversationMessage(
  uid: string,
  conversationId: string,
  message: ChatMessage
): Promise<void> {
  if (!uid || !conversationId || !message.id || !isFirebaseConfigured) return;

  try {
    const msgRef = doc(
      db,
      'users',
      uid,
      'conversations',
      conversationId,
      'messages',
      message.id
    );

    const payload: any = {
      id: message.id,
      role: message.sender,
      content: message.text || '',
      responseType: message.responseType || null,
      suggestedFollowUps: message.suggestedFollowUps || [],
      createdAt: serverTimestamp()
    };

    if (message.analysis) {
      payload.analysis = {
        id: message.analysis.id,
        mealName: message.analysis.mealName,
        mealType: message.analysis.mealType,
        totals: message.analysis.totals
      };
    }

    await setDoc(msgRef, payload, { merge: true });
  } catch (err) {
    console.warn('Could not save conversation message:', err);
  }
}

/**
 * Load recent conversation headers for the user.
 */
export async function loadUserConversations(uid: string): Promise<SavedConversation[]> {
  if (!uid || !isFirebaseConfigured) return [];
  try {
    const convCol = collection(db, 'users', uid, 'conversations');
    let snapshot;
    try {
      const q = query(convCol, orderBy('updatedAt', 'desc'), limit(15));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(convCol);
    }

    const conversations: SavedConversation[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      conversations.push({
        id: d.id,
        title: data.title || 'Conversation',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    });

    return conversations;
  } catch (err) {
    console.warn('Could not load conversations:', err);
    return [];
  }
}

/**
 * Load messages for a given conversation.
 */
export async function loadConversationMessages(
  uid: string,
  conversationId: string
): Promise<ChatMessage[]> {
  if (!uid || !conversationId || !isFirebaseConfigured) return [];
  try {
    const msgCol = collection(db, 'users', uid, 'conversations', conversationId, 'messages');
    let snapshot;
    try {
      const q = query(msgCol, orderBy('createdAt', 'asc'), limit(50));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(msgCol);
    }

    const messages: ChatMessage[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      messages.push({
        id: d.id,
        sender: data.role === 'user' ? 'user' : 'assistant',
        text: data.content || '',
        timestamp: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        responseType: data.responseType,
        suggestedFollowUps: data.suggestedFollowUps || []
      });
    });

    return messages;
  } catch (err) {
    console.warn('Could not load conversation messages:', err);
    return [];
  }
}