"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { NAV } from "@/lib/headerData";
import {
  BookOpen,
  Home,
  Mail,
  ShoppingCart,
  Shield,
  Asterisk,
  Camera,
} from "lucide-react";

const iconMap = {
  Home,
  BookOpen,
  Asterisk,
  Camera,
  ShoppingCart,
  Mail,
  Shield,
};

interface MobileNavProps {
  locale: Locale;
  onClose: () => void;
}

export function MobileNav({ locale, onClose }: MobileNavProps) {
  const navItems = Object.values(NAV[locale]);

  return (
    <ul
      role="navigation"
      className="w-full flex flex-col py-10"
      id="mobile-navigation-links"
    >
      {navItems.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <TranslatedLink
            key={item.href}
            href={item.href}
            className="p-4 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
            activeClassName="bg-accent-1 font-semibold"
            exact={item.exact || false}
            onClick={onClose}
            title={item.title}
          >
            <div className="p-2 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
              <Icon className="w-4 h-4 text-accent-1-contrast" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-accent-2-contrast">
                {item.label}
              </div>
              <div className="!hidden text-sm text-accent-1-contrast font-light lowercase">
                {item.description}
              </div>
            </div>
          </TranslatedLink>
        );
      })}
    </ul>
  );
}
