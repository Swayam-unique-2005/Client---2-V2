// Product images
import incenseSticks from "@/assets/products/incense-sticks.jpg";
import ghee from "@/assets/products/ghee.jpg";
import kumkum from "@/assets/products/kumkum.jpg";
import camphor from "@/assets/products/camphor.jpg";
import turmeric from "@/assets/products/turmeric.jpg";
import vibhuti from "@/assets/products/vibhuti.jpg";
import ganpati from "@/assets/products/ganpati.jpg";
import kalash from "@/assets/products/kalash.jpg";
import gheeDiyas from "@/assets/products/ghee-diyas.jpg";
import diary from "@/assets/products/diary.jpg";
import incenseBurner from "@/assets/products/incense-burner.jpg";
import crystalPyramid from "@/assets/products/crystal-pyramid.jpg";
import rudraksha from "@/assets/products/rudraksha.jpg";
import brassDiya from "@/assets/products/brass-diya.jpg";
import singingBowl from "@/assets/products/singing-bowl.jpg";
import goldenGanesha from "@/assets/products/golden-ganesha.jpg";
import copperBottle from "@/assets/products/copper-bottle.jpg";
import lavenderCandle from "@/assets/products/lavender-candle.jpg";
import ceramicMug from "@/assets/products/ceramic-mug.jpg";
import ledLamp from "@/assets/products/led-lamp.jpg";
import cottonTowels from "@/assets/products/cotton-towels.jpg";
import speaker from "@/assets/products/speaker.jpg";
import quoteFrame from "@/assets/products/quote-frame.jpg";
import buddha from "@/assets/products/buddha.jpg";
import murugan from "@/assets/products/murugan.jpg";
import radhaKrishna from "@/assets/products/radha-krishna.jpg";
import saiBaba from "@/assets/products/sai-baba.jpg";
import arunagirinathar from "@/assets/products/arunagirinathar.jpg";
import bhagavadGita from "@/assets/products/bhagavad-gita.jpg";
import yogaSutras from "@/assets/products/yoga-sutras.jpg";
import autobiographyYogi from "@/assets/products/autobiography-yogi.jpg";
import thirukkural from "@/assets/products/thirukkural.jpg";
import mantrasBook from "@/assets/products/mantras-book.jpg";
import coloringBook from "@/assets/products/coloring-book.jpg";
import meditationJournal from "@/assets/products/meditation-journal.jpg";
import thiruppugazhBook from "@/assets/products/thiruppugazh-book.jpg";
import chakraBook from "@/assets/products/chakra-book.jpg";
import prayerShawl from "@/assets/products/prayer-shawl.jpg";
import cottonKurta from "@/assets/products/cotton-kurta.jpg";
import meditationCushion from "@/assets/products/meditation-cushion.jpg";
import yogaMat from "@/assets/products/yoga-mat.jpg";
import affirmationCards from "@/assets/products/affirmation-cards.jpg";
import tuningFork from "@/assets/products/tuning-fork.jpg";
import poojaThali from "@/assets/products/pooja-thali.jpg";
import agarbattiStand from "@/assets/products/agarbatti-stand.jpg";
import cottonDhoti from "@/assets/products/cotton-dhoti.jpg";
import meditationBlanket from "@/assets/products/meditation-blanket.jpg";
import malaCounter from "@/assets/products/mala-counter.jpg";
import meditationTimer from "@/assets/products/meditation-timer.jpg";
import poojaBell from "@/assets/products/pooja-bell.jpg";
import angavastram from "@/assets/products/angavastram.jpg";
import tulsiMala from "@/assets/products/tulsi-mala.jpg";
import yogaBag from "@/assets/products/yoga-bag.jpg";
import cushionCover from "@/assets/products/cushion-cover.jpg";
import essentialOil from "@/assets/products/essential-oil.jpg";
import malaBag from "@/assets/products/mala-bag.jpg";
import omWallArt from "@/assets/products/om-wall-art.jpg";
import roseWater from "@/assets/products/rose-water.jpg";
import cottonLungi from "@/assets/products/cotton-lungi.jpg";
import windChimes from "@/assets/products/wind-chimes.jpg";
import meditationScarf from "@/assets/products/meditation-scarf.jpg";
import woodenMandir from "@/assets/products/wooden-mandir.jpg";
import yogaPants from "@/assets/products/yoga-pants.jpg";

export interface ProductVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  priceMax?: number;
  image: string;
  category: string;
  section: string[];
  description: string;
  type: "simple" | "variable";
  variants?: ProductVariant[];
  relatedIds?: string[];
  rating?: number;
  reviewCount?: number;
}

