import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genAIClient = new GoogleGenAI({ apiKey });
    }
  }
  return genAIClient;
}

const SYSTEM_NUTRITION_PROMPT = `
You are NutriMind, an expert clinical AI nutrition companion and conversational food analyst.
Your mission is to understand what users eat from conversational, natural language descriptions and transform it into structured, transparent, and encouraging nutritional intelligence throughout the user's day.

CORE ROLES & INTERACTION TYPES:
You must determine the appropriate interaction type and set "responseType" accordingly:

1. "meal_analysis":
   - Triggered when the user logs food or describes what they ate (e.g., "I had two idlis and sambar", "I had a banana and milk", "I also had one boiled egg").
   - Decompose every identified food item into:
     * name and familiar portion (e.g. "2 pieces (~100g)", "1 cup (~180g)", "1 medium bowl")
     * rawComponents: likely ingredients/components (e.g. ["Parboiled rice", "Urad dal", "Salt", "Water"])
     * calories, protein, carbs, fat, fiber (rounded to sensible whole numbers)
   - Populate "mealName", "mealType" ("Breakfast" | "Lunch" | "Dinner" | "Snack" | "Other"), "foods", "totals", "assumptions", "nutritionInsight", "focusAreas".
   - Set "isCorrection": false.

2. "meal_correction":
   - Triggered when the user corrects, refines, or adjusts a previous meal (e.g. "Actually, the chicken was only 80g, not 150", "The rice was only half a cup", "I had 3 chapatis, not 2").
   - Modify the previous meal, recalculate all macros, explain the adjustment warmly in "assistantMessage".
   - Set "isCorrection": true and provide the revised meal in "foods" and "totals".

3. "daily_summary":
   - Triggered when the user asks for their daily summary or what they ate today (e.g., "What have I eaten today?", "Show me my nutrition summary", "Summary of today").
   - Review the logged session meals and current totals provided in the context.
   - Deliver a clear, motivating summary in "assistantMessage" detailing the meals logged, total energy, and macro distribution. Set foods: [].

4. "nutrition_question":
   - Triggered when the user asks about their macro totals or current nutrition status (e.g., "How much protein have I had?", "Am I getting enough fiber today?", "How are my carbs?").
   - Directly answer with the exact session figure from the context and provide supportive clinical context. Set foods: [].

5. "meal_feedback":
   - Triggered when the user asks for feedback on a meal (e.g., "Was my lunch balanced?", "Is this a good meal?").
   - Analyze the meal's macronutrient balance, highlight positive nutrients (e.g. lean protein, complex carbs), and gently suggest any complementary additions (e.g. fiber, vegetables, hydration). Set foods: [].

6. "meal_suggestion":
   - Triggered when the user asks for meal ideas (e.g., "What should I eat for dinner?", "What's a good snack?").
   - Review what has been logged today so far, and suggest 2-3 realistic, delicious meals/snacks that fill any current nutritional gaps (such as extra fiber or protein). Set foods: [].

7. "general_question":
   - Triggered by general nutrition or science questions (e.g., "Why is protein important?", "What are good plant-based iron sources?").
   - Provide a concise, educational, and evidence-based answer without generating an empty meal card. Set foods: [].

8. "out_of_scope":
   - Triggered when the user asks about topics completely unrelated to food, health, or nutrition (e.g., "Write me a Java program", "Write a Python script", "What is quantum physics?").
   - Respond politely: "I'm your NutriMind nutrition assistant, so I'm best at helping with food and nutrition. Feel free to tell me what you've eaten or ask about your macros!" Set foods: [].

9. "clarification":
   - Triggered when the user gives a very ambiguous food description with no portion that materially alters estimation (e.g. "I ate rice.").
   - Make a standard reference estimate (~1 cup cooked rice, ~200 kcal), and ask in "clarificationQuestion": "Approximately how much rice did you have — 1/2 cup, 1 cup, or a larger portion?"

STRONG GLOBAL & INDIAN CUISINE UNDERSTANDING:
- Deep expertise in Indian home-cooked & restaurant dishes (Idli, Dosa, Vada, Upma, Poha, Pongal, Biryani, Pulao, Dal, Sambar, Rasam, Curd, Buttermilk, Paneer, Chapatis, Roti, Paratha, Chicken curry, Fish curry, Egg dishes, Sabzi, Chutneys, etc.) as well as global cuisines.

ESTIMATION & CLINICAL SAFETY DIRECTIVES:
- Conservatively round numbers: whole numbers for calories and grams (e.g. ~420 kcal, 24 g protein). Never use false decimals like 418.37 kcal.
- Clearly differentiate user-supplied facts from AI assumptions in the "assumptions" list.
- Positive, non-judgmental, practical language. Never shame or guilt the user.
- NO UNIVERSAL TARGETS: Never assume an arbitrary 2,000 kcal target or tell users they failed a target.
- CRITICAL MEDICAL SAFETY:
  * Never diagnose diseases.
  * Never prescribe medications or suggest altering medical treatments.
  * Never encourage starvation, dangerous calorie restriction (<1200 kcal diets), or eating disorder behavior.
  * Recommend consulting a qualified healthcare professional for medical or chronic conditions.

STRICT JSON OUTPUT FORMAT:
Respond ONLY with a JSON object adhering to this schema:
{
  "responseType": "meal_analysis" | "meal_correction" | "daily_summary" | "nutrition_question" | "meal_feedback" | "meal_suggestion" | "general_question" | "out_of_scope" | "clarification",
  "assistantMessage": "Warm, direct 1-3 sentence conversational response.",
  "mealName": "Title of meal (only if meal_analysis, meal_correction, or clarification)",
  "mealType": "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Other",
  "foods": [
    {
      "name": "Food item name",
      "estimatedPortion": "e.g., 2 medium pieces (~100g)",
      "rawComponents": ["Ingredients"],
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "fiber": number
    }
  ],
  "totals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number
  },
  "assumptions": ["Assumption 1", "Assumption 2"],
  "nutritionInsight": "Helpful, constructive 1-2 sentence nutrition insight.",
  "focusAreas": ["Protein", "Fiber"],
  "isCorrection": boolean,
  "clarificationQuestion": null or "Short question if key detail is missing",
  "suggestedFollowUps": ["Follow up prompt 1", "Follow up prompt 2"]
}
`;

