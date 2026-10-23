import React from 'react';
import { MessageSquare, Cpu, Calculator, BarChart3, Lightbulb, AlertTriangle, ArrowDown } from 'lucide-react';

export const AIApproach: React.FC = () => {
  const steps = [
    {
      label: 'User Input',
      icon: MessageSquare,
      title: 'Natural Meal Description',
      example: '"I ate rice, dal, vegetables and curd."',
      badge: 'Natural Language'
    },
    {
      label: 'AI Interpretation',
      icon: Cpu,
      title: 'Contextual Recognition',
      example: 'Identifies likely foods, culinary context, and implicit ingredients.',
      badge: 'Decomposition'
    },
    {
      label: 'Estimation',
      icon: Calculator,
      title: 'Portion & Nutritional Sizing',
      example: 'Estimates probable home-cooking portion ranges and component weights.',
      badge: 'Database Modeling'
    },
    {
      label: 'Summary',
      icon: BarChart3,
      title: 'Macro & Energy Profile',
      example: 'Provides estimated calories alongside protein, carbohydrate, and fat counts.',
      badge: 'Aggregation'
    },
    {
      label: 'Insight',
      icon: Lightbulb,
      title: 'Practical Focus Areas',
      example: 'Highlights potential nutritional gaps or areas to enrich next.',
      badge: 'Actionable Context'
    }
  ];

  return (
    <section id="ai-approach" className="py-20 bg-[#FBFDFB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Responsible Technology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            AI That Explains, Not Just Calculates
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            How artificial intelligence translates natural language descriptions into reliable, transparent dietary perspective.
          </p>
        </div>

        {/* Linear Step-by-Step Flow Diagram */}
        <div className="max-w-4xl mx-auto space-y-3 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-200 transition-colors">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                          0{idx + 1} • {step.label}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 mt-0.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-stone-600 mt-0.5 font-normal">
                        {step.example}
                      </p>
                    </div>
                  </div>
                  <div className="sm:self-center self-start">
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {step.badge}
                    </span>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center -my-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Transparency & AI Limitations Callout */}
        <div className="max-w-4xl mx-auto mt-10 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Transparency & Estimation Notice
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
                AI-generated nutrition estimates are approximations. Actual nutrition can vary depending on ingredients, cooking oil, culinary preparation, serving size, and regional recipe variations. NutriMind aims for intuitive awareness rather than laboratory precision.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
