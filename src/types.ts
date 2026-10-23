/**
 * NutriMind Types
 * Core application domain models for meals, nutrition, and assistant interactions.
 */

export interface MacroNutrient {
  name: string;
  amount: number;
  unit: string;
  percentage?: number;
  color: string;
  description: string;
}

export interface MealSample {
  id: string;
  name: string;
  category: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  focusInsight: {
    headline: string;
    advice: string;
  };
  rawIngredients: Array<{
    name: string;
    portion: string;
    kcal: number;
  }>;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'sparkles' | 'utensils' | 'pie-chart' | 'lightbulb';
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  badge: string;
}

// ==========================================
// Authenticated Dashboard & Conversational AI Types
// ==========================================

export type AssistantResponseType =
  | 'meal_analysis'
  | 'meal_correction'
  | 'daily_summary'
  | 'nutrition_question'
  | 'meal_feedback'
  | 'meal_suggestion'
  | 'general_question'
  | 'out_of_scope'
  | 'clarification';

export type DashboardTab = 'assistant' | 'dashboard' | 'meals' | 'insights';

export interface FoodItem {
  name: string;
  quantity?: number;
  estimatedPortion: string;
  rawComponents: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface MealAnalysisResult {
  id: string;
  timestamp: string;
  userInput: string;
  mealName: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other';
  foods: FoodItem[];
  totals: MacroTotals;
  assumptions: string[];
  nutritionInsight: string;
  focusAreas: string[];
  assistantMessage?: string;
  isCorrection?: boolean;
  clarificationQuestion?: string | null;
  dateString?: string;
  saveStatus?: 'saved' | 'saving' | 'error';
  createdAt?: any;
  updatedAt?: any;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt?: any;
  updatedAt?: any;
}

export interface SavedConversation {
  id: string;
  title: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface StructuredSummary {
  totals?: MacroTotals;
  mealsSummarized?: Array<{
    name: string;
    mealType: string;
    calories: number;
    protein?: number;
  }>;
  targetNutrient?: {
    name: string;
    amount: number;
    unit: string;
    commentary: string;
  };
}

export interface AssistantAIResponse {
  responseType: AssistantResponseType;
  assistantMessage: string;
  mealName?: string;
  mealType?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other';
  foods?: FoodItem[];
  totals?: MacroTotals;
  meal?: MealAnalysisResult;
  targetMealId?: string;
  assumptions?: string[];
  nutritionInsight?: string;
  focusAreas?: string[];
  isCorrection?: boolean;
  clarificationQuestion?: string | null;
  structuredSummary?: StructuredSummary;
  suggestedFollowUps?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  responseType?: AssistantResponseType;
  analysis?: MealAnalysisResult;
  isProcessing?: boolean;
  stage?: 'understanding' | 'breaking_down' | 'estimating' | 'complete';
  suggestedFollowUps?: string[];
  structuredSummary?: StructuredSummary;
}

