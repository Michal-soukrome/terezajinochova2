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

interface FullscreenMenuProps {
  locale: Locale;
  onClose: () => void;
}

export function FullscreenMenu({ locale, onClose }: FullscreenMenuProps) {
  const navItems = Object.values(NAV[locale]);

  return (
    <div className="fixed inset-0 bg-accent-1 z-50 flex flex-col justify-center items-center">
      <nav className="w-full max-w-md px-8">
        <ul className="space-y-6">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <li key={item.href}>
                <TranslatedLink
                  href={item.href}
                  className="group flex items-center gap-6 p-4 rounded-lg hover:bg-accent-1-contrast/10 transition-colors"
                  activeClassName="bg-accent-1-contrast/10"
                  exact={item.exact || false}
                  onClick={onClose}
                  title={item.title}
                >
                  <div className="w-12 h-12 bg-accent-1-contrast rounded-lg flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent-1" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-medium text-accent-2-contrast mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-accent-2-contrast/70 font-light lowercase">
                      {item.description}
                    </div>
                  </div>
                </TranslatedLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
