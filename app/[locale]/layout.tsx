import { locales, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import RouteTransition from "@/components/navigation";

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
    <div className="w-full bg-white" id="layout-master">
      <div className="flex flex-col items-start justify-between min-h-svh w-full h-full">
        <Header locale={locale} />

        {/* exclude homepage from layout as it has to be fullwidth */}

        <main className="w-full flex-1 pt-20">
          <RouteTransition locale={locale}>{children}</RouteTransition>
        </main>

        <Footer locale={locale} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
