import { MealSample, BenefitItem, WorkflowStep } from '../types';

export const HERO_SAMPLE_MEAL: MealSample = {
  id: 'chicken-rice-bowl',
  name: 'Chicken Rice Bowl',
  category: 'Balanced Lunch',
  description: 'Grilled chicken breast with steamed jasmine rice, lightly seasoned edamame and sesame glaze.',
  calories: 620,
  protein: 38,
  carbs: 72,
  fat: 18,
  fiber: 4,
  focusInsight: {
    headline: 'Nutrition Focus',
    advice: "You're doing well on protein. Consider adding more vegetables and fiber.",
  },
  rawIngredients: [
    { name: 'Grilled Chicken Breast', portion: '150 g', kcal: 245 },
    { name: 'Cooked Jasmine Rice', portion: '180 g', kcal: 230 },
    { name: 'Steamed Edamame & Sesame', portion: '60 g', kcal: 85 },
    { name: 'Olive Oil & Glaze', portion: '1 tbsp', kcal: 60 },
  ],
};

export const ALTERNATE_MEAL_SAMPLES: MealSample[] = [
  HERO_SAMPLE_MEAL,
  {
    id: 'salmon-quinoa',
    name: 'Wild Salmon & Warm Quinoa',
    category: 'Dinner',
    description: 'Baked Atlantic salmon filet, fluffy tri-color quinoa, roasted asparagus, and lemon vinaigrette.',
    calories: 540,
    protein: 36,
    carbs: 48,
    fat: 20,
    fiber: 7,
    focusInsight: {
      headline: 'Omega-3 & Micronutrients',
      advice: 'Exceptional healthy fats and steady energy. High potassium and magnesium balance achieved.',
    },
    rawIngredients: [
      { name: 'Wild Atlantic Salmon', portion: '140 g', kcal: 260 },
      { name: 'Cooked Quinoa', portion: '130 g', kcal: 160 },
      { name: 'Roasted Asparagus & Garlic', portion: '90 g', kcal: 45 },
      { name: 'Cold-pressed Olive Oil', portion: '1 tsp', kcal: 75 },
    ],
  },
  {
    id: 'lentil-sourdough',
    name: 'Hearty Lentil Soup & Sourdough',
    category: 'Plant-Forward Lunch',
    description: 'Slow-simmered brown lentils with mirepoix herbs and a slice of toasted artisanal sourdough.',
    calories: 460,
    protein: 24,
    carbs: 76,
    fat: 6,
    fiber: 15,
    focusInsight: {
      headline: 'Fiber Powerhouse',
      advice: 'Contains over 50% of daily recommended fiber, promoting smooth digestion and satiety.',
    },
    rawIngredients: [
      { name: 'Cooked Brown Lentils', portion: '200 g', kcal: 230 },
      { name: 'Vegetable Mirepoix Broth', portion: '150 ml', kcal: 50 },
      { name: 'Artisan Sourdough Slice', portion: '60 g', kcal: 150 },
      { name: 'Fresh Herbs & Touch of Oil', portion: '1 dash', kcal: 30 },
    ],
  },
];

export const BENEFITS_ITEMS: BenefitItem[] = [
  {
    id: 'b1',
    title: 'Simple Food Logging',
    description: 'Enter meals naturally instead of searching through huge, complicated food databases.',
    iconName: 'utensils',
  },
  {
    id: 'b2',
    title: 'AI-Powered Analysis',
    description: 'Your meal is interpreted and broken into likely food components and portion estimates.',
    iconName: 'sparkles',
  },
  {
    id: 'b3',
    title: 'Macro Insights',
    description: 'Understand calories, protein, carbohydrates, and fats in clear perspective at a single glance.',
    iconName: 'pie-chart',
  },
  {
    id: 'b4',
    title: 'Actionable Guidance',
    description: 'Get simple, constructive suggestions about what your nutrition may be missing for daily vitality.',
    iconName: 'lightbulb',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    badge: 'Input',
    title: 'Tell Us What You Ate',
    description: 'Describe your meal naturally, just like you would tell a friend. No barcodes or tedious weights required.',
  },
  {
    stepNumber: '02',
    badge: 'Deconstruction',
    title: 'AI Breaks It Down',
    description: 'The AI identifies likely ingredients, estimated portions, cooking preparations, and nutritional components.',
  },
  {
    stepNumber: '03',
    badge: 'Clarity',
    title: 'Understand Your Nutrition',
    description: 'See estimated calories and macros along with a quick, supportive, nutrition-focused recommendation.',
  },
];

export const PREVIEW_CONVERSATION = {
  userQuery: 'I had two chapatis, chicken curry and a bowl of curd for dinner.',
  aiGreeting: "Here's an estimated breakdown of your meal.",
  mealName: 'Two Chapatis, Chicken Curry & Curd',
  components: [
    { name: 'Whole Wheat Chapatis', portion: '2 medium (approx. 90g)', calories: 210, protein: 7, carbs: 42, fat: 2 },
    { name: 'Chicken Curry (Onion-Tomato Base)', portion: '1 medium cup (~200g)', calories: 270, protein: 24, carbs: 8, fat: 15 },
    { name: 'Fresh Plain Curd / Dahi', portion: '1 small bowl (~120g)', calories: 95, protein: 5, carbs: 6, fat: 5 },
  ],
  totals: {
    calories: 575,
    protein: 36,
    carbs: 56,
    fat: 22,
    fiber: 5,
  },
  quickInsight: {
    title: 'Quick Insight',
    text: 'Good protein intake. Adding a serving of vegetables or a fiber-rich side could make this meal more balanced.',
  },
};
