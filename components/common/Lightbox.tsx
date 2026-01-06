"use client";

import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { useState } from "react";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  locale: Locale;
  alt: string;
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  locale,
  alt,
}: LightboxProps) {
  const [lightboxLoading, setLightboxLoading] = useState(false);

  const handleImageLoad = () => {
    setLightboxLoading(false);
  };

  const handleImageError = () => {
    setLightboxLoading(false);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxLoading(true);
    onPrevious();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxLoading(true);
    onNext();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        className="cursor-pointer absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-60"
        onClick={onClose}
      >
        ×
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-60"
          onClick={handlePrevious}
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-60"
          onClick={handleNext}
        >
          ›
        </button>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-50 px-3 py-1 rounded-full z-60">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Main image */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full cursor-pointer"
        onClick={onClose}
      >
        {/* Loading overlay */}
        {lightboxLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        <Image
          src={images[currentIndex]}
          alt={`${alt} - ${locale === "cs" ? "foto" : "photo"} ${
            currentIndex + 1
          }`}
          fill
          className="object-contain"
          sizes="100vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
}
