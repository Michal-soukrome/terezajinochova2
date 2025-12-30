"use client";

import { Wedding } from "@/lib/weddings";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [lightboxLoading, setLightboxLoading] = useState(false);

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

  const handleLightboxImageLoad = () => {
    setLightboxLoading(false);
  };

  const handleLightboxImageError = () => {
    setLightboxLoading(false);
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
          setLightboxLoading(true);
          break;
        case "ArrowRight":
          event.preventDefault();
          setSelectedImageIndex((prev) =>
            prev !== null && prev < wedding.galleryImages.length - 1
              ? prev + 1
              : 0
          );
          setLightboxLoading(true);
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
    setLightboxLoading(true);
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev < wedding.galleryImages.length - 1 ? prev + 1 : 0
    );
    setLightboxLoading(true);
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
      <div className="text-center mb-12">
        <motion.h1
          className="heading font-medium  text-5xl md:text-6xl text-accent-1-contrast mb-2 text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {wedding.coupleNames[locale]}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {wedding.location[locale]}
        </motion.p>
        {wedding.date && (
          <motion.p
            className="text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {wedding.date}
          </motion.p>
        )}
      </div>

      {/* Photo gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {wedding.galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-4/3 overflow-hidden shadow cursor-pointer hover:shadow-md transition-shadow bg-gray-100"
            onClick={() => {
              setSelectedImageIndex(index);
              setLightboxLoading(true);
            }}
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
        <div className="bg-gray-50 rounded-lg p-8 text-sm text-gray-600 space-y-3">
          <p>
            {locale === "cs"
              ? `Za zachycení těchto krásných momentů děkuji ${photographerText} `
              : `I thank the photographer `}
            <span className="font-semibold">{wedding.photographerName}</span>.
          </p>
        </div>
      </motion.div>

      {/* Review if available */}
      {wedding.review && (
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-accent-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              {locale === "cs"
                ? "Recenze od snoubenců"
                : "Review from the couple"}
            </h3>
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "{wedding.review[locale]}"
            </p>
            <p className="text-right text-gray-600 mt-4 font-medium">
              — {wedding.coupleNames[locale]}
            </p>
          </div>
        </motion.div>
      )}

      {/* Lightbox modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-60"
            onClick={() => setSelectedImageIndex(null)}
          >
            ×
          </button>

          {/* Previous button */}
          {wedding.galleryImages.length > 1 && (
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-60"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              ‹
            </button>
          )}

          {/* Next button */}
          {wedding.galleryImages.length > 1 && (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-60"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              ›
            </button>
          )}

          {/* Image counter */}
          {wedding.galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-50 px-3 py-1 rounded-full z-60">
              {selectedImageIndex + 1} / {wedding.galleryImages.length}
            </div>
          )}

          {/* Main image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full cursor-pointer"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Loading overlay */}
            {lightboxLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            <Image
              src={wedding.galleryImages[selectedImageIndex]}
              alt={`${wedding.coupleNames[locale]} - foto ${
                selectedImageIndex + 1
              }`}
              fill
              className="object-contain"
              sizes="100vw"
              onLoad={handleLightboxImageLoad}
              onError={handleLightboxImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
}
