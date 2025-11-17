import { locales, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RouteTransition from "@/components/RouteTransition";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header locale={locale} />

          <main className="flex-1 py-8">
            <RouteTransition>{children}</RouteTransition>
          </main>

          <Footer locale={locale} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
