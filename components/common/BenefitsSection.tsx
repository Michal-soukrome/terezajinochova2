"use client";

import { motion } from "framer-motion";
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
      ? "bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24 "
      : "px-4 sm:px-6 lg:px-8 py-16 md:py-24";

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-10">
            <motion.h3
              className="text-3xl font-bold text-gray-900 mb-4 font-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {" "}
              {title}
            </motion.h3>
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
                ? "Místo v deníku určené pro vaše vzpomínky, pocity a fotografie, které se stanou trvalou památkou na váš svatební den."
                : "A dedicated space in the diary for your memories, feelings, and photographs that will become a lasting memento of your wedding day."}
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
                ? "Šablony, kontrolní seznamy a milníky"
                : "Planner & Checklists"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Přehledné připomínky a checklisty, které vám pomohou udržet pořádek a mít vše pod kontrolou."
                : "Clear reminders and checklists that will help you stay organized and have everything under control."}
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
              {locale === "cs" ? "Nápady a inspirace" : "Inspiration & Ideas"}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Sekce plná nápadů a inspirace, které si můžete poznamenat přímo do deníku."
                : "Sections full of ideas and inspiration that you can note directly in the diary."}
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
                ? "Nástroje pro sledování rozpočtu, důležitých termínů a poznámek k dodavatelům."
                : "Tools for tracking budget, important deadlines, and notes about vendors."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
