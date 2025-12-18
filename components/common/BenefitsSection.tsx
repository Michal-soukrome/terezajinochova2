"use client";

import { Gift, Palette, MapPin } from "lucide-react";
import { NotebookPen } from "lucide-react";

interface BenefitsSectionProps {
  locale: string;
  title?: string;
  background?: "white" | "themed";
}

export default function BenefitsSection({
  locale,
  title,
  background = "white",
}: BenefitsSectionProps) {
  const sectionClass =
    background === "themed"
      ? "bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-y border-accent-1"
      : "px-4 sm:px-6 lg:px-8 py-16 md:py-24";

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              {title}
            </h2>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-20">
          {/* Memories & Keepsakes (Diary) */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Gift
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast "
                />
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-heading mb-3">
              {locale === "cs" ? "Zápisky a vzpomínky" : "Memories & Keepsakes"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Prostor v deníku pro vaše vzpomínky, nálady a fotky vytvořte trvalou památku na váš den."
                : "A place in the diary for your memories, moods and photos create a lasting keepsake of your day."}
            </p>
          </div>

          {/* Planner & Checklists (Diary) */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <NotebookPen
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast "
                />
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-heading mb-3">
              {locale === "cs"
                ? "Plánovač a kontrolní seznamy"
                : "Planner & Checklists"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Šablony, kontrolní seznamy a milníky přímo v deníku připomínky a přehledy, které vám pomohou udržet pořádek."
                : "Templates, checklists and milestones right in the diary reminders and overviews to help you stay organized."}
            </p>
          </div>

          {/* Inspiration & Ideas (Diary) */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Palette
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast group-hover:text-accent-4 transition-colors duration-300"
                />
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-heading mb-3">
              {locale === "cs" ? "Inspirace a nápady" : "Inspiration & Ideas"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Sekce s nápady na výzdobu, barvy a styl inspirace, kterou si poznamenáte přímo do deníku."
                : "Sections for decor ideas, color palettes and styling prompts inspiration you can note directly in the diary."}
            </p>
          </div>

          {/* Tracking & Budget (Diary) */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <MapPin
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast group-hover:text-accent-4 transition-colors duration-300"
                />
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 font-heading mb-3">
              {locale === "cs" ? "Sledování a rozpočet" : "Tracking & Budget"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Nástroje pro sledování rozpočtu, termínů a poznámek k dodavatelům vše zaznamenáte přímo v deníku."
                : "Tools to track budget, deadlines and vendor notes everything recorded directly in the diary."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
