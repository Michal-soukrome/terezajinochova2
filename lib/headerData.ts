export interface NavItem {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  exact?: boolean;
}

export const NAV: Record<string, Record<string, NavItem>> = {
  cs: {
    home: {
      href: "/",
      label: "Úvod",
      title: "Přejít na domovskou stránku",
      description: "Vítejte na mém webu",
      icon: "Home",
      exact: true,
    },
    about: {
      href: "/about",
      label: "O deníku",
      title: "Přejít na stránku o deníku",
      description: "Zjistěte více o svatebním deníku",
      icon: "BookOpen",
    },
    aboutMe: {
      href: "/about-me",
      label: "O mně",
      title: "Přejít na stránku o mně",
      description: "Přečtěte si o mně",
      icon: "Asterisk",
    },
    gallery: {
      href: "/gallery",
      label: "Koordinace svateb",
      title: "Přejít na svatební příběhy",
      description: "Prohlédněte si svatební příběhy a inspiraci",
      icon: "Camera",
    },
    products: {
      href: "/products",
      label: "Objednat",
      title: "Přejít na stránku produktů",
      description: "Vyberte si svůj svatební deník",
      icon: "ShoppingCart",
    },
    contact: {
      href: "/contact",
      label: "Kontakt",
      title: "Přejít na kontaktní stránku",
      description: "Spojte se se mnou",
      icon: "Mail",
    },
    privacy: {
      href: "/privacy",
      label: "Soukromí",
      title: "Přejít na stránku soukromí",
      description: "Informace o ochraně osobních údajů",
      icon: "Shield",
    },
  },
  en: {
    home: {
      href: "/",
      label: "Home",
      title: "Go to homepage",
      description: "Welcome to our page",
      icon: "Home",
      exact: true,
    },
    about: {
      href: "/about",
      label: "About",
      title: "Go to about page",
      description: "Learn more about wedding diary",
      icon: "BookOpen",
    },
    aboutMe: {
      href: "/about-me",
      label: "About Me",
      title: "Go to about me page",
      description: "Read about me",
      icon: "Asterisk",
    },
    gallery: {
      href: "/gallery",
      label: "Wedding Stories",
      title: "Go to wedding stories",
      description: "Browse wedding stories and inspiration",
      icon: "Camera",
    },
    products: {
      href: "/products",
      label: "Order",
      title: "Go to products page",
      description: "Choose your wedding diary",
      icon: "ShoppingCart",
    },
    contact: {
      href: "/contact",
      label: "Contact",
      title: "Go to contact page",
      description: "Get in touch with me",
      icon: "Mail",
    },
    privacy: {
      href: "/privacy",
      label: "Privacy",
      title: "Go to privacy page",
      description: "Personal data protection information",
      icon: "Shield",
    },
  },
};

export const HEADER_CONTENT = {
  cs: {
    navigation: "Navigace",
    dreamWedding: "Svatba snů",
    startPlanning: {
      title: "Začněte plánovat",
      description: "Objevte naše nástroje pro dokonalou svatbu",
      button: "Prozkoumat",
    },
    needHelp: {
      title: "Potřebujete pomoc?",
      description: "Kontaktujte nás pro osobní konzultaci",
      button: "Napište mi",
    },
  },
  en: {
    navigation: "Navigation",
    dreamWedding: "Dream Wedding",
    startPlanning: {
      title: "Start Planning",
      description: "Discover our tools for the perfect wedding",
      button: "Explore",
    },
    needHelp: {
      title: "Need Help?",
      description: "Contact us for personal consultation",
      button: "Let me know",
    },
  },
};
