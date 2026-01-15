import { PDFFlipBook } from "@/components/common";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function FlipBookPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Interactive Flip Book
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Click or drag to flip through the pages. Use the navigation buttons
          below to move between pages.
        </p>

        <PDFFlipBook
          locale={locale}
          pdfUrl="/assets/merged.pdf"
          width={600}
          height={800}
          className="my-8"
        />

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            💡 Tip: Click on the page edges or use the arrow buttons to flip
            pages
          </p>
        </div>
      </div>
    </div>
  );
}
