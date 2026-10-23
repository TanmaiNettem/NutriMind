import { MealAnalysisResult, ChatMessage, AssistantAIResponse, MacroTotals, AssistantResponseType } from '../types';

export interface AnalyzeMealRequestOptions {
  input: string;
  history?: ChatMessage[];
  currentMeal?: MealAnalysisResult | null;
  sessionMeals?: MealAnalysisResult[];
  sessionTotals?: MacroTotals | null;
}

export interface AssistantChatRequestOptions {
  input: string;
  history?: ChatMessage[];
  sessionMeals?: MealAnalysisResult[];
  sessionTotals?: MacroTotals | null;
  currentMeal?: MealAnalysisResult | null;
}

export async function chatWithNutritionAI({
  input,
  history = [],
  sessionMeals = [],
  sessionTotals = null,
  currentMeal = null
}: AssistantChatRequestOptions): Promise<AssistantAIResponse> {
  const sanitizedHistory = history.slice(-8).map((msg) => ({
    sender: msg.sender,
    text: msg.text,
    responseType: msg.responseType,
    analysis: msg.analysis
      ? {
          mealName: msg.analysis.mealName,
          mealType: msg.analysis.mealType,
          totals: msg.analysis.totals
        }
      : undefined
  }));

  const sanitizedSessionMeals = sessionMeals.map((m) => ({
    id: m.id,
    mealName: m.mealName,
    mealType: m.mealType,
    totals: m.totals,
    foods: m.foods.map((f) => ({ name: f.name, portion: f.estimatedPortion, calories: f.calories, protein: f.protein }))
  }));

  const response = await fetch('/api/assistant/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: input.trim(),
      history: sanitizedHistory,
      sessionMeals: sanitizedSessionMeals,
      sessionTotals,
      currentMeal: currentMeal
        ? {
            id: currentMeal.id,
            mealName: currentMeal.mealName,
            mealType: currentMeal.mealType,
            foods: currentMeal.foods,
            totals: currentMeal.totals
          }
        : null
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get assistant response');
  }

  const data = await response.json();

  const responseType: AssistantResponseType = (data.responseType as AssistantResponseType) || 'meal_analysis';

  let mealResult: MealAnalysisResult | undefined = undefined;
  if (
    (responseType === 'meal_analysis' ||
      responseType === 'meal_correction' ||
      responseType === 'clarification') &&
    data.foods &&
    Array.isArray(data.foods) &&
    data.foods.length > 0
  ) {
    mealResult = {
      id: currentMeal?.id && responseType === 'meal_correction'
        ? currentMeal.id
        : `meal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userInput: input,
      mealName: data.mealName || (currentMeal?.mealName ? `Updated: ${currentMeal.mealName}` : 'Logged Meal'),
      mealType: data.mealType || (currentMeal?.mealType || 'Lunch'),
      foods: data.foods.map((f: any) => ({
        name: String(f.name || 'Food item'),
        estimatedPortion: String(f.estimatedPortion || '1 serving'),
        rawComponents: Array.isArray(f.rawComponents) ? f.rawComponents : [],
        calories: Math.max(0, Math.round(Number(f.calories) || 0)),
        protein: Math.max(0, Math.round(Number(f.protein) || 0)),
        carbs: Math.max(0, Math.round(Number(f.carbs) || 0)),
        fat: Math.max(0, Math.round(Number(f.fat) || 0)),
        fiber: Math.max(0, Math.round(Number(f.fiber) || 0))
      })),
      totals: {
        calories: Math.max(0, Math.round(Number(data.totals?.calories) || 0)),
        protein: Math.max(0, Math.round(Number(data.totals?.protein) || 0)),
        carbs: Math.max(0, Math.round(Number(data.totals?.carbs) || 0)),
        fat: Math.max(0, Math.round(Number(data.totals?.fat) || 0)),
        fiber: Math.max(0, Math.round(Number(data.totals?.fiber) || 0))
      },
      assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
      nutritionInsight: data.nutritionInsight || 'A wholesome meal with essential nutrients.',
      focusAreas: Array.isArray(data.focusAreas) ? data.focusAreas : ['Overall Meal Balance'],
      assistantMessage: data.assistantMessage,
      isCorrection: !!data.isCorrection || responseType === 'meal_correction',
      clarificationQuestion: data.clarificationQuestion || null
    };
  }

  return {
    responseType,
    assistantMessage: data.assistantMessage || 'I have analyzed your request.',
    meal: mealResult,
    mealName: data.mealName,
    mealType: data.mealType,
    foods: data.foods,
    totals: data.totals,
    assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
    nutritionInsight: data.nutritionInsight,
    focusAreas: Array.isArray(data.focusAreas) ? data.focusAreas : [],
    isCorrection: !!data.isCorrection || responseType === 'meal_correction',
    clarificationQuestion: data.clarificationQuestion || null,
    structuredSummary: data.structuredSummary,
    suggestedFollowUps: Array.isArray(data.suggestedFollowUps) ? data.suggestedFollowUps : []
  };
}

export async function analyzeMealWithAI(options: AnalyzeMealRequestOptions): Promise<MealAnalysisResult> {
  const result = await chatWithNutritionAI(options);
  if (result.meal) {
    return result.meal;
  }
  // Fallback construction if model answered purely conversationally
  return {
    id: `meal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    userInput: options.input,
    mealName: result.mealName || 'Logged Meal',
    mealType: result.mealType || 'Other',
    foods: result.foods || [],
    totals: result.totals || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    assumptions: result.assumptions || [],
    nutritionInsight: result.nutritionInsight || 'Nutritional breakdown processed.',
    focusAreas: result.focusAreas || ['Overall Meal Balance'],
    assistantMessage: result.assistantMessage,
    isCorrection: !!result.isCorrection,
    clarificationQuestion: result.clarificationQuestion || null
  };
}