export const products: Product[] = [
  // ─── POOJA ESSENTIAL ───
  { id: "sandalwood-incense", name: "Premium Sandalwood Incense Sticks", price: 250, image: incenseSticks, category: "Pooja Essential", section: ["reordered"], description: "Hand-rolled premium sandalwood incense sticks crafted from pure sandalwood powder. Burns evenly with a calming, divine fragrance that purifies your sacred space.", type: "simple", rating: 4.7, reviewCount: 42, relatedIds: ["sandalwood-incense-premium", "agarbatti-stand", "incense-burner"] },
  { id: "pure-ghee", name: "Organic Pure Ghee for Aarti", price: 450, image: ghee, category: "Pooja Essential", section: ["reordered"], description: "100% organic clarified butter specially prepared for aarti and pooja rituals. Made from grass-fed cow milk using traditional bilona method.", type: "simple", rating: 4.5, reviewCount: 25, relatedIds: ["ghee-diyas-pack", "pooja-bell", "pooja-thali-set"] },
  { id: "kumkum-powder", name: "Traditional Kumkum Powder (60g)", price: 180, image: kumkum, category: "Pooja Essential", section: ["reordered"], description: "Authentic vermillion kumkum powder prepared using traditional methods. Rich red color, perfect for daily pooja and special occasions.", type: "simple", rating: 4.9, reviewCount: 60, relatedIds: ["turmeric-powder", "vibhuti-bhasma", "rose-water"] },
  { id: "camphor-tablets", name: "Refined Camphor Tablets (50g)", price: 320, image: camphor, category: "Pooja Essential", section: ["reordered"], description: "Pure refined camphor tablets that burn cleanly without residue. Essential for aarti, creating a sacred atmosphere during worship.", type: "simple", rating: 4.4, reviewCount: 38, relatedIds: ["pooja-bell", "pure-ghee", "ghee-diyas-pack"] },
  { id: "turmeric-powder", name: "Natural Turmeric Powder (50g)", price: 150, image: turmeric, category: "Pooja Essential", section: ["reordered"], description: "Freshly ground natural turmeric powder for pooja rituals. Sourced from organic farms, vibrant yellow color with earthy aroma.", type: "simple", rating: 4.8, reviewCount: 55, relatedIds: ["kumkum-powder", "vibhuti-bhasma", "rose-water"] },
  { id: "vibhuti-bhasma", name: "Sacred Vibhuti/Bhasma (50g)", price: 210, image: vibhuti, category: "Pooja Essential", section: ["reordered"], description: "Sacred vibhuti (holy ash) prepared through traditional vedic process. Used for spiritual marking and offering during prayers.", type: "simple", rating: 4.6, reviewCount: 30, relatedIds: ["kumkum-powder", "turmeric-powder", "camphor-tablets"] },
  { id: "ghee-diyas-pack", name: "Pack of 4 Pure Ghee Aarti Diyas", price: 600, image: gheeDiyas, category: "Pooja Essential", section: ["top-selling"], description: "Set of 4 beautifully crafted brass diyas designed for ghee aarti. Provides steady, warm flame that enhances the devotional atmosphere.", type: "simple", rating: 4.5, reviewCount: 33, relatedIds: ["pure-ghee", "pooja-bell", "ornate-brass-diya"] },
  { id: "lavender-candle", name: "Lavender Scented Candle", price: 750, image: lavenderCandle, category: "Pooja Essential", section: ["recently-viewed"], description: "Hand-poured soy wax candle infused with pure lavender essential oil. Creates a calming atmosphere for meditation and relaxation.", type: "simple", rating: 4.3, reviewCount: 18, relatedIds: ["essential-oil-sandalwood", "rose-water", "sandalwood-incense"] },
  { id: "sandalwood-incense-premium", name: "Sandalwood Incense Sticks (Premium)", price: 950, image: incenseSticks, category: "Pooja Essential", section: ["just-for-you"], description: "Premium-grade sandalwood incense sticks made from aged sandalwood. Longer burn time with an exquisite, lingering fragrance.", type: "simple", rating: 4.8, reviewCount: 20, relatedIds: ["sandalwood-incense", "incense-burner", "agarbatti-stand"] },
  { id: "pooja-thali-set", name: "Brass Pooja Thali Set", price: 1400, priceMax: 2200, image: poojaThali, category: "Pooja Essential", section: ["top-selling"], description: "Complete brass pooja thali set with small bowls, bell, and diya holder. Everything you need for daily worship in one elegant set.", type: "variable", variants: [{ label: "Standard Set", price: 1400 }, { label: "Premium Set", price: 1800 }, { label: "Grand Set", price: 2200 }], rating: 4.7, reviewCount: 28, relatedIds: ["pooja-bell", "ghee-diyas-pack", "ornate-brass-diya"] },
  { id: "agarbatti-stand", name: "Ornate Brass Agarbatti Stand", price: 350, image: agarbattiStand, category: "Pooja Essential", section: ["reordered"], description: "Beautifully crafted brass incense stick holder with ash catcher. Traditional design that complements any pooja setup.", type: "simple", rating: 4.4, reviewCount: 22, relatedIds: ["sandalwood-incense", "incense-burner", "sandalwood-incense-premium"] },
  { id: "rose-water", name: "Natural Rose Water for Pooja (200ml)", price: 280, image: roseWater, category: "Pooja Essential", section: ["reordered"], description: "Pure rose water distilled from fresh Damask roses. Used for sprinkling during pooja rituals and offering to deities.", type: "simple", rating: 4.6, reviewCount: 35, relatedIds: ["kumkum-powder", "turmeric-powder", "essential-oil-sandalwood"] },
  { id: "essential-oil-sandalwood", name: "Sandalwood Essential Oil (15ml)", price: 650, priceMax: 1200, image: essentialOil, category: "Pooja Essential", section: ["just-for-you"], description: "Pure sandalwood essential oil for aromatherapy and pooja. Steam-distilled from sustainably sourced sandalwood.", type: "variable", variants: [{ label: "15ml Bottle", price: 650 }, { label: "30ml Bottle", price: 1200 }], rating: 4.7, reviewCount: 15, relatedIds: ["lavender-candle", "rose-water", "sandalwood-incense-premium"] },
  { id: "pooja-bell", name: "Brass Pooja Ghanti Bell", price: 450, image: poojaBell, category: "Pooja Essential", section: ["top-selling"], description: "Traditional brass pooja bell with resonant tone. The sacred sound of the ghanti purifies the atmosphere during worship.", type: "simple", rating: 4.5, reviewCount: 40, relatedIds: ["pooja-thali-set", "ghee-diyas-pack", "camphor-tablets"] },

  // ─── BOOKS ───
  { id: "meditation-diary", name: "Premium Leather-Bound Mindful Meditation Diary", price: 1500, priceMax: 2200, image: diary, category: "Books", section: ["top-selling"], description: "Handcrafted leather-bound journal with guided meditation prompts. Thick acid-free pages with elegant copper-foil embossing.", type: "variable", variants: [{ label: "Standard Edition", price: 1500 }, { label: "Collector's Edition", price: 2200 }], rating: 4.8, reviewCount: 32, relatedIds: ["meditation-journal", "mantras-book", "affirmation-cards"] },
  { id: "quote-frame-valor", name: "The Art of Righteous Valor - Spiritual Quote Frame", price: 1200, image: quoteFrame, category: "Books", section: ["new-arrivals"], description: "Beautifully framed spiritual quote on righteous valor. Printed on handmade paper with elegant copper-foil lettering.", type: "simple", rating: 4.6, reviewCount: 14, relatedIds: ["om-wall-art", "buddha-decor", "meditation-journal"] },
  { id: "bhagavad-gita", name: "Bhagavad Gita — Deluxe Edition", price: 1800, priceMax: 3500, image: bhagavadGita, category: "Books", section: ["top-selling"], description: "Deluxe hardcover edition of the Bhagavad Gita with Sanskrit verses, transliteration, and detailed commentary. Gold-embossed cover with premium binding.", type: "variable", variants: [{ label: "Hardcover", price: 1800 }, { label: "Leather-Bound Deluxe", price: 3500 }], rating: 4.9, reviewCount: 48, relatedIds: ["yoga-sutras", "thirukkural", "autobiography-yogi"] },
  { id: "yoga-sutras", name: "Yoga Sutras of Patanjali", price: 950, image: yogaSutras, category: "Books", section: ["just-for-you"], description: "Comprehensive translation and commentary on Patanjali's Yoga Sutras. A timeless guide to the philosophy and practice of yoga.", type: "simple", rating: 4.7, reviewCount: 36, relatedIds: ["bhagavad-gita", "autobiography-yogi", "chakra-book"] },
  { id: "autobiography-yogi", name: "Autobiography of a Yogi", price: 750, image: autobiographyYogi, category: "Books", section: ["top-selling"], description: "The spiritual classic by Paramahansa Yogananda. A fascinating account of one man's journey to self-realization and divine consciousness.", type: "simple", rating: 4.8, reviewCount: 52, relatedIds: ["bhagavad-gita", "yoga-sutras", "thirukkural"] },
  { id: "thirukkural", name: "Thirukkural — Complete Tamil Classic", price: 1100, image: thirukkural, category: "Books", section: ["just-for-you"], description: "Complete edition of Thiruvalluvar's Thirukkural with original Tamil couplets and English translation. One of the greatest works of Tamil literature.", type: "simple", rating: 4.8, reviewCount: 30, relatedIds: ["thiruppugazh-book", "bhagavad-gita", "mantras-book"] },
  { id: "mantras-book", name: "Sacred Mantras Collection", price: 680, image: mantrasBook, category: "Books", section: ["reordered"], description: "Comprehensive collection of sacred mantras with pronunciation guide and meaning. Includes mantras for daily chanting and special occasions.", type: "simple", rating: 4.5, reviewCount: 25, relatedIds: ["bhagavad-gita", "meditation-diary", "affirmation-cards"] },
  { id: "coloring-book", name: "Spiritual Mandala Coloring Book", price: 450, image: coloringBook, category: "Books", section: ["new-arrivals"], description: "Adult coloring book featuring intricate mandala designs and spiritual symbols. A meditative art therapy experience for inner peace.", type: "simple", rating: 4.3, reviewCount: 19, relatedIds: ["meditation-journal", "meditation-diary", "affirmation-cards"] },
  { id: "meditation-journal", name: "Guided Meditation Journal", price: 850, image: meditationJournal, category: "Books", section: ["new-arrivals"], description: "Beautifully designed journal with daily meditation prompts, gratitude pages, and mindfulness exercises. Helps build a consistent practice.", type: "simple", rating: 4.6, reviewCount: 27, relatedIds: ["meditation-diary", "coloring-book", "affirmation-cards"] },
  { id: "thiruppugazh-book", name: "Thiruppugazh — Devotional Poetry", price: 980, image: thiruppugazhBook, category: "Books", section: ["just-for-you"], description: "Collection of Arunagirinathar's Thiruppugazh devotional hymns with meaning and commentary. A masterpiece of Tamil devotional literature.", type: "simple", rating: 4.7, reviewCount: 22, relatedIds: ["thirukkural", "bhagavad-gita", "mantras-book"] },
  { id: "chakra-book", name: "Chakra Healing Guide", price: 720, image: chakraBook, category: "Books", section: ["new-arrivals"], description: "Complete guide to understanding and balancing your seven chakras. Includes meditation techniques, affirmations, and healing practices.", type: "simple", rating: 4.4, reviewCount: 16, relatedIds: ["yoga-sutras", "meditation-journal", "tuning-fork-set"] },

  // ─── DIVINE ACCESSORIES ───
  { id: "brass-ganpati", name: "Traditional Brass Ganpati Statue (High 6 inches)", price: 1200, image: ganpati, category: "Divine Accessories", section: ["top-selling"], description: "Exquisitely crafted 6-inch brass Ganpati statue with intricate detailing. Each piece is handmade by skilled artisans using traditional lost-wax casting technique.", type: "simple", rating: 4.8, reviewCount: 44, relatedIds: ["golden-ganesha", "purna-kalash", "ornate-brass-diya"] },
  { id: "purna-kalash", name: "Traditional Purna Kalash with Mango Pata", price: 850, image: kalash, category: "Divine Accessories", section: ["top-selling"], description: "Traditional copper Purna Kalash adorned with sacred mango leaves. Symbol of abundance and prosperity for your pooja room.", type: "simple", rating: 4.6, reviewCount: 28, relatedIds: ["brass-ganpati", "pooja-thali-set", "ornate-brass-diya"] },
  { id: "incense-burner", name: "Aromatic Carved Wooden Incense Burner", price: 400, image: incenseBurner, category: "Divine Accessories", section: ["top-selling"], description: "Intricately carved wooden incense burner from sustainable rosewood. Features traditional motifs and ash-catching tray design.", type: "simple", rating: 4.5, reviewCount: 34, relatedIds: ["sandalwood-incense", "agarbatti-stand", "sandalwood-incense-premium"] },
  { id: "crystal-pyramid", name: "Natural Clear Quartz Crystal Healing Pyramid", price: 950, image: crystalPyramid, category: "Divine Accessories", section: ["top-selling"], description: "Natural clear quartz crystal shaped into a sacred pyramid. Believed to amplify positive energy and aid in meditation and healing practices.", type: "simple", rating: 4.4, reviewCount: 20, relatedIds: ["singing-bowl", "tuning-fork-set", "rudraksha-mala"] },
  { id: "rudraksha-mala", name: "Authentic Rudraksha Mala", price: 1500, image: rudraksha, category: "Divine Accessories", section: ["just-for-you"], description: "Genuine 5-mukhi Rudraksha mala with 108+1 beads. Each bead is naturally formed and energized through vedic rituals.", type: "simple", rating: 4.9, reviewCount: 55, relatedIds: ["tulsi-mala", "mala-counter", "mala-bag"] },
  { id: "ornate-brass-diya", name: "Ornate Brass Diya", price: 1200, priceMax: 2000, image: brassDiya, category: "Divine Accessories", section: ["just-for-you"], description: "Magnificently designed ornate brass diya with traditional engravings. Available in multiple sizes, each a masterpiece of craftsmanship.", type: "variable", variants: [{ label: "Small (4 inch)", price: 1200 }, { label: "Medium (6 inch)", price: 1600 }, { label: "Large (8 inch)", price: 2000 }], rating: 4.7, reviewCount: 38, relatedIds: ["ghee-diyas-pack", "brass-ganpati", "purna-kalash"] },
  { id: "golden-ganesha", name: "Golden Ganesha Idol", price: 2800, priceMax: 4500, image: goldenGanesha, category: "Divine Accessories", section: ["just-for-you"], description: "Stunning golden-finish Ganesha idol with meticulous detailing. A centerpiece for your pooja room or a meaningful spiritual gift.", type: "variable", variants: [{ label: "6 inch", price: 2800 }, { label: "8 inch", price: 3500 }, { label: "10 inch", price: 4500 }], rating: 4.8, reviewCount: 30, relatedIds: ["brass-ganpati", "radha-krishna-decor", "murugan-decor"] },
  { id: "copper-bottle", name: "Hammered Copper Bottle", price: 1800, image: copperBottle, category: "Divine Accessories", section: ["recently-viewed"], description: "Ayurvedic hammered copper water bottle. Drinking water stored in copper is believed to balance the three doshas.", type: "simple", rating: 4.5, reviewCount: 42, relatedIds: ["ceramic-mug", "purna-kalash", "pooja-thali-set"] },
  { id: "ceramic-mug", name: "Handmade Ceramic Mug", price: 950, image: ceramicMug, category: "Divine Accessories", section: ["recently-viewed"], description: "Artisan-crafted ceramic mug with natural glaze finish. Each piece is unique, perfect for your mindful morning tea ritual.", type: "simple", rating: 4.3, reviewCount: 16, relatedIds: ["copper-bottle", "cushion-cover", "lavender-candle"] },
  { id: "led-lamp", name: "Smart LED Table Lamp", price: 3200, image: ledLamp, category: "Divine Accessories", section: ["recently-viewed"], description: "Modern smart LED table lamp with adjustable warm-tone lighting. Creates the perfect ambient glow for meditation and reading.", type: "simple", rating: 4.4, reviewCount: 12, relatedIds: ["singing-bowl", "meditation-timer", "meditation-cushion"] },
  { id: "buddha-decor", name: "Lord Buddha | Spiritual Decor", price: 2200, image: buddha, category: "Divine Accessories", section: ["new-arrivals"], description: "Serene Lord Buddha statue crafted from premium resin with antique finish. A symbol of peace and enlightenment for your living space.", type: "simple", rating: 4.7, reviewCount: 24, relatedIds: ["murugan-decor", "sai-baba-decor", "radha-krishna-decor"] },
  { id: "murugan-decor", name: "Lord Murugan | Spiritual Decor", price: 2500, image: murugan, category: "Divine Accessories", section: ["new-arrivals"], description: "Majestic Lord Murugan brass statue with vel (divine spear). Handcrafted by skilled artisans in traditional Thanjavur style.", type: "simple", rating: 4.8, reviewCount: 18, relatedIds: ["arunagirinathar-decor", "buddha-decor", "golden-ganesha"] },
  { id: "arunagirinathar-decor", name: "Arunagirinathar | Spiritual Decor", price: 2300, image: arunagirinathar, category: "Divine Accessories", section: ["new-arrivals"], description: "Tribute statue of the great Tamil saint-poet Arunagirinathar. Exquisitely detailed brass sculpture honoring the author of Thiruppugazh.", type: "simple", rating: 4.6, reviewCount: 10, relatedIds: ["murugan-decor", "thiruppugazh-book", "buddha-decor"] },
  { id: "radha-krishna-decor", name: "Sri Radha Krishna | Spiritual Decor", price: 3200, image: radhaKrishna, category: "Divine Accessories", section: ["new-arrivals"], description: "Divine Sri Radha Krishna statue set depicting the eternal love. Handcrafted brass with antique patina finish.", type: "simple", rating: 4.9, reviewCount: 22, relatedIds: ["golden-ganesha", "buddha-decor", "sai-baba-decor"] },
  { id: "sai-baba-decor", name: "Shirdi Sai Baba | Spiritual Decor", price: 2400, image: saiBaba, category: "Divine Accessories", section: ["new-arrivals"], description: "Blessed Shirdi Sai Baba statue in meditative pose. Premium brass with fine detailing, ideal for daily worship.", type: "simple", rating: 4.7, reviewCount: 26, relatedIds: ["buddha-decor", "radha-krishna-decor", "brass-ganpati"] },
  { id: "om-wall-art", name: "Hand-Painted Om Mandala Wall Art", price: 1600, image: omWallArt, category: "Divine Accessories", section: ["new-arrivals"], description: "Beautiful hand-painted wooden Om mandala wall hanging. Sacred symbol artwork that brings positive energy to your home.", type: "simple", rating: 4.5, reviewCount: 14, relatedIds: ["quote-frame-valor", "buddha-decor", "wind-chimes"] },
  { id: "wooden-mandir", name: "Handcrafted Wooden Pooja Mandir", price: 8500, priceMax: 15000, image: woodenMandir, category: "Divine Accessories", section: ["top-selling"], description: "Exquisitely carved wooden pooja mandir for your home. Traditional temple design with intricate detailing and premium finish.", type: "variable", variants: [{ label: "Compact (18 inch)", price: 8500 }, { label: "Standard (24 inch)", price: 12000 }, { label: "Grand (36 inch)", price: 15000 }], rating: 4.9, reviewCount: 35, relatedIds: ["brass-ganpati", "pooja-thali-set", "ornate-brass-diya"] },
  { id: "wind-chimes", name: "Bamboo Zen Wind Chimes", price: 650, image: windChimes, category: "Divine Accessories", section: ["just-for-you"], description: "Handcrafted bamboo wind chimes producing soothing, melodic tones. Creates a peaceful ambiance for meditation and relaxation.", type: "simple", rating: 4.3, reviewCount: 20, relatedIds: ["singing-bowl", "om-wall-art", "meditation-timer"] },
  { id: "tulsi-mala", name: "Sacred Tulsi Mala (108 Beads)", price: 800, image: tulsiMala, category: "Divine Accessories", section: ["just-for-you"], description: "Authentic Tulsi wood mala with 108 beads for japa meditation. Each bead is hand-polished and strung with care.", type: "simple", rating: 4.6, reviewCount: 32, relatedIds: ["rudraksha-mala", "mala-counter", "mala-bag"] },

  // ─── CLOTHING ───
  { id: "cotton-towels", name: "Organic Cotton Towels", price: 2100, image: cottonTowels, category: "Clothing", section: ["recently-viewed"], description: "Set of premium organic cotton towels. Soft, absorbent, and sustainably made with natural dyes.", type: "simple", rating: 4.4, reviewCount: 18, relatedIds: ["cotton-dhoti", "cotton-kurta", "angavastram"] },
  { id: "prayer-shawl", name: "Silk Prayer Shawl (Saffron)", price: 1800, priceMax: 2800, image: prayerShawl, category: "Clothing", section: ["top-selling"], description: "Pure silk prayer shawl in auspicious saffron color. Lightweight and soft, perfect for meditation and temple visits.", type: "variable", variants: [{ label: "Standard (2m)", price: 1800 }, { label: "Large (2.5m)", price: 2200 }, { label: "Extra-Large (3m)", price: 2800 }], rating: 4.8, reviewCount: 30, relatedIds: ["angavastram", "meditation-scarf", "meditation-blanket"] },
  { id: "cotton-kurta", name: "Handloom Cotton Kurta (Off-White)", price: 1200, image: cottonKurta, category: "Clothing", section: ["top-selling"], description: "Classic handloom cotton kurta in off-white. Comfortable and breathable, ideal for daily pooja and spiritual gatherings.", type: "simple", rating: 4.6, reviewCount: 28, relatedIds: ["cotton-dhoti", "angavastram", "prayer-shawl"] },
  { id: "cotton-dhoti", name: "Pure Cotton Dhoti (2m)", price: 650, image: cottonDhoti, category: "Clothing", section: ["reordered"], description: "Traditional pure cotton dhoti in pristine white. Soft and comfortable for daily wear and ceremonial occasions.", type: "simple", rating: 4.5, reviewCount: 35, relatedIds: ["cotton-kurta", "angavastram", "cotton-lungi"] },
  { id: "angavastram", name: "Handwoven Cotton Angavastram", price: 550, image: angavastram, category: "Clothing", section: ["reordered"], description: "Traditional handwoven cotton angavastram (sacred cloth) in saffron. Worn over the shoulder during pooja and ceremonies.", type: "simple", rating: 4.4, reviewCount: 22, relatedIds: ["cotton-dhoti", "prayer-shawl", "cotton-kurta"] },
  { id: "meditation-blanket", name: "Handwoven Meditation Blanket", price: 1500, priceMax: 2500, image: meditationBlanket, category: "Clothing", section: ["just-for-you"], description: "Cozy handwoven cotton meditation blanket in earth tones. Keeps you warm and comfortable during long meditation sessions.", type: "variable", variants: [{ label: "Single (4x6 ft)", price: 1500 }, { label: "Double (6x8 ft)", price: 2500 }], rating: 4.7, reviewCount: 16, relatedIds: ["meditation-scarf", "meditation-cushion", "prayer-shawl"] },
  { id: "cushion-cover", name: "Mandala Embroidered Cushion Cover", price: 750, image: cushionCover, category: "Clothing", section: ["new-arrivals"], description: "Deep blue velvet cushion cover with hand-embroidered mandala pattern. Adds a spiritual touch to your meditation space.", type: "simple", rating: 4.3, reviewCount: 14, relatedIds: ["meditation-blanket", "meditation-cushion", "meditation-scarf"] },
  { id: "cotton-lungi", name: "Checked Cotton Lungi", price: 450, image: cottonLungi, category: "Clothing", section: ["reordered"], description: "Traditional checked cotton lungi in blue and white. Comfortable casual wear for daily use and temple visits.", type: "simple", rating: 4.4, reviewCount: 20, relatedIds: ["cotton-dhoti", "cotton-kurta", "angavastram"] },
  { id: "meditation-scarf", name: "Embroidered Meditation Scarf", price: 980, image: meditationScarf, category: "Clothing", section: ["new-arrivals"], description: "Elegant ivory cotton scarf with delicate floral embroidery. Perfect for meditation sessions and spiritual gatherings.", type: "simple", rating: 4.5, reviewCount: 12, relatedIds: ["prayer-shawl", "meditation-blanket", "angavastram"] },
  { id: "yoga-pants", name: "Natural Cotton Yoga Pants", price: 1100, image: yogaPants, category: "Clothing", section: ["top-selling"], description: "Loose-fit natural cotton yoga pants in cream. Breathable and comfortable for yoga practice and meditation.", type: "simple", rating: 4.6, reviewCount: 24, relatedIds: ["cotton-kurta", "yoga-mat", "yoga-bag"] },
  { id: "mala-bag", name: "Cotton Drawstring Mala Pouch", price: 350, image: malaBag, category: "Clothing", section: ["reordered"], description: "Handmade cotton drawstring pouch for storing your mala beads. Features a printed spiritual symbol and soft lining.", type: "simple", rating: 4.2, reviewCount: 18, relatedIds: ["rudraksha-mala", "tulsi-mala", "mala-counter"] },

  // ─── GUIDED MEDITATION & AFFIRMATIONS ───
  { id: "singing-bowl", name: "Tibetan Singing Bowl Set", price: 3500, priceMax: 5000, image: singingBowl, category: "Guided Meditation & Affirmations", section: ["just-for-you"], description: "Hand-hammered Tibetan singing bowl set with wooden mallet and cushion. Produces rich, resonant tones for deep meditation and sound healing.", type: "variable", variants: [{ label: "Small (4 inch)", price: 3500 }, { label: "Medium (6 inch)", price: 4200 }, { label: "Large (8 inch)", price: 5000 }], rating: 4.9, reviewCount: 40, relatedIds: ["tuning-fork-set", "meditation-cushion", "meditation-timer"] },
  { id: "fabric-speaker", name: "Portable Fabric Speaker", price: 4500, image: speaker, category: "Guided Meditation & Affirmations", section: ["recently-viewed"], description: "Compact fabric-wrapped Bluetooth speaker with rich sound. Perfect for playing mantras, guided meditations, and devotional music.", type: "simple", rating: 4.3, reviewCount: 15, relatedIds: ["singing-bowl", "meditation-timer", "affirmation-cards"] },
  { id: "meditation-cushion", name: "Velvet Zafu Meditation Cushion", price: 1800, image: meditationCushion, category: "Guided Meditation & Affirmations", section: ["top-selling"], description: "Premium velvet zafu meditation cushion filled with organic buckwheat hulls. Provides comfortable support for extended meditation sessions.", type: "simple", rating: 4.7, reviewCount: 34, relatedIds: ["meditation-blanket", "yoga-mat", "singing-bowl"] },
  { id: "yoga-mat", name: "Natural Cork Yoga Mat", price: 2200, image: yogaMat, category: "Guided Meditation & Affirmations", section: ["top-selling"], description: "Eco-friendly natural cork yoga mat with excellent grip. Antimicrobial surface perfect for yoga and meditation practice.", type: "simple", rating: 4.6, reviewCount: 28, relatedIds: ["yoga-bag", "yoga-pants", "meditation-cushion"] },
  { id: "affirmation-cards", name: "Spiritual Affirmation Card Deck (52 Cards)", price: 850, image: affirmationCards, category: "Guided Meditation & Affirmations", section: ["new-arrivals"], description: "Beautifully illustrated deck of 52 spiritual affirmation cards. Daily inspiration for mindfulness, gratitude, and positive thinking.", type: "simple", rating: 4.5, reviewCount: 22, relatedIds: ["meditation-journal", "coloring-book", "mantras-book"] },
  { id: "tuning-fork-set", name: "Sound Healing Tuning Fork Set", price: 2800, priceMax: 4200, image: tuningFork, category: "Guided Meditation & Affirmations", section: ["just-for-you"], description: "Professional-grade sound healing tuning fork set in velvet case. Tuned to specific frequencies for chakra balancing and relaxation.", type: "variable", variants: [{ label: "3-Fork Set", price: 2800 }, { label: "7-Fork Chakra Set", price: 4200 }], rating: 4.8, reviewCount: 18, relatedIds: ["singing-bowl", "crystal-pyramid", "chakra-book"] },
  { id: "mala-counter", name: "Rosewood Japa Mala Counter Board", price: 1200, image: malaCounter, category: "Guided Meditation & Affirmations", section: ["top-selling"], description: "Hand-carved rosewood mala counting board for tracking japa repetitions. An essential tool for disciplined mantra meditation practice.", type: "simple", rating: 4.6, reviewCount: 20, relatedIds: ["rudraksha-mala", "tulsi-mala", "mantras-book"] },
  { id: "meditation-timer", name: "Wooden Meditation Timer", price: 1600, image: meditationTimer, category: "Guided Meditation & Affirmations", section: ["recently-viewed"], description: "Analog wooden meditation timer with gentle chime. Set your desired meditation duration without digital distractions.", type: "simple", rating: 4.4, reviewCount: 12, relatedIds: ["singing-bowl", "meditation-cushion", "yoga-mat"] },
  { id: "yoga-bag", name: "Jute Yoga Mat Carry Bag", price: 680, image: yogaBag, category: "Guided Meditation & Affirmations", section: ["reordered"], description: "Eco-friendly jute tote bag designed to carry your yoga mat and essentials. Durable and stylish for studio or outdoor practice.", type: "simple", rating: 4.3, reviewCount: 16, relatedIds: ["yoga-mat", "yoga-pants", "meditation-cushion"] },
  { id: "wind-chimes-meditation", name: "Brass Energy Wind Chimes", price: 950, image: windChimes, category: "Guided Meditation & Affirmations", section: ["new-arrivals"], description: "Brass wind chimes tuned to create harmonious tones. Enhances meditation spaces with calming, ambient sound.", type: "simple", rating: 4.5, reviewCount: 14, relatedIds: ["singing-bowl", "wind-chimes", "tuning-fork-set"] },
];

export const categories = [
  "Shop by Category",
  "Pooja Essential",
  "Books",
  "Divine Accessories",
  "Clothing",
  "Guided Meditation & Affirmations",
  "All Categories",
];

export const categoryIcons: Record<string, string> = {
  "Pooja Essential": "🪔",
  "Books": "📚",
  "Divine Accessories": "🕉️",
  "Clothing": "👘",
  "Guided Meditation & Affirmations": "🧘",
};

export function getProductsBySection(section: string): Product[] {
  return products.filter((p) => p.section.includes(section));
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All Categories" || category === "Shop by Category") return products;
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  if (product.relatedIds && product.relatedIds.length > 0) {
    const related = product.relatedIds
      .map((id) => getProductById(id))
      .filter(Boolean) as Product[];
    return related.slice(0, limit);
  }
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
