import { Category, Product } from "./types";

export const fallback = (t: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
      <defs>
        <radialGradient id='g' cx='50%' cy='50%' r='65%'>
          <stop offset='0%' stop-color='#261536'/>
          <stop offset='60%' stop-color='#110d18'/>
          <stop offset='100%' stop-color='#070509'/>
        </radialGradient>
        <filter id='glow'>
          <feGaussianBlur stdDeviation='8' result='coloredBlur'/>
          <feMerge>
            <feMergeNode in='coloredBlur'/>
            <feMergeNode in='SourceGraphic'/>
          </feMerge>
        </filter>
      </defs>
      <rect width='800' height='800' fill='url(#g)'/>
      <!-- Cobweb corner -->
      <path d='M0,0 L180,0 M0,0 L0,180 M0,0 L120,120 M50,0 Q40,40 0,50 M100,0 Q80,80 0,100 M150,0 Q120,120 0,150' stroke='rgba(255,117,24,0.2)' stroke-width='2' fill='none'/>
      <!-- Glowing Jack-o-Lantern Silhouette -->
      <circle cx='400' cy='360' r='140' fill='#ff7518' opacity='0.85' filter='url(#glow)'/>
      <circle cx='400' cy='360' r='138' fill='#ff5500'/>
      <!-- Carved eyes -->
      <polygon points='340,320 375,350 330,355' fill='#ffea00'/>
      <polygon points='460,320 425,350 470,355' fill='#ffea00'/>
      <polygon points='400,355 412,380 388,380' fill='#ffea00'/>
      <!-- Jagged Smile -->
      <path d='M330,395 Q400,450 470,395 Q440,435 400,420 Q360,435 330,395 Z' fill='#ffea00'/>
      <!-- Pumpkin Stem -->
      <path d='M390,225 C390,210 405,195 425,195 C420,210 415,225 405,230 Z' fill='#487a2a'/>
      <text x='400' y='570' fill='#f5eedb' font-family='Cinzel, serif' font-size='32' font-weight='bold' text-anchor='middle' letter-spacing='2'>${t.replace(
        /[<>&]/g,
        ""
      )}</text>
      <text x='400' y='610' fill='#a59fac' font-family='sans-serif' font-size='18' text-anchor='middle' letter-spacing='4'>SPOOKY COVEN RELIC</text>
    </svg>`
  );

export const categories: { name: Category; blurb: string; image: string; span: string }[] = [
  {
    name: "Haunted Decorations",
    blurb: "Carved pumpkins, weeping tombstones, phantom cobwebs & crypt relics",
    image: "/img/cat-decor.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Costumes & Masks",
    blurb: "Vampiric capes, midnight witch regalia & grotesque horror masks",
    image: "/img/cat-costumes.jpg",
    span: "md:col-span-1",
  },
  {
    name: "Spooky Lighting",
    blurb: "Jack-o'-lanterns, cursed wax candles & eerie cemetery lanterns",
    image: "/img/cat-lighting.jpg",
    span: "md:col-span-1",
  },
  {
    name: "Halloween Accessories",
    blurb: "Blood moon talismans, enchanted amulets & gothic curios",
    image: "/img/cat-accessories.jpg",
    span: "md:col-span-2",
  },
];

const p = (
  id: string,
  name: string,
  category: Category,
  price: number,
  description: string,
  rating: number,
  reviews: number,
  added: number,
  popularity: number,
  extra: Partial<Product> = {}
): Product => ({
  id,
  name,
  category,
  price,
  description,
  image: `/img/${id}.jpg`,
  rating,
  reviews,
  stock: 12,
  added,
  popularity,
  ...extra,
});

export const products: Product[] = [
  p(
    "cursed-pumpkin",
    "The Cursed Pumpkin",
    "Haunted Decorations",
    59,
    "An intricately carved decorative jack-o'-lantern with deep ridges, radiating a hollow, watchful amber grin from within.",
    4.9,
    214,
    9,
    98,
    { badge: "🎃 Coven Bestseller" }
  ),
  p(
    "manor-lantern",
    "Haunted Manor Lantern",
    "Spooky Lighting",
    48,
    "A wrought-iron gothic lantern with stained amber panes casting a warm, flickering candlelight across shadowy corridors.",
    4.7,
    133,
    8,
    81,
    { badge: "🕯️ Ghostly Glow" }
  ),
  p(
    "witch-hat",
    "Midnight Witch Hat",
    "Costumes & Masks",
    32,
    "A velvet pointed witch hat tailored with a dramatic curved brim, tarnished iron buckle, and enchanted crow plumage.",
    4.6,
    97,
    6,
    70,
    { original: 45, badge: "🧹 Witch Essential" }
  ),
  p(
    "phantom-skull",
    "Phantom Skull of the Crypt",
    "Haunted Decorations",
    44,
    "A life-sized resin skull aged with realistic antiqued bone patina, hairline fractures, and eerie hollow sockets.",
    4.8,
    120,
    10,
    88,
    { badge: "💀 New Arrival" }
  ),
  p(
    "mist-maker",
    "Graveyard Mist Cauldron",
    "Spooky Lighting",
    69,
    "A heavy ultrasonic mist diffuser that cascades a low-creeping ghostly fog across porches, altars, and party tabletops.",
    4.5,
    76,
    5,
    64,
    { badge: "🌫️ Atmospheric" }
  ),
  p(
    "hollow-mask",
    "The Hollow Phantom Mask",
    "Costumes & Masks",
    54,
    "A theatrical horror mask with sunken abyss eyes, weathered ceramic crackle finish, and dramatic silhouette.",
    4.7,
    158,
    7,
    90,
    { badge: "🔮 Limited Edition" }
  ),
  p(
    "raven-candles",
    "Raven's Curse Candle Set",
    "Spooky Lighting",
    36,
    "Three dripped black wax LED pillars with flickering warm embers, accompanied by intricate raven feather accents.",
    4.8,
    189,
    4,
    92,
    { badge: "🕯️ Bestseller" }
  ),
  p(
    "bat-set",
    "Shadow Bat Swarm Set",
    "Haunted Decorations",
    22,
    "Sixteen matte black 3D bat silhouettes in graduated wingspans, ready to swarm across walls, mirrors, and ceilings.",
    4.4,
    61,
    3,
    55,
    { original: 30 }
  ),
  p(
    "tombstone",
    "The Forgotten Tombstone",
    "Haunted Decorations",
    39,
    "A weathered cemetery monument with engraved epitaph, moss detailing, and lifelike crumbled stone edges.",
    4.6,
    84,
    2,
    60,
    { badge: "⚰️ Haunted Relic" }
  ),
  p(
    "blood-moon",
    "Blood Moon Talisman",
    "Halloween Accessories",
    28,
    "A dark pewter pendant clutching a faceted crimson ruby crescent that catches the pale candlelight.",
    4.9,
    142,
    11,
    85,
    { badge: "🩸 Coven Favorite" }
  ),
  p(
    "ghost-figure",
    "Spectral Ghost Figurine",
    "Halloween Accessories",
    41,
    "A translucent floating wraith sculpture with flowing gossamer shroud, illuminated from within by a cold phantasmal aura.",
    4.5,
    72,
    1,
    58,
    { badge: "👻 Spectral Light" }
  ),
  p(
    "pumpkin-king",
    "The Pumpkin King Sovereign",
    "Haunted Decorations",
    89,
    "An oversized centerpiece Jack-o'-lantern crowned in thorned vines, boasting hypnotic golden illumination and terrifying presence.",
    5.0,
    251,
    12,
    100,
    { badge: "👑 Masterpiece", original: 119 }
  ),
];

export const FREE_SHIP = 75;
export const SHIP = 6.95;
export const COUPON = "COVEN15";
export const RATE = 0.15;
