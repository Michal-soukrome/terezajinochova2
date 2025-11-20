"use client";

import { motion } from "framer-motion";

interface ReviewsCarouselProps {
  locale: string;
}

export function ReviewsCarousel({ locale }: ReviewsCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-8 pb-8 px-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(-20px) rotate(-2deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Plánovač nám ušetřil tolik času a stresu. Všechno bylo připravené a organizované."'
              : '"The planner saved us so much time and stress. Everything was prepared and organized."'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Marie a Tomáš" : "Marie and Tomáš"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(10px) rotate(1deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Skvělé nástroje a podpora. Doporučujeme všem, kteří plánují svatbu!"'
              : '"Great tools and support. We recommend it to everyone planning a wedding!"'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Anna a Petr" : "Anna and Petr"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(-15px) rotate(-1deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Profesionální přístup a všechno na jednom místě. Perfektní služba!"'
              : '"Professional approach and everything in one place. Perfect service!"'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Lucie a Michal" : "Lucie and Michal"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(25px) rotate(2.5deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Tereza je skvělá! Pomohla nám zorganizovat svatbu našich snů bez stresu."'
              : '"Tereza is amazing! She helped us organize our dream wedding without stress."'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Kateřina a David" : "Kateřina and David"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2023" : "Wedding 2023"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(-30px) rotate(-3deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Všechno bylo dokonale zorganizované. Nemuseli jsme se o nic starat!"'
              : '"Everything was perfectly organized. We didn\'t have to worry about anything!"'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Barbora a Jan" : "Barbora and Jan"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(15px) rotate(-1.5deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Fantastická spolupráce! Tereza rozumí potřebám každého páru."'
              : '"Fantastic collaboration! Tereza understands every couple\'s needs."'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Veronika a Martin" : "Veronika and Martin"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(-10px) rotate(2deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Díky Tereze byla naše svatba nezapomenutelná. Vřele doporučujeme!"'
              : '"Thanks to Tereza, our wedding was unforgettable. Highly recommend!"'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Simona a Pavel" : "Simona and Pavel"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2023" : "Wedding 2023"}
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
          style={{ transform: "translateY(20px) rotate(-2.5deg)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
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
            {locale === "cs"
              ? '"Profesionální, kreativní a pozorná. Naše svatba předčila očekávání!"'
              : '"Professional, creative and attentive. Our wedding exceeded expectations!"'}
          </p>
          <div className="font-semibold text-gray-900">
            {locale === "cs" ? "Eva a Tomáš" : "Eva and Tomáš"}
          </div>
          <div className="text-gray-600 text-sm">
            {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
