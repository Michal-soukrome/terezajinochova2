"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PageProps {
  pageNumber: number;
  imageUrl: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ pageNumber, imageUrl }, ref) => {
    return (
      <div className="pdf-page" ref={ref}>
        <img
          src={imageUrl}
          alt={`Page ${pageNumber}`}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
);

Page.displayName = "Page";

interface PDFFlipBookProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PDFFlipBook({
  pdfUrl,
  width = 600,
  height = 800,
  className = "",
}: PDFFlipBookProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const pageImages: string[] = [];

        // Render each page to a canvas and convert to image
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality

          // Create canvas
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page to canvas
          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
              canvas: canvas,
            }).promise;

            // Convert canvas to image URL
            const imageUrl = canvas.toDataURL();
            pageImages.push(imageUrl);
          }
        }

        setPages(pageImages);
        setLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF");
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <p className="text-gray-600">No pages found</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* @ts-ignore - HTMLFlipBook type definitions may not match the actual implementation */}
      <HTMLFlipBook
        width={width}
        height={height}
        ref={bookRef as any}
        className="flip-book shadow-2xl"
      >
        {pages.map((imageUrl, index) => (
          <Page key={index} pageNumber={index + 1} imageUrl={imageUrl} />
        ))}
      </HTMLFlipBook>

      {/* Navigation Controls */}
      <div className="flex gap-4 items-center">
        <button
          onClick={goToPrevPage}
          className="btn btn-secondary shadow disabled:cursor-not-allowed"
          aria-label="Předchozí stránka"
        >
          ← Předchozí
        </button>
        <button
          onClick={goToNextPage}
          className="btn btn-secondary shadow disabled:cursor-not-allowed"
          aria-label="Další stránka"
        >
          Další →
        </button>
      </div>

      {/* Optional: Page indicator */}
      <style jsx global>{`
        .flip-book {
          margin: 0 auto;
        }
        .pdf-page {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
