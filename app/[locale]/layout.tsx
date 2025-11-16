import { locales, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";

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
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
