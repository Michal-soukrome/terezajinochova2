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

interface DesktopNavProps {
  locale: Locale;
  onClose: () => void;
}

export function DesktopNav({ locale, onClose }: DesktopNavProps) {
  const navItems = Object.values(NAV[locale]).filter(
    (item) => item.href !== "/privacy"
  );

  return (
    <nav className="h-full hidden md:flex items-center ">
      {navItems.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <TranslatedLink
            key={item.href}
            href={item.href}
            className="hover:bg-amber-700/10 px-4 relative z-10 transition-all duration-300 ease-in-out group h-full flex items-center gap-2 font-heading text-accent-2-contrast p-2"
            activeClassName="bg-amber-700/20 "
            exact={item.exact || false}
            onClick={onClose}
            title={item.title}
          >
            <Icon className="hidden w-4 h-4" />
            <span className="uppercase font-medium">{item.label}</span>
          </TranslatedLink>
        );
      })}
    </nav>
  );
}
