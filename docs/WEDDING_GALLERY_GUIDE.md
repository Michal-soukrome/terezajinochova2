# Svatební Galerie - Návod k použití / Wedding Gallery - User Guide

## Jak přidat novou svatbu do galerie / How to Add a New Wedding

### 1. Připravte fotografie / Prepare Photos

Vytvořte složku pro svatbu v `public/assets/weddings/`:

```
public/assets/weddings/
  martina-kuba/
    thumbnail.jpg  (hlavní náhledová fotka)
    1.jpg          (fotografie v galerii)
    2.jpg
    3.jpg
    ...
```

### 2. Přidejte data o svatbě / Add Wedding Data

Otevřete soubor `lib/weddings.ts` a přidejte novou svatbu do pole `WEDDINGS`:

```typescript
{
  id: "martina-kuba",                    // Unikátní ID
  slugs: {
    cs: "martina-kuba-zamek-ctenice",   // URL slug pro češtinu
    en: "martina-kuba-ctenice-castle",  // URL slug pro angličtinu
  },
    cs: "Zámek Ctěnice",
    en: "Ctěnice Castle",
  },

  thumbnailImage: "/assets/weddings/martina-kuba/thumbnail.jpg",

  galleryImages: [
    "/assets/weddings/martina-kuba/1.jpg",
    "/assets/weddings/martina-kuba/2.jpg",
    "/assets/weddings/martina-kuba/3.jpg",
    // ... další fotografie
  ],

  photographerName: "Jana Nováková",
  photographerGender: "female",  // "male" nebo "female" (pro správný tvar: fotografce/fotografovi)

  // Volitelné - recenze od snoubenců
  review: {
    cs: "Text recenze česky...",
    en: "Review text in English...",
  },

  // Volitelné - rok svatby
  date: "2024",
}
```

### 3. Struktura galerie / Gallery Structure

#### Hlavní stránka galerie / Main Gallery Page

- URL: `/cs/gallery` nebo `/en/gallery`
- Zobrazuje mřížku všech svateb
- Každá svatba má náhledový obrázek a základní info

#### Detail svatby / Wedding Detail Page

- URL: `/cs/gallery/[slug]` např. `/cs/gallery/martina-kuba-zamek-ctenice`
- Zobrazuje všechny fotografie z galerie
- Kredit fotografovi/fotografce
- Text o spolupráci se Svatební Guru
- Případná recenze od snoubenců

### 4. Automatické texty / Automatic Texts

Systém automaticky zobrazuje:

#### Kredit fotografovi/fotografce:

**Česky:** "Za zachycení těchto krásných momentů děkujeme fotografce/fotografovi [Jméno]."

**Anglicky:** "We thank the photographer [Name]."

#### Spolupráce:

**Česky:** "Svatební koordinace byla realizována ve spolupráci s agenturou Svatební Guru."

**Anglicky:** "Wedding coordination was realized in cooperation with Svatební Guru agency."

### 5. Navigace / Navigation

Odkaz na galerii je přidán v hlavním menu:

- Desktop menu (horní lišta)
- Mobile menu (hamburger menu)
- V obou verzích (CS i EN)

### 6. Funkce / Features

- ✅ Responzivní design (mobil, tablet, desktop)
- ✅ Lightbox pro zvětšení fotografií
- ✅ Animace při načítání (Framer Motion)
- ✅ SEO metadata pro každou svatbu
- ✅ Bilingvální (česky + anglicky)
- ✅ Volitelné recenze od snoubenců
- ✅ Automatické generování URL slugů

### 7. Tipy / Tips

1. **Velikost fotek:** Doporučená šířka 1920px, kvalita pro web
2. **Formát:** JPG (optimální pro fotografie)
3. **Názvy souborů:** Používejte jednoduché názvy bez diakritiky
4. **První fotka:** Bude použita jako náhled, vyberte reprezentativní snímek
5. **Pořadí fotek:** Fotografie se zobrazí v pořadí, jak jsou v poli `galleryImages`

### 8. Příklad kompletní svatby / Complete Wedding Example

```typescript
{
  id: "anna-petr",
  slugs: {
    cs: "anna-petr-pruhonice",
    en: "anna-petr-pruhonice",
  },
  coupleNames: {
    cs: "Anna & Petr",
    en: "Anna & Petr",
  },
  location: {
    cs: "Park Hotel Průhonice",
    en: "Park Hotel Průhonice",
  },
  thumbnailImage: "/assets/weddings/anna-petr/thumbnail.jpg",
  galleryImages: [
    "/assets/weddings/anna-petr/1.jpg",
    "/assets/weddings/anna-petr/2.jpg",
    "/assets/weddings/anna-petr/3.jpg",
    "/assets/weddings/anna-petr/4.jpg",
    "/assets/weddings/anna-petr/5.jpg",
  ],
  photographerName: "Martin Dvořák",
  photographerGender: "male",
  review: {
    cs: "Tereza nám pomohla vytvořit svatbu našich snů. Vše proběhlo hladce a bez stresu díky její profesionalitě.",
    en: "Tereza helped us create the wedding of our dreams. Everything went smoothly and stress-free thanks to her professionalism.",
  },
  date: "2023",
}
```

### 9. Lokalizace URL / URL Localization

Galerie plně podporuje lokalizované URL:

- **České URL:** `/cs/galerie` a `/cs/galerie/martina-kuba-zamek-ctenice`
- **Anglické URL:** `/en/gallery` a `/en/gallery/martina-kuba-ctenice-castle`
- Při přepnutí jazyka se URL automaticky přeloží
- Next.js rewrites zajistí, že obě verze URL fungují správně

## Soubory, které byly vytvořeny / Files Created

1. **lib/weddings.ts** - Data structure a funkce pro svatby
2. **app/[locale]/gallery/page.tsx** - Hlavní stránka galerie
3. **app/[locale]/gallery/[slug]/page.tsx** - Detailní stránka svatby
4. **components/sections/WeddingGalleryGrid.tsx** - Komponenta mřížky svateb
5. **components/sections/WeddingDetail.tsx** - Komponenta detailu svatby
6. **components/layout/Header.tsx** - Aktualizována navigace

---

Pro jakékoli otázky nebo úpravy mě neváhejte kontaktovat!
