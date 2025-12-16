"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface ReviewsCarouselProps {
  locale: string;
}

const cards = [
  {
    text: {
      cs: '"Plánovač nám ušetřil tolik času a stresu. Všechno bylo připravené a organizované."',
      en: '"The planner saved us so much time and stress. Everything was prepared and organized."',
    },
    name: { cs: "Marie a Tomáš", en: "Marie and Tomáš" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(-20px) rotate(-2deg)",
  },
  {
    text: {
      cs: '"Skvělé nástroje a podpora. Doporučujeme všem, kteří plánují svatbu!"',
      en: '"Great tools and support. We recommend it to everyone planning a wedding!"',
    },
    name: { cs: "Anna a Petr", en: "Anna and Petr" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(10px) rotate(1deg)",
  },
  {
    text: {
      cs: '"Profesionální přístup a všechno na jednom místě. Perfektní služba!"',
      en: '"Professional approach and everything in one place. Perfect service!"',
    },
    name: { cs: "Lucie a Michal", en: "Lucie and Michal" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(-15px) rotate(-1deg)",
  },
  {
    text: {
      cs: '"Tereza je skvělá! Pomohla nám zorganizovat svatbu našich snů bez stresu."',
      en: '"Tereza is amazing! She helped us organize our dream wedding without stress."',
    },
    name: { cs: "Kateřina a David", en: "Kateřina and David" },
    date: { cs: "Svatba 2023", en: "Wedding 2023" },
    transform: "translateY(25px) rotate(2.5deg)",
  },
  {
    text: {
      cs: '"Všechno bylo dokonale zorganizované. Nemuseli jsme se o nic starat!"',
      en: '"Everything was perfectly organized. We didn\'t have to worry about anything!"',
    },
    name: { cs: "Barbora a Jan", en: "Barbora and Jan" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(-30px) rotate(-3deg)",
  },
  {
    text: {
      cs: '"Fantastická spolupráce! Tereza rozumí potřebám každého páru."',
      en: '"Fantastic collaboration! Tereza understands every couple\'s needs."',
    },
    name: { cs: "Veronika a Martin", en: "Veronika and Martin" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(15px) rotate(-1.5deg)",
  },
  {
    text: {
      cs: '"Díky Tereze byla naše svatba nezapomenutelná. Vřele doporučujeme!"',
      en: '"Thanks to Tereza, our wedding was unforgettable. Highly recommend!"',
    },
    name: { cs: "Simona a Pavel", en: "Simona and Pavel" },
    date: { cs: "Svatba 2023", en: "Wedding 2023" },
    transform: "translateY(-10px) rotate(2deg)",
  },
  {
    text: {
      cs: '"Profesionální, kreativní a pozorná. Naše svatba předčila očekávání!"',
      en: '"Professional, creative and attentive. Our wedding exceeded expectations!"',
    },
    name: { cs: "Eva a Tomáš", en: "Eva and Tomáš" },
    date: { cs: "Svatba 2024", en: "Wedding 2024" },
    transform: "translateY(20px) rotate(-2.5deg)",
  },
];

export function ReviewsCarousel({ locale }: ReviewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const max = el.scrollWidth / 2;
      if (el.scrollLeft >= max) {
        el.scrollLeft -= max;
      } else if (el.scrollLeft <= 1) {
        el.scrollLeft += max;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="flex gap-8 py-12 px-4 overflow-x-auto overscroll-contain scrollbar-hide"
      >
        {[...cards, ...cards].map((card, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            style={{ transform: card.transform }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center mb-4">
              <div className="flex text-accent-4">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 italic">
              {card.text[locale === "cs" ? "cs" : "en"]}
            </p>
            <div className="font-semibold text-gray-900">
              {card.name[locale === "cs" ? "cs" : "en"]}
            </div>
            <div className="text-gray-600 text-sm">
              {card.date[locale === "cs" ? "cs" : "en"]}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* BUTTONS */}
      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => scrollByAmount(-300)}
          className="p-4 rounded-full cursor-pointer bg-accent-1 hover:bg-accent-1-contrast transition-colors"
        >
          <span className="text-accent-1-contrast">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </span>
        </button>

        <button
          onClick={() => scrollByAmount(300)}
          className="p-4 rounded-full cursor-pointer bg-accent-1 hover:bg-accent-1-contrast transition-colors"
        >
          <span className="text-accent-1-contrast">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
