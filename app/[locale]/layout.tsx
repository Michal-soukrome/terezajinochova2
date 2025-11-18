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
    <div>
      <div className="w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-between min-h-svh w-full h-full">
          <Header locale={locale} />

          {/* exclude homepage from layout as it has to be fullwidth */}

          <main className="w-full flex-1 p-4 sm:p-6 lg:p-8 ">
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
