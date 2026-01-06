"use client";

import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { useState, useEffect, useCallback } from "react";
import { Lightbox } from "./Lightbox";

interface ProductImageGalleryProps {
  mainImage: string;
  additionalImages: string[];
  alt: string;
  locale: Locale;
}

export function ProductImageGallery({
  mainImage,
  additionalImages,
  alt,
  locale,
}: ProductImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [mainImage, ...additionalImages];

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  }, [allImages.length]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    },
    [isLightboxOpen, closeLightbox, goToPrevious, goToNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);
  return (
    <div className="relative">
      <div className="sticky top-8">
        <div className="relative overflow-hidden pb-20">
          <Image
            src={mainImage}
            alt={alt}
            width={720}
            height={820}
            className="w-full h-auto object-cover shadow cursor-pointer"
            priority
            onClick={() => openLightbox(0)}
          />
          <div
            className="mt-3 px-5 md:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            id="additional-images-grid"
          >
            {additionalImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square border relative cursor-pointer"
                id="product-additional-image"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image}
                  fill
                  className="object-cover object-center hover:opacity-80 transition-transform duration-200"
                  alt={`${alt} - ${locale === "cs" ? "Ukázka" : "Preview"} ${
                    index + 1
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        images={allImages}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
        locale={locale}
        alt={alt}
      />
    </div>
  );
}
