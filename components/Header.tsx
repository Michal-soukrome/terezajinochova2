import Link from "next/link";
import { routes } from "@/lib/routes";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href={`/${locale}`} className="text-xl font-bold text-gray-900">
            My App
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href={`/${locale}/products`}
              className="text-gray-700 hover:text-gray-900"
            >
              {locale === "cs" ? "Produkty" : "Products"}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