// Sensible rule-based fallback if API key is not yet set up or during rate limits
function generateSmartFallback(
  input: string,
  sessionMeals: any[] = [],
  sessionTotals: any = null,
  currentMeal: any = null
) {
  const lower = input.toLowerCase().trim();

  // Out of scope check
  if (
    lower.includes('java') ||
    lower.includes('python') ||
    lower.includes('code') ||
    lower.includes('programming') ||
    lower.includes('html') ||
    lower.includes('javascript') ||
    lower.includes('capital of') ||
    lower.includes('write a poem')
  ) {
    return {
      responseType: 'out_of_scope',
      assistantMessage:
        "I'm your NutriMind nutrition assistant, so I'm best at helping with food and nutrition. Feel free to tell me what you've eaten or ask about your macros!",
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      nutritionInsight: '',
      focusAreas: [],
      isCorrection: false,
      clarificationQuestion: null
    };
  }

  // Protein / nutrient question
  if (lower.includes('protein') && (lower.includes('how much') || lower.includes('check') || lower.includes('have i had'))) {
    const proteinCount = sessionTotals?.protein ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.protein || 0), 0);
    return {
      responseType: 'nutrition_question',
      assistantMessage: `You've logged approximately ${proteinCount}g of protein today across ${sessionMeals.length} ${sessionMeals.length === 1 ? 'meal' : 'meals'}.`,
      nutritionInsight:
        proteinCount > 40
          ? 'Your protein intake is on a steady track today, supporting muscle maintenance and steady satiety.'
          : 'Consider adding a protein source like lentils, eggs, curd, paneer, or tofu to your upcoming meal.',
      focusAreas: ['Protein', 'Muscle Maintenance'],
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      isCorrection: false,
      clarificationQuestion: null,
      suggestedFollowUps: ['What should I eat for dinner?', 'Check my fiber']
    };
  }

  // Daily summary check
  if (
    lower.includes('what have i eaten') ||
    lower.includes('what did i eat') ||
    lower.includes('today summary') ||
    lower.includes('nutrition summary') ||
    lower.includes('summary of today')
  ) {
    const totalCals = sessionTotals?.calories ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.calories || 0), 0);
    const totalProtein = sessionTotals?.protein ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.protein || 0), 0);
    const totalCarbs = sessionTotals?.carbs ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.carbs || 0), 0);
    const totalFat = sessionTotals?.fat ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.fat || 0), 0);
    const totalFiber = sessionTotals?.fiber ?? sessionMeals.reduce((acc, m) => acc + (m.totals?.fiber || 0), 0);

    const mealNames = sessionMeals.map((m) => m.mealName).join(', ');

    return {
      responseType: 'daily_summary',
      assistantMessage: sessionMeals.length > 0
        ? `Today you have logged ${sessionMeals.length} ${sessionMeals.length === 1 ? 'meal' : 'meals'}: ${mealNames}. Your current intake is ~${totalCals} kcal (${totalProtein}g protein, ${totalCarbs}g carbs, ${totalFat}g fat, ${totalFiber}g fiber).`
        : "You haven't logged any meals today yet. Tell me what you've had for breakfast or lunch to get started!",
      nutritionInsight: sessionMeals.length > 0
        ? 'Great job keeping track! Consistency is the foundation of mindful eating.'
        : 'Starting your day with balanced nutrition sets the tone for sustained energy.',
      focusAreas: ['Daily Balance', 'Mindful Tracking'],
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      isCorrection: false,
      clarificationQuestion: null,
      suggestedFollowUps: ['How much protein have I had?', 'What should I focus on?']
    };
  }

  // Focus question
  if (lower.includes('what should i focus on') || lower.includes('focus area') || lower.includes('priority')) {
    const fiber = sessionTotals?.fiber || 0;
    const protein = sessionTotals?.protein || 0;

    let focusAdvice = 'Aim for steady hydration and wholesome, minimally processed food.';
    let focusBadge = 'Overall Meal Balance';
    if (fiber < 15) {
      focusAdvice = 'Your fiber intake is currently on the lower side. Adding vegetables, fruits, lentils, or chia seeds to your next meal will support digestion.';
      focusBadge = 'Fiber';
    } else if (protein < 30) {
      focusAdvice = 'Focus on adding a reliable protein source like eggs, Greek yogurt/curd, dal, or paneer with your next meal.';
      focusBadge = 'Protein';
    }

    return {
      responseType: 'nutrition_question',
      assistantMessage: `Based on your logged meals today, here is a practical focus area: ${focusAdvice}`,
      nutritionInsight: focusAdvice,
      focusAreas: [focusBadge, 'Hydration'],
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      isCorrection: false,
      clarificationQuestion: null,
      suggestedFollowUps: ['What should I eat for dinner?', 'Log another meal']
    };
  }

  // Meal suggestion for dinner or snack
  if (lower.includes('what should i eat') || lower.includes('dinner') || lower.includes('suggest') || lower.includes('recommend')) {
    return {
      responseType: 'meal_suggestion',
      assistantMessage:
        "For a balanced dinner that complements your day, consider: 1) Sautéed paneer or grilled chicken with a large vegetable stir-fry, or 2) A bowl of yellow dal tadka with one warm multigrain chapati and cucumber salad. Both provide lean protein and fiber for restful sleep.",
      nutritionInsight: 'Opting for moderate carbohydrates and ample vegetables in the evening aids comfortable digestion.',
      focusAreas: ['Fiber', 'Lean Protein'],
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      isCorrection: false,
      clarificationQuestion: null,
      suggestedFollowUps: ['I had yellow dal and chapati', 'How much protein did I have?']
    };
  }

  // Meal feedback (e.g. "Was my lunch balanced?")
  if (lower.includes('balanced') || lower.includes('was my') || lower.includes('is this good')) {
    return {
      responseType: 'meal_feedback',
      assistantMessage:
        'Your meal provided a good energy foundation with satisfying carbohydrates and protein. To make it even more balanced, pairing it with crunchy raw vegetables or a squeeze of lemon enhances micronutrient absorption.',
      nutritionInsight: 'Balancing grains with colorful vegetables helps regulate blood glucose response.',
      focusAreas: ['Vegetables', 'Meal Balance'],
      foods: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      assumptions: [],
      isCorrection: false,
      clarificationQuestion: null
    };
  }

  // Ambiguous single food clarification (e.g. "I ate rice")
  if (lower === 'i ate rice' || lower === 'i had rice' || lower === 'rice' || lower === 'i ate rice.') {
    return {
      responseType: 'clarification',
      assistantMessage:
        "Rice is a staple energy source! To make sure your calorie and carb estimate is as accurate as possible, I've noted a standard 1-cup serving below.",
      mealName: 'Steamed Rice',
      mealType: 'Lunch',
      foods: [
        {
          name: 'Steamed White Rice',
          estimatedPortion: '1 cup (~160g)',
          rawComponents: ['Polished Rice', 'Water'],
          calories: 205,
          protein: 4,
          carbs: 45,
          fat: 0,
          fiber: 1
        }
      ],
      totals: { calories: 205, protein: 4, carbs: 45, fat: 0, fiber: 1 },
      assumptions: ['Standard 1-cup cooked white rice portion assumed.'],
      nutritionInsight: 'Pairing rice with dal, legumes, or vegetables lowers the glycemic impact of the meal.',
      focusAreas: ['Carbohydrate Balance'],
      isCorrection: false,
      clarificationQuestion: 'Approximately how much rice did you have — 1/2 cup, 1 cup, or a larger portion?'
    };
  }

  // Correction check (e.g. "half a cup", "80 grams", "actually")
  const isCorrection = lower.includes('actually') || lower.includes('only') || lower.includes('half a cup') || lower.includes('80g') || lower.includes('80 grams');

  // Meal analysis fallback
  let mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Other' = 'Lunch';
  if (lower.includes('breakfast') || lower.includes('idli') || lower.includes('dosa') || lower.includes('oats') || lower.includes('poha')) {
    mealType = 'Breakfast';
  } else if (lower.includes('dinner') || lower.includes('chapati') || lower.includes('roti')) {
    mealType = 'Dinner';
  } else if (lower.includes('snack') || lower.includes('tea') || lower.includes('coffee') || lower.includes('banana') || lower.includes('almond') || lower.includes('apple') || lower.includes('milk')) {
    mealType = 'Snack';
  }

  const foods: Array<{
    name: string;
    estimatedPortion: string;
    rawComponents: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  }> = [];

  if (lower.includes('idli')) {
    foods.push({
      name: 'Steamed Idli',
      estimatedPortion: '2 pieces (~100g)',
      rawComponents: ['Parboiled Rice', 'Urad Dal', 'Water', 'Salt'],
      calories: 130,
      protein: 4,
      carbs: 26,
      fat: 1,
      fiber: 2
    });
  }
  if (lower.includes('sambar')) {
    foods.push({
      name: 'Vegetable Sambar',
      estimatedPortion: '1 medium bowl (~150ml)',
      rawComponents: ['Toor Dal', 'Drumstick / Shallots', 'Tamarind', 'Spices & Mustard Seeds', 'Vegetable Oil'],
      calories: 120,
      protein: 5,
      carbs: 18,
      fat: 3,
      fiber: 4
    });
  }
  if (lower.includes('dosa')) {
    foods.push({
      name: 'Plain / Masala Dosa',
      estimatedPortion: '1 medium dosa',
      rawComponents: ['Rice-Lentil Batter', 'Potato Masala', 'Cooking Oil'],
      calories: 220,
      protein: 4,
      carbs: 32,
      fat: 8,
      fiber: 2
    });
  }
  if (lower.includes('chapati') || lower.includes('roti')) {
    const qty = lower.includes('3') ? 3 : (lower.includes('1') ? 1 : 2);
    foods.push({
      name: `Whole Wheat Chapati (×${qty})`,
      estimatedPortion: `${qty} medium chapatis (~${qty * 40}g)`,
      rawComponents: ['Whole Wheat Atta', 'Water', 'Drop of Oil/Ghee'],
      calories: qty * 105,
      protein: qty * 3.5,
      carbs: qty * 21,
      fat: qty * 1.5,
      fiber: qty * 2.5
    });
  }
  if (lower.includes('chicken') || lower.includes('curry')) {
    const portionGrams = lower.includes('80') ? '80g' : (lower.includes('60') ? '60g' : '150g');
    const calMult = lower.includes('80') ? 0.6 : (lower.includes('60') ? 0.45 : 1);
    foods.push({
      name: 'Chicken Preparation / Curry',
      estimatedPortion: `1 serving (~${portionGrams})`,
      rawComponents: ['Chicken Pieces', 'Onion', 'Tomato', 'Spices', 'Cooking Oil'],
      calories: Math.round(260 * calMult),
      protein: Math.round(26 * calMult),
      carbs: Math.round(6 * calMult),
      fat: Math.round(14 * calMult),
      fiber: 1
    });
  }
  if (lower.includes('curd') || lower.includes('dahi') || lower.includes('raita')) {
    foods.push({
      name: 'Fresh Curd / Raita',
      estimatedPortion: '1 small bowl (~100g)',
      rawComponents: ['Whole/Toned Milk', 'Live Probiotic Culture'],
      calories: 80,
      protein: 4,
      carbs: 5,
      fat: 4,
      fiber: 0
    });
  }
  if (lower.includes('egg')) {
    foods.push({
      name: 'Boiled Egg',
      estimatedPortion: '1 large egg (~50g)',
      rawComponents: ['Egg White & Yolk'],
      calories: 78,
      protein: 6.5,
      carbs: 0.6,
      fat: 5.3,
      fiber: 0
    });
  }
  if (lower.includes('banana')) {
    foods.push({
      name: 'Fresh Banana',
      estimatedPortion: '1 medium banana (~118g)',
      rawComponents: ['Fresh Banana Fruit'],
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3,
      fiber: 3.1
    });
  }
  if (lower.includes('apple')) {
    foods.push({
      name: 'Fresh Apple',
      estimatedPortion: '1 medium apple (~150g)',
      rawComponents: ['Fresh Apple with skin'],
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      fiber: 4.4
    });
  }
  if (lower.includes('milk')) {
    foods.push({
      name: 'Warm Milk',
      estimatedPortion: '1 glass (~200ml)',
      rawComponents: ['Cow / Toned Milk'],
      calories: 120,
      protein: 6.5,
      carbs: 10,
      fat: 6,
      fiber: 0
    });
  }
  if (lower.includes('biryani')) {
    foods.push({
      name: 'Chicken Biryani',
      estimatedPortion: '1 plate (~350g)',
      rawComponents: ['Basmati Rice', 'Chicken Pieces', 'Biryani Spices', 'Cooking Oil/Ghee', 'Fried Onions'],
      calories: 520,
      protein: 22,
      carbs: 65,
      fat: 18,
      fiber: 3
    });
  }
  if (lower.includes('salad') || lower.includes('cucumber')) {
    foods.push({
      name: 'Fresh Cucumber Salad',
      estimatedPortion: '1 small bowl (~80g)',
      rawComponents: ['Sliced Cucumber', 'Lemon Juice', 'Coriander'],
      calories: 15,
      protein: 1,
      carbs: 3,
      fat: 0,
      fiber: 1
    });
  }

  // Default fallback if no specific food matched
  if (foods.length === 0) {
    foods.push({
      name: input.slice(0, 30) || 'Nutritious Meal',
      estimatedPortion: 'Standard single serving',
      rawComponents: ['Wholesome grain/protein mix', 'Seasonings', 'Cooking medium'],
      calories: 360,
      protein: 15,
      carbs: 45,
      fat: 11,
      fiber: 4
    });
  }

  const totals = foods.reduce(
    (acc, f) => ({
      calories: Math.round(acc.calories + f.calories),
      protein: Math.round(acc.protein + f.protein),
      carbs: Math.round(acc.carbs + f.carbs),
      fat: Math.round(acc.fat + f.fat),
      fiber: Math.round(acc.fiber + f.fiber)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return {
    responseType: isCorrection ? 'meal_correction' : 'meal_analysis',
    assistantMessage: isCorrection
      ? "Understood! I've updated your meal estimate with those adjusted quantities."
      : `Here is an estimated nutritional breakdown for your ${mealType.toLowerCase()}.`,
    mealName: foods.map((f) => f.name).join(' + '),
    mealType,
    foods,
    totals,
    assumptions: [
      'Calculated based on standard home-cooked preparation proportions.',
      'Cooking oil and seasonings estimated at typical modest restaurant/home levels.',
      'Portion weights are approximate; feel free to mention specific quantities for finer adjustment.'
    ],
    nutritionInsight: `This meal provides ~${totals.calories} kcal with a balanced distribution of macronutrients. Adding fresh greens or a crisp vegetable salad would boost your daily fiber further.`,
    focusAreas: ['Protein', 'Fiber', 'Overall Meal Balance'],
    isCorrection,
    clarificationQuestion: null,
    suggestedFollowUps: ['How much protein have I had today?', 'What should I eat for dinner?']
  };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString()
    });
  });

  // Assistant & AI Nutrition Analysis Shared Handler
  const handleNutritionChat = async (req: Request, res: Response) => {
    try {
      const { input, history = [], sessionMeals = [], sessionTotals = null, currentMeal = null } = req.body;

      if (!input || typeof input !== "string" || !input.trim()) {
        res.status(400).json({ error: "Please provide a valid query or meal description." });
        return;
      }

      const client = getGenAI();

      // If no Gemini key is provided, use smart rule-based fallback
      if (!client) {
        const fallback = generateSmartFallback(input, sessionMeals, sessionTotals, currentMeal);
        res.json(fallback);
        return;
      }

      // Build context prompt
      const contextMessages = Array.isArray(history)
        ? history.map((m: any) => `${m.sender === 'user' ? 'User' : 'NutriMind'}: ${m.text}`).join('\n')
        : '';

      const sessionMealsContext = Array.isArray(sessionMeals) && sessionMeals.length > 0
        ? sessionMeals.map((m: any, i: number) => `Meal ${i + 1} (${m.mealType || 'Meal'}): ${m.mealName} (~${m.totals?.calories || 0} kcal, ${m.totals?.protein || 0}g protein, ${m.totals?.carbs || 0}g carbs, ${m.totals?.fat || 0}g fat, ${m.totals?.fiber || 0}g fiber)`).join('\n')
        : 'No meals logged yet today.';

      const sessionTotalsContext = sessionTotals
        ? `Calories: ~${sessionTotals.calories || 0} kcal, Protein: ${sessionTotals.protein || 0}g, Carbs: ${sessionTotals.carbs || 0}g, Fat: ${sessionTotals.fat || 0}g, Fiber: ${sessionTotals.fiber || 0}g`
        : 'No totals accumulated yet.';

      const prompt = `
${SYSTEM_NUTRITION_PROMPT}

CONVERSATION CONTEXT (PREVIOUS TURNS IN THIS CHAT SESSION):
${contextMessages || 'None (New Session)'}

USER'S LOGGED MEALS TODAY IN THIS SESSION:
${sessionMealsContext}

USER'S ACCUMULATED TOTALS TODAY IN THIS SESSION:
${sessionTotalsContext}

${currentMeal ? `PREVIOUS MEAL BEING REFERENCED OR CORRECTED:
${JSON.stringify(currentMeal, null, 2)}` : ''}

CURRENT USER INPUT:
"${input}"

Respond ONLY with the strict JSON object adhering to the schema. Do NOT wrap in markdown fences or add explanatory text outside the JSON.
`;

      let responseText = '';
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
        responseText = response.text || '';
      } catch {
        // Fallback to flash-lite if 3.8-flash is experiencing demand spikes
        const fallbackResponse = await client.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
        responseText = fallbackResponse.text || '';
      }
      
      try {
        const parsed = JSON.parse(responseText.trim());
        res.json(parsed);
      } catch {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          res.json(parsed);
        } else {
          const fallback = generateSmartFallback(input, sessionMeals, sessionTotals, currentMeal);
          res.json(fallback);
        }
      }
    } catch (err: any) {
      console.log('Gemini generateContent error:', err?.message || err);
      const safeFallback = generateSmartFallback(
        req.body?.input || 'meal',
        req.body?.sessionMeals || [],
        req.body?.sessionTotals || null,
        req.body?.currentMeal || null
      );
      res.json(safeFallback);
    }
  };

  // Register both endpoints
  app.post("/api/assistant/chat", handleNutritionChat);
  app.post("/api/nutrition/analyze", handleNutritionChat);

  // Vite middleware setup (development) vs static files (production)
  const isProduction =
    process.env.NODE_ENV === "production" ||
    (typeof process.argv[1] === "string" && process.argv[1].includes("dist"));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NutriMind server listening on port ${PORT} (host: 0.0.0.0)`);
  });
}

startServer();
