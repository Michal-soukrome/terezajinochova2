"use client";

import { Wedding } from "@/lib/weddings";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Lightbox } from "@/components/common";
import { Divider } from "@/components/ui";

interface WeddingDetailProps {
  wedding: Wedding;
  locale: Locale;
}

export default function WeddingDetail({ wedding, locale }: WeddingDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    new Array(wedding.galleryImages.length).fill(true)
  );

  const photographerText =
    wedding.photographerGender === "female" ? "fotografce" : "fotografovi";

  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleImageError = (index: number) => {
    setImageLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          setSelectedImageIndex((prev) =>
            prev !== null && prev > 0
              ? prev - 1
              : wedding.galleryImages.length - 1
          );
          break;
        case "ArrowRight":
          event.preventDefault();
          setSelectedImageIndex((prev) =>
            prev !== null && prev < wedding.galleryImages.length - 1
              ? prev + 1
              : 0
          );
          break;
        case "Escape":
          event.preventDefault();
          setSelectedImageIndex(null);
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, wedding.galleryImages.length]);

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : wedding.galleryImages.length - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev < wedding.galleryImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Back button */}
      <div className="w-full text-center">
        <Link
          href={`/${locale}/${routes.gallery[locale]}`}
          className="btn btn-secondary mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "cs" ? "Zpět do galerie" : "Back to gallery"}</span>
        </Link>
      </div>

      {/* Wedding title */}
      <div className="text-center mb-8">
        <motion.h1
          className="heading font-medium text-5xl md:text-6xl text-accent-1-contrast mb-4 text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {wedding.coupleNames[locale]}
        </motion.h1>
        <motion.div
          className="text-xl text-gray-600 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>{wedding.location[locale]}</p>
          {wedding.date && <p className="text-gray-500">{wedding.date}</p>}
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Divider icon={Heart} />
      </motion.div>

      {/* Review if available */}
      {wedding.review && (
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <blockquote className="font-serif text-xl leading-relaxed text-gray-800 italic">
            "{wedding.review[locale]}"
          </blockquote>
        </motion.div>
      )}

      {/* Photo gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {wedding.galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-4/3 overflow-hidden shadow cursor-pointer hover:shadow-md transition-shadow bg-gray-100"
            onClick={() => setSelectedImageIndex(index)}
          >
            {/* Loading spinner */}
            {imageLoadingStates[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-1"></div>
              </div>
            )}

            <Image
              src={image}
              alt={`${wedding.coupleNames[locale]} - foto ${index + 1}`}
              fill
              className={`object-cover hover:scale-105 transition-transform duration-300 ${
                imageLoadingStates[index] ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          </motion.div>
        ))}
      </div>

      {/* Credits and partnership info */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className=" p-8 text-sm text-gray-600 space-y-3 font-serif">
          <p>
            {locale === "cs"
              ? `Za zachycení těchto krásných momentů děkuji ${photographerText} `
              : `I thank the photographer `}
            <span className="font-semibold">{wedding.photographerName}</span>.
          </p>
          {wedding.coordinatedByAgency && (
            <p>
              {locale === "cs"
                ? "Svatební koordinace byla realizována ve spolupráci s agenturou Svatební Guru."
                : "Wedding coordination was realized in cooperation with Svatební Guru agency."}
            </p>
          )}
        </div>
      </motion.div>

      {/* Lightbox modal */}
      <Lightbox
        isOpen={selectedImageIndex !== null}
        images={wedding.galleryImages}
        currentIndex={selectedImageIndex || 0}
        onClose={() => setSelectedImageIndex(null)}
        onPrevious={goToPrevious}
        onNext={goToNext}
        locale={locale}
        alt={wedding.coupleNames[locale]}
      />
    </div>
  );
}
