"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface ReviewsCarouselProps {
  locale: string;
}

const cards = [
  {
    text: {
      cs: '"Svatební deník se pro nás stal krásnou součástí celých svatebních příprav. Zapisovali jsme si do něj drobné detaily i momenty, na které nechceme nikdy zapomenout. Je nádherně zpracovaný a má v sobě něco kouzelného – pokaždé, když ho otevřeme, vrátíme se zpět k našemu „ano"."',
      en: "\"The wedding diary became a beautiful part of our entire wedding preparations. We wrote down small details and moments we never want to forget. It is beautifully crafted and has something magical about it – every time we open it, we return to our 'I do'.\"",
    },
    name: { cs: "I.", en: "I." },
    date: { cs: "", en: "" },
    transform: "translateY(-20px) rotate(-2deg)",
  },
  {
    text: {
      cs: '"Příruček a manuálů ke svatbě je spousta, ale tento Deník je sám o sobě jiný. Provede vás velkou svatbou tak, abyste na nic nezapomněli, a zároveň je skvělým průvodcem i pro menší svatby. Do Deníku si lze zapsat prakticky vše, díky čemuž budete mít vše přehledně na jednom místě a svůj den si pak můžete naplno užít."',
      en: "\"There are many wedding guides and manuals, but this Diary is unique. It will guide you through a big wedding so you don't forget anything, and it's also a great companion for smaller weddings. You can write practically everything in the Diary, which means you'll have everything clearly in one place and can fully enjoy your day.\"",
    },
    name: { cs: "Patricie", en: "Patricie" },
    date: { cs: "", en: "" },
    transform: "translateY(10px) rotate(1deg)",
  },
  {
    text: {
      cs: '"Pro člověka jako jsem já, který byl na svatbách jen párkrát a úplně neví, co vše je potřeba a jaké jsou možnosti, je Deník velkým pomocníkem. Za mě jde o velmi praktický projekt, který vyplnil mezeru na trhu, a budoucím nevěstám ho s radostí doporučuji 😊"',
      en: "\"For someone like me, who has only been to a few weddings and doesn't really know what is needed and what the options are, the Diary is a great helper. For me, it's a very practical project that filled a gap in the market, and I happily recommend it to future brides 😊\"",
    },
    name: { cs: "Patricie", en: "Patricie" },
    date: { cs: "", en: "" },
    transform: "translateY(-15px) rotate(-1deg)",
  },
  {
    text: {
      cs: '"Ze svatebního deníku jsem byla naprosto nadšená! Už na první pohled mě velmi upoutal krásný design 🙂 Deník je velmi praktický a máte vše, co při plánování svatby potřebujete, na jednom místě. Ocenila jsem také všechny tabulky k zapisování. S deníkem se vám nemůže stát, že byste na něco důležitého zapomněli."',
      en: '"I was absolutely thrilled with the wedding diary! The beautiful design immediately caught my attention 🙂 The diary is very practical and you have everything you need for wedding planning in one place. I also appreciated all the writing tables. With this diary, you can\'t forget anything important."',
    },
    name: { cs: "Markéta", en: "Markéta" },
    date: { cs: "", en: "" },
    transform: "translateY(25px) rotate(2.5deg)",
  },
  {
    text: {
      cs: '"Svatební deník od Terezky mi od začátku dodával pocit, že plánování svatby nemusí být chaos, ale může to být krásná a klidná cesta. Krok po kroku mě provedl vším důležitým - od prvních představ, přes rozpočet a organizaci, až po drobné detaily, na které bych jinak snadno zapomněla. Moc se mi líbí, jak je deník přehledný, ale zároveň lidský a milý. Není to jen „sešit s úkoly", ale spíš parťák, ke kterému se člověk rád vrací. Vše má své místo, nic se neztratí a člověk má pořád pocit, že má svatbu pod kontrolou. Pokud hledáte pomocníka, který vám ušetří nervy a zároveň si v něm uchováte krásné vzpomínky, můžu ho s klidných svědomím doporučit."',
      en: "\"Terezka's wedding diary gave me the feeling from the beginning that wedding planning doesn't have to be chaos, but can be a beautiful and calm journey. Step by step, it guided me through everything important - from initial ideas, through budget and organization, to small details I would otherwise easily forget. I really like how clear the diary is, yet human and kind. It's not just a 'task notebook', but rather a companion you like to return to. Everything has its place, nothing gets lost, and you always feel you have your wedding under control. If you're looking for a helper that will save your nerves and at the same time preserve beautiful memories, I can recommend it with a clear conscience.\"",
    },
    name: { cs: "Martina", en: "Martina" },
    date: { cs: "", en: "" },
    transform: "translateY(-30px) rotate(-3deg)",
  },
  {
    text: {
      cs: '"Svatební deník mi byl po celou dobu plánování skvělým pomocníkem. Pomohl mi udržet si přehled a zároveň si uchovat emoce a vzpomínky, ke kterým se budu moc ráda vracet. Navíc je jeden z mála, který je opravdu praktický a dává smysl při skutečném plánování svatby."',
      en: '"The wedding diary was a great helper for me throughout the planning period. It helped me keep an overview and at the same time preserve emotions and memories that I will be happy to return to. Moreover, it is one of the few that is really practical and makes sense in real wedding planning."',
    },
    name: { cs: "Kateřina", en: "Kateřina" },
    date: { cs: "", en: "" },
    transform: "translateY(5px) rotate(-0.5deg)",
  },
];

export function ReviewsCarousel({ locale }: ReviewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const max = el.scrollWidth / 2;
      if (el.scrollLeft >= max) {
        el.scrollLeft -= max;
      } else if (el.scrollLeft <= 1) {
        el.scrollLeft += max;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="flex gap-8 py-12 px-4 overflow-x-auto overscroll-contain scrollbar-hide"
      >
        {[...cards, ...cards].map((card, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-60 md:w-72 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            style={{ transform: card.transform }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center mb-4">
              <div className="flex text-accent-4">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 italic">
              {card.text[locale === "cs" ? "cs" : "en"]}
            </p>
            <div className="font-semibold text-gray-900">
              {card.name[locale === "cs" ? "cs" : "en"]}
            </div>
            <div className="text-gray-600 text-sm">
              {card.date[locale === "cs" ? "cs" : "en"]}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* BUTTONS */}
      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => scrollByAmount(-300)}
          className="p-4 rounded-full cursor-pointer bg-accent-1-contrast text-accent-1"
        >
          <span className="text-accent-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </span>
        </button>

        <button
          onClick={() => scrollByAmount(300)}
          className="p-4 rounded-full cursor-pointer bg-accent-1-contrast text-accent-1"
        >
          <span className="text-accent-1">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
