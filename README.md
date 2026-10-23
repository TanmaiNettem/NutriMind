# 🥗 NutriMind - AI Nutrition Companion & Food Analyst

NutriMind is a full-stack, intelligent clinical nutrition companion and conversational food analyst. It transforms natural language food descriptions into transparent macronutrient decompositions, tracks daily intake progress, and provides evidence-based, actionable dietary insights.

---

## ✨ Features

- **Natural Language Food Decomposition**: Describe your meals casually (e.g. *"2 idlis with sambar and filter coffee"* or *"grilled chicken breast with sweet potato and broccoli"*), and NutriMind automatically breaks down portion sizes, ingredients, and macronutrients.
- **Global & Indian Cuisine Intelligence**: Deep recognition of regional dishes, street foods, home cooking, and international cuisines.
- **Deterministic Macro Tracking**: Automatic calculation of Calories, Protein, Carbohydrates, Fat, and Dietary Fiber with clear assumptions.
- **Firebase Firestore Persistence**: Real-time cloud synchronization for meals and conversation history scoped securely to each user's profile.
- **Clinical Safety & Non-Judgmental Guidance**: Adheres to non-restrictive, evidence-backed nutritional guidance with zero guilt-based messaging.
- **Production-Ready Full-Stack Architecture**: Express server powering Gemini AI proxy routes with Vite React frontend and Tailwind CSS styling.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express, Google Gen AI SDK (`@google/genai`)
- **Database & Auth**: Google Cloud Firestore & Firebase Auth
- **Build Tools**: Vite 6, esbuild, TypeScript

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+)
- [Git](https://git-scm.com/)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/nutrimind.git
cd nutrimind
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build and Run in Production
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```text
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and build scripts
├── server.ts                   # Express backend with Gemini API proxy
├── vite.config.ts              # Vite configuration
├── firestore.rules             # Firestore security rules
├── firebase-blueprint.json     # Database schema definition
├── src/
│   ├── main.tsx                # Client application root
│   ├── App.tsx                 # Core layout and routing
│   ├── components/             # Reusable UI components
│   │   ├── ChatInterface.tsx   # Conversational meal input and messages
│   │   ├── MealCard.tsx        # Structured meal breakdown card
│   │   ├── DailyTotals.tsx     # Macro progress and visual gauges
│   │   ├── MealHistory.tsx     # Past meals view with deletion confirmation
│   │   └── Sidebar.tsx         # Conversation history and profile
│   ├── context/
│   │   ├── AuthContext.tsx     # Firebase authentication context
│   │   └── NutritionContext.tsx # Central state for meals, macros, and Firestore sync
│   └── services/
│       ├── geminiService.ts    # AI assistant API client
│       └── firestoreService.ts # Firestore CRUD operations & sanitization
```

---

## 📄 License
MIT
