"use client";

import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker - using unpkg CDN
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [bookState, setBookState] = useState<string>("read");
  const bookRef = useRef<any>(null);

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const handleChangeOrientation = useCallback((e: any) => {
    setOrientation(e.data);
  }, []);

  const handleChangeState = useCallback((e: any) => {
    setBookState(e.data);
  }, []);

  const handleInit = useCallback((e: any) => {
    console.log("Book initialized:", e);
  }, []);

  const handleUpdate = useCallback((e: any) => {
    console.log("Book updated:", e);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!bookRef.current) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          bookRef.current.pageFlip().flipPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          bookRef.current.pageFlip().flipNext();
          break;
        case "Home":
          e.preventDefault();
          bookRef.current.pageFlip().turnToPage(0);
          break;
        case "End":
          e.preventDefault();
          bookRef.current.pageFlip().turnToPage(pages.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [pages.length]);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const pageImages: string[] = [];

        // Use lower scale on mobile for better performance
        const scale = isMobile ? 1.5 : 2;

        // Render each page to a canvas and convert to image
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

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
  }, [pdfUrl, isMobile]);

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

  // Responsive dimensions
  const bookWidth = isMobile
    ? Math.min(width * 0.8, window.innerWidth - 40)
    : width;
  const bookHeight = isMobile ? (bookWidth * height) / width : height;

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: bookWidth, height: bookHeight }}
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
        style={{ width: bookWidth, height: bookHeight }}
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
        style={{ width: bookWidth, height: bookHeight }}
      >
        <p className="text-gray-600">No pages found</p>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Previous Button - Left Side */}
      <button
        onClick={goToPrevPage}
        className={`absolute z-20 p-3 cursor-pointer bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isMobile ? "left-2" : "left-0"
        }`}
        style={{
          top: "50%",
          transform: isMobile ? "translateY(-50%)" : "translate(-50%, -50%)",
        }}
        aria-label="Předchozí stránka"
        disabled={currentPage === 0}
      >
        <svg
          className={`${isMobile ? "w-3 h-3" : "w-3 h-3"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* @ts-ignore - HTMLFlipBook type definitions may not match the actual implementation */}
      <HTMLFlipBook
        width={bookWidth}
        height={bookHeight}
        ref={bookRef as any}
        className="flip-book"
        size="stretch"
        minWidth={isMobile ? 280 : 315}
        maxWidth={isMobile ? bookWidth : 1000}
        minHeight={isMobile ? 350 : 400}
        maxHeight={isMobile ? bookHeight : 1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        flippingTime={600}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        swipeDistance={30}
        clickEventForward={true}
        useMouseEvents={true}
        renderOnlyPageLengthChange={false}
        onFlip={handleFlip}
        onChangeOrientation={handleChangeOrientation}
        onChangeState={handleChangeState}
        onInit={handleInit}
        onUpdate={handleUpdate}
      >
        {pages.map((imageUrl, index) => (
          <Page key={index} pageNumber={index + 1} imageUrl={imageUrl} />
        ))}
      </HTMLFlipBook>

      {/* Next Button - Right Side */}
      <button
        onClick={goToNextPage}
        className={`absolute z-20 p-3 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
          isMobile ? "right-2" : "right-0"
        }`}
        style={{
          top: "50%",
          transform: isMobile ? "translateY(-50%)" : "translate(50%, -50%)",
        }}
        aria-label="Další stránka"
        disabled={currentPage === pages.length - 1}
      >
        <svg
          className={`${isMobile ? "w-3 h-3" : "w-3 h-3"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Page Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        {currentPage + 1} / {pages.length}
      </div>
    </div>
  );
}
