/**
 * PlayStation 5 UI Data Catalog
 * Self-contained vector art + high-res photo assets with bilingual support (Arabic & English),
 * authentic activity cards, trophy breakdowns, and PS5 Pro badges.
 */

// Embedded crisp vector arts (0ms load, offline ready, 4K sharp)
const PS5_VECTORS = {
  store: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-store)"/><defs><linearGradient id="grad-store" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#003791"/><stop offset="100%" stop-color="#0070d1"/></linearGradient></defs><path fill="#ffffff" d="M70 30h-8c0-6.6-5.4-12-12-12s-12 5.4-12 12h-8c-3.3 0-6 2.7-6 6v38c0 3.3 2.7 6 6 6h40c3.3 0 6-2.7 6-6V36c0-3.3-2.7-6-6-6zm-20-8c4.4 0 8 3.6 8 8h-16c0-4.4 3.6-8 8-8zm20 52H30V36h40v38z"/><circle cx="50" cy="54" r="5" fill="#ffffff"/></svg>`,
  
  spiderman: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-spidey)"/><defs><linearGradient id="grad-spidey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#881337"/><stop offset="100%" stop-color="#e11d48"/></linearGradient></defs><path fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" d="M10 10L90 90M90 10L10 90M50 0v100M0 50h100"/><circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/><polygon points="50,22 55,38 72,42 58,52 64,68 50,58 36,68 42,52 28,42 45,38" fill="#ffffff"/></svg>`,

  gow: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-gow)"/><defs><linearGradient id="grad-gow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs><circle cx="50" cy="46" r="24" fill="none" stroke="#60a5fa" stroke-width="6"/><path d="M30 68c6-8 12-14 20-14s14 6 20 14" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/><path d="M50 20v45" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/></svg>`,

  fc25: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-fc)"/><defs><linearGradient id="grad-fc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#022c22"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><polygon points="50,20 80,72 20,72" fill="none" stroke="#34d399" stroke-width="6"/><text x="50" y="62" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle">FC25</text></svg>`,

  wukong: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-wk)"/><defs><linearGradient id="grad-wk" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#451a03"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs><circle cx="50" cy="50" r="28" fill="none" stroke="#fbbf24" stroke-width="4"/><path d="M25 50h50M50 25v50" stroke="#f59e0b" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="#fbbf24"/></svg>`,

  astro: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-astro)"/><defs><linearGradient id="grad-astro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c4a6e"/><stop offset="100%" stop-color="#0284c7"/></linearGradient></defs><rect x="25" y="32" width="50" height="36" rx="16" fill="#0369a1" stroke="#ffffff" stroke-width="3"/><ellipse cx="40" cy="50" rx="5" ry="7" fill="#38bdf8"/><ellipse cx="60" cy="50" rx="5" ry="7" fill="#38bdf8"/></svg>`,

  gta: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-gta)"/><defs><linearGradient id="grad-gta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#047857"/></linearGradient></defs><text x="50" y="65" font-family="'Arial Black',sans-serif" font-weight="900" font-size="44" fill="#a7f3d0" text-anchor="middle">V</text><text x="50" y="82" font-family="Arial,sans-serif" font-weight="800" font-size="12" fill="#ffffff" text-anchor="middle">GTA</text></svg>`,

  ghost: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-ghost)"/><defs><linearGradient id="grad-ghost" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#450a0a"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs><circle cx="50" cy="50" r="26" fill="none" stroke="#fca5a5" stroke-width="4"/><polygon points="50,28 65,65 35,65" fill="#f87171"/></svg>`,

  youtube: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="#cc0000"/><path d="M72 38c-.8-3-3-5.2-6-6-5.2-1.4-26-1.4-26-1.4s-20.8 0-26 1.4c-3 .8-5.2 3-6 6-1.4 5.3-1.4 16.3-1.4 16.3s0 11 1.4 16.3c.8 3 3 5.2 6 6 5.2 1.4 26 1.4 26 1.4s20.8 0 26-1.4c3-.8 5.2-3 6-6 1.4-5.3 1.4-16.3 1.4-16.3s0-11-1.4-16.3z" fill="#ffffff"/><polygon points="44,43 58,52 44,61" fill="#cc0000"/></svg>`,

  netflix: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="#000000"/><path d="M34 24h9l18 42V24h9v52h-9L43 34v42h-9z" fill="#e50914"/></svg>`,

  shahid: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="url(#grad-sh)"/><defs><linearGradient id="grad-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#00d1b2"/></linearGradient></defs><text x="50" y="58" font-family="'Cairo',sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">شاهد</text><text x="50" y="74" font-family="Arial,sans-serif" font-weight="800" font-size="12" fill="#facc15" text-anchor="middle">VIP</text></svg>`,

  twitch: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="#9146ff"/><path d="M26 22l-6 14v40h14v10l10-10h10l20-20V22H26zm42 30l-8 8H48l-8 8v-8h-8V28h42v24z" fill="#ffffff"/><rect x="42" y="36" width="6" height="12" fill="#9146ff"/><rect x="56" y="36" width="6" height="12" fill="#9146ff"/></svg>`,

  spotify: `<svg viewBox="0 0 100 100" class="vector-art"><rect width="100" height="100" rx="14" fill="#1db954"/><circle cx="50" cy="50" r="30" fill="#191414"/><path d="M36 43c9-2.7 20-2 28 3M38 52c7-2 16-1.5 22 2M41 60c5-1.5 12-1 16 2" stroke="#1db954" stroke-width="4.5" stroke-linecap="round" fill="none"/></svg>`
};

const PS5_DATA = {
  games: [
    {
      id: "ps-store",
      title: { ar: "متجر PlayStation", en: "PlayStation Store" },
      subtitle: { ar: "اكتشف أحدث الألعاب والتخفيضات الكبرى والعروض الحصرية", en: "Discover latest games, mega discounts and exclusive offers" },
      badge: "PS Store",
      type: "store",
      accentColor: "#0070d1",
      vectorArt: PS5_VECTORS.store,
      poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(0, 112, 209, 0.5) 0%, rgba(5, 10, 24, 0.96) 72%), #050a18",
      lastPlayed: { ar: "عروض جديدة متوفرة اليوم", en: "New offers available today" },
      trophies: null,
      primaryAction: { ar: "تصفح المتجر", en: "Explore Store" },
      activities: [
        {
          id: "deals",
          title: { ar: "تخفيضات كبرى: حتى 75% خصم", en: "Mega Sale: Up to 75% Off" },
          subtitle: { ar: "أكثر من 800 لعبة مميزة", en: "Over 800 featured titles" },
          tag: { ar: "عروض مميزة", en: "Featured" },
          bg: "linear-gradient(135deg, #002d72 0%, #0066cc 100%)"
        },
        {
          id: "ps-plus",
          title: { ar: "PlayStation Plus", en: "PlayStation Plus" },
          subtitle: { ar: "كتالوج الألعاب واللعب الجماعي عبر الإنترنت", en: "Game catalog & Online Multiplayer" },
          tag: { ar: "اشتراك", en: "Subscription" },
          bg: "linear-gradient(135deg, #997300 0%, #d4a017 100%)"
        },
        {
          id: "pre-orders",
          title: { ar: "الطلبات المسبقة القادمة", en: "Upcoming Pre-Orders" },
          subtitle: { ar: "احجز نسختك واحصل على مكافآت حصرية", en: "Pre-order now for exclusive rewards" },
          tag: { ar: "قريباً", en: "Coming Soon" },
          bg: "linear-gradient(135deg, #44107a 0%, #a21caf 100%)"
        }
      ]
    },
    {
      id: "spiderman-2",
      title: { ar: "Marvel's Spider-Man 2", en: "Marvel's Spider-Man 2" },
      subtitle: { ar: "معاً لنكون أعظم | مغامرة بيتر باركر ومايلز موراليس بدقة 4K", en: "Be Greater. Together. Peter Parker & Miles Morales in 4K" },
      badge: "PS5 Pro Enhanced",
      type: "game",
      accentColor: "#e60012",
      vectorArt: PS5_VECTORS.spiderman,
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(230, 0, 18, 0.45) 0%, rgba(12, 4, 8, 0.96) 72%), #0c0408",
      lastPlayed: { ar: "لعبت قبل ساعتين • المستوى 45", en: "Played 2h ago • Level 45" },
      trophies: { earned: 38, total: 42, percent: 90 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-1",
          title: { ar: "متابعة المهمة: مواجهة فينوم", en: "Resume: Confronting Venom" },
          subtitle: { ar: "القصة الرئيسية • تقدم 84%", en: "Main Story • 84% Complete" },
          tag: { ar: "متابعة سريعة", en: "Resume" },
          bg: "linear-gradient(135deg, #881337 0%, #e11d48 100%)"
        },
        {
          id: "act-2",
          title: { ar: "تحديات ميستيريو في مانهاتن", en: "Mysteriums across Manhattan" },
          subtitle: { ar: "أنشطة جانبية • 8 من 10 مكتملة", en: "Side Activities • 8 of 10 Cleared" },
          tag: { ar: "نشاط جانبي", en: "Side Quest" },
          bg: "linear-gradient(135deg, #164e63 0%, #0891b2 100%)"
        },
        {
          id: "act-3",
          title: { ar: "بدلات جديدة متوفرة للفتح", en: "New Suits Ready to Unlock" },
          subtitle: { ar: "بدلة السمبيوت السوداء وبدلات الأبعاد", en: "Symbiote suit & Multiverse gear" },
          tag: { ar: "تخصيص", en: "Gear" },
          bg: "linear-gradient(135deg, #3b0764 0%, #7e22ce 100%)"
        }
      ]
    },
    {
      id: "gow-ragnarok",
      title: { ar: "God of War Ragnarök", en: "God of War Ragnarök" },
      subtitle: { ar: "رحلة كراتوس وأتريوس الملحمية عبر العوالم التسعة الأسطورية", en: "Kratos and Atreus journey through the Nine Realms" },
      badge: "PS5",
      type: "game",
      accentColor: "#2a75d3",
      vectorArt: PS5_VECTORS.gow,
      poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(42, 117, 211, 0.45) 0%, rgba(6, 12, 24, 0.96) 72%), #060c18",
      lastPlayed: { ar: "لعبت أمس • طور فالهالا", en: "Played yesterday • Valhalla Mode" },
      trophies: { earned: 32, total: 36, percent: 88 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-gow-1",
          title: { ar: "فالهالا: تحدي الذاكرة السادس", en: "Valhalla: Memory Trial VI" },
          subtitle: { ar: "توسعة مجانية • مكافآت رونية أسطورية", en: "Free DLC • Legendary Runic Rewards" },
          tag: { ar: "فالهالا", en: "Valhalla" },
          bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)"
        },
        {
          id: "act-gow-2",
          title: { ar: "صيد بيرسيركر في نيفلهايم", en: "Berserker Gravestone Niflheim" },
          subtitle: { ar: "معركة زعيم اختياري • صعوبة فائقة", en: "Optional Boss Battle • Brutal" },
          tag: { ar: "زعيم أسطوري", en: "Boss" },
          bg: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)"
        }
      ]
    },
    {
      id: "fc-25",
      title: { ar: "EA SPORTS FC 25", en: "EA SPORTS FC 25" },
      subtitle: { ar: "نادي العالم | تجربة كرة القدم الواقعية بمحرك HyperMotionV وRush", en: "The World's Game | Powered by HyperMotionV & Rush" },
      badge: "PS5",
      type: "game",
      accentColor: "#05f26c",
      vectorArt: PS5_VECTORS.fc25,
      poster: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(5, 242, 108, 0.4) 0%, rgba(3, 16, 8, 0.96) 72%), #031008",
      lastPlayed: { ar: "لعبت قبل 4 ساعات • دوري أبطال أوروبا", en: "Played 4h ago • Champions League" },
      trophies: { earned: 24, total: 40, percent: 60 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-fc-1",
          title: { ar: "Ultimate Team: دوري عطلة الأسبوع", en: "Ultimate Team: Champions Weekend" },
          subtitle: { ar: "تبقت 6 مباريات للحصول على التصنيف 1", en: "6 matches remaining for Rank 1" },
          tag: { ar: "أونلاين", en: "Online" },
          bg: "linear-gradient(135deg, #022c22 0%, #059669 100%)"
        },
        {
          id: "act-fc-2",
          title: { ar: "طور المهنة: ريال مدريد", en: "Manager Career: Real Madrid" },
          subtitle: { ar: "نهائي كأس السوبر الأوروبي قادم", en: "UEFA Super Cup Final Upcoming" },
          tag: { ar: "المهنة", en: "Career" },
          bg: "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
        }
      ]
    },
    {
      id: "wukong",
      title: { ar: "Black Myth: Wukong", en: "Black Myth: Wukong" },
      subtitle: { ar: "تقمص دور القدر المحتوم في أسطورة الشرق المبهرة ومحاربة الوحوش", en: "Embrace Destiny in the Journey to the West" },
      badge: "PS5",
      type: "game",
      accentColor: "#d97706",
      vectorArt: PS5_VECTORS.wukong,
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(217, 119, 6, 0.45) 0%, rgba(18, 9, 3, 0.96) 72%), #120903",
      lastPlayed: { ar: "لعبت قبل يومين • الفصل الرابع", en: "Played 2d ago • Chapter 4" },
      trophies: { earned: 21, total: 36, percent: 58 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-wk-1",
          title: { ar: "معركة زعيم: ملك الثعالب الشيطاني", en: "Boss Fight: Demon Fox King" },
          subtitle: { ar: "كهف خيوط الحرير • الفصل 4", en: "Webbed Hollow • Chapter IV" },
          tag: { ar: "زعيم رئيسي", en: "Boss" },
          bg: "linear-gradient(135deg, #451a03 0%, #b45309 100%)"
        }
      ]
    },
    {
      id: "astro-bot",
      title: { ar: "ASTRO BOT", en: "ASTRO BOT" },
      subtitle: { ar: "مغامرة فضائية مبهجة تحتفي بتاريخ PlayStation وأكثر من 300 شخصية", en: "A supersized space adventure celebrating PlayStation" },
      badge: "PS5 Pro Enhanced",
      type: "game",
      accentColor: "#38bdf8",
      vectorArt: PS5_VECTORS.astro,
      poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(56, 189, 248, 0.45) 0%, rgba(4, 16, 28, 0.96) 72%), #04101c",
      lastPlayed: { ar: "لعبت اليوم • تم إنقاذ 280 آلياً", en: "Played today • 280 Bots Rescued" },
      trophies: { earned: 43, total: 44, percent: 98 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-astro-1",
          title: { ar: "مجرة الخيال: الكوكب السري المفقود", en: "Tentacle System: Lost Secret Galaxy" },
          subtitle: { ar: "تبقت شخصية VIP سرية واحدة لإنقاذها", en: "1 Secret VIP Bot remaining" },
          tag: { ar: "مهمة سرية", en: "Secret" },
          bg: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)"
        }
      ]
    },
    {
      id: "gta-v",
      title: { ar: "Grand Theft Auto V", en: "Grand Theft Auto V" },
      subtitle: { ar: "لوس سانتوس ومقاطعة بلين بدقة 4K ومعدل 60 إطاراً وصوت ثلاثي الأبعاد", en: "Experience Los Santos and Blaine County in 4K 60FPS" },
      badge: "PS5",
      type: "game",
      accentColor: "#10b981",
      vectorArt: PS5_VECTORS.gta,
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(16, 185, 129, 0.4) 0%, rgba(3, 18, 12, 0.96) 72%), #03120c",
      lastPlayed: { ar: "لعبت الأسبوع الماضي • GTA Online", en: "Played last week • GTA Online" },
      trophies: { earned: 45, total: 77, percent: 58 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-gta-1",
          title: { ar: "سطو كايو بيريكو: المهمة النهائية", en: "The Cayo Perico Heist: Finale" },
          subtitle: { ar: "المكافأة المحتملة: $1,900,000", en: "Potential Take: $1,900,000" },
          tag: { ar: "عملية سطو", en: "Heist" },
          bg: "linear-gradient(135deg, #064e3b 0%, #047857 100%)"
        }
      ]
    },
    {
      id: "ghost-tsushima",
      title: { ar: "Ghost of Tsushima: Director's Cut", en: "Ghost of Tsushima: Director's Cut" },
      subtitle: { ar: "طريق الساموراي وشبح تسوشيما جين ساكاي في تجربة سينمائية ساحرة", en: "The Path of the Samurai and the Ghost Jin Sakai" },
      badge: "PS5",
      type: "game",
      accentColor: "#ef4444",
      vectorArt: PS5_VECTORS.ghost,
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(239, 68, 68, 0.4) 0%, rgba(20, 5, 5, 0.96) 72%), #140505",
      lastPlayed: { ar: "لعبت قبل 5 أيام • جزيرة إيكي", en: "Played 5d ago • Iki Island" },
      trophies: { earned: 52, total: 52, percent: 100 },
      primaryAction: { ar: "تشغيل اللعبة", en: "Play Game" },
      activities: [
        {
          id: "act-got-1",
          title: { ar: "مبارزة تحت أوراق الخريف المتساقطة", en: "Duel Under Falling Leaves" },
          subtitle: { ar: "أسطورة كودان • مكافأة درع الساموراي الشبح", en: "Mythic Tale • Ghost Armour Reward" },
          tag: { ar: "قصة أسطورية", en: "Mythic" },
          bg: "linear-gradient(135deg, #450a0a 0%, #991b1b 100%)"
        }
      ]
    }
  ],

  media: [
    {
      id: "youtube",
      title: { ar: "YouTube", en: "YouTube" },
      subtitle: { ar: "شاهد مقاطع الفيديو والقنوات والفعاليات الحية بدقة 4K HDR", en: "Watch videos, creators, and esports in 4K HDR" },
      badge: "Media",
      type: "media",
      accentColor: "#ff0000",
      vectorArt: PS5_VECTORS.youtube,
      poster: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(255, 0, 0, 0.4) 0%, rgba(20, 4, 4, 0.96) 72%), #140404",
      lastPlayed: { ar: "تطبيق مثبت • جاهز للاستخدام", en: "Installed App • Ready to Watch" },
      trophies: null,
      primaryAction: { ar: "فتح التطبيق", en: "Open App" },
      activities: [
        {
          id: "yt-sub",
          title: { ar: "الاشتراكات: مقاطع جديدة بانتظارك", en: "Subscriptions: New videos waiting" },
          subtitle: { ar: "قنوات ألعاب التقنية والـ Gaming", en: "Tech & Gaming Channels" },
          tag: { ar: "جديد", en: "New" },
          bg: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)"
        }
      ]
    },
    {
      id: "netflix",
      title: { ar: "Netflix", en: "Netflix" },
      subtitle: { ar: "أفلام ومسلسلات وبرامج وثائقية غير محدودة بصوت دولبي أتموس", en: "Unlimited movies, TV shows, and Dolby Atmos audio" },
      badge: "Media",
      type: "media",
      accentColor: "#e50914",
      vectorArt: PS5_VECTORS.netflix,
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(229, 9, 20, 0.45) 0%, rgba(16, 4, 6, 0.96) 72%), #100406",
      lastPlayed: { ar: "متابعة المشاهدة • Stranger Things", en: "Continue Watching • Stranger Things" },
      trophies: null,
      primaryAction: { ar: "فتح التطبيق", en: "Open App" },
      activities: [
        {
          id: "nflx-1",
          title: { ar: "متابعة: Stranger Things الموسم 4", en: "Continue: Stranger Things S4:E7" },
          subtitle: { ar: "تبقت 28 دقيقة من الحلقة", en: "28 minutes left" },
          tag: { ar: "متابعة", en: "Resume" },
          bg: "linear-gradient(135deg, #450a0a 0%, #991b1b 100%)"
        }
      ]
    },
    {
      id: "shahid",
      title: { ar: "Shahid VIP", en: "Shahid VIP" },
      subtitle: { ar: "أضخم الإنتاجات العربية الأصلية والمسلسلات الحصرية وقنوات البث المباشر", en: "Top Arabic Originals and Exclusive Live Series" },
      badge: "Media",
      type: "media",
      accentColor: "#00d1b2",
      vectorArt: PS5_VECTORS.shahid,
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(0, 209, 178, 0.4) 0%, rgba(3, 20, 18, 0.96) 72%), #031412",
      lastPlayed: { ar: "اشتراك VIP نشط", en: "Active VIP Subscription" },
      trophies: null,
      primaryAction: { ar: "فتح التطبيق", en: "Open App" },
      activities: [
        {
          id: "shhd-1",
          title: { ar: "أحدث الحلقات الأصلية الحصرية", en: "Latest Exclusive Originals" },
          subtitle: { ar: "شاهد قبل الجميع بجودة فائقة 4K", en: "Watch before anyone in 4K" },
          tag: { ar: "حصري", en: "Exclusive" },
          bg: "linear-gradient(135deg, #064e3b 0%, #00d1b2 100%)"
        }
      ]
    },
    {
      id: "twitch",
      title: { ar: "Twitch", en: "Twitch" },
      subtitle: { ar: "بثوث ألعاب حية وتفاعل مباشر مع أفضل اللاعبين وصناع المحتوى", en: "Live game streams and chat with top gamers" },
      badge: "Media",
      type: "media",
      accentColor: "#9146ff",
      vectorArt: PS5_VECTORS.twitch,
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(145, 70, 255, 0.45) 0%, rgba(12, 4, 24, 0.96) 72%), #0c0418",
      lastPlayed: { ar: "قنوات تتابعها تبث الآن", en: "Followed channels live now" },
      trophies: null,
      primaryAction: { ar: "فتح التطبيق", en: "Open App" },
      activities: [
        {
          id: "tw-1",
          title: { ar: "بطولة PlayStation الرسمية مباشرة", en: "Official PlayStation Tourney Live" },
          subtitle: { ar: "أكثر من 85 ألف مشاهد الآن", en: "85K+ Viewers Live" },
          tag: { ar: "مباشر", en: "LIVE" },
          bg: "linear-gradient(135deg, #3b0764 0%, #7e22ce 100%)"
        }
      ]
    },
    {
      id: "spotify",
      title: { ar: "Spotify", en: "Spotify" },
      subtitle: { ar: "استمع لموسيقاك المفضلة والبودكاست في الخلفية أثناء اللعب", en: "Listen to music & podcasts in the background while playing" },
      badge: "Media",
      type: "media",
      accentColor: "#1db954",
      vectorArt: PS5_VECTORS.spotify,
      poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      bgImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&auto=format&fit=crop&q=85",
      bgFallbackGradient: "radial-gradient(ellipse at 80% 25%, rgba(29, 185, 84, 0.4) 0%, rgba(3, 18, 8, 0.96) 72%), #031208",
      lastPlayed: { ar: "جاهز للتشغيل في الخلفية", en: "Background Playback Ready" },
      trophies: null,
      primaryAction: { ar: "فتح التطبيق", en: "Open App" },
      activities: [
        {
          id: "sp-1",
          title: { ar: "قائمة تشغيل: حماس الألعاب والتركيز", en: "Playlist: Ultimate Gaming Hype" },
          subtitle: { ar: "موسيقى سينمائية وإلكترونية مميزة", en: "Cinematic & Electronic Soundtracks" },
          tag: { ar: "موسيقى", en: "Audio" },
          bg: "linear-gradient(135deg, #064e3b 0%, #047857 100%)"
        }
      ]
    }
  ],

  userProfile: {
    name: "PlayStation_Gamer",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    status: "online",
    trophyLevel: 428,
    plusMember: true,
    goldTrophies: 124,
    platinumTrophies: 18
  }
};

window.PS5_DATA = PS5_DATA;
