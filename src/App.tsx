import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Minus, Plus, Search, Trash2, X, Sparkles, Flame, Ghost } from "lucide-react";
import { categories, fallback, FREE_SHIP, products } from "./data";
import { Product } from "./types";
import { useStore } from "./store";
import {
  JackOLanternIcon,
  CauldronIcon,
  CobwebCorner,
} from "./components/HalloweenDecor";

const usd = (n: number) => `$${n.toFixed(2)}`;

const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={className}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallback(alt);
    }}
  />
);

const Title = ({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) => (
  <div className="mb-10 text-center md:text-left relative">
    {eyebrow && (
      <p className="text-pump font-semibold text-xs tracking-[.35em] uppercase mb-2 flex items-center justify-center md:justify-start gap-2">
        <Flame size={14} className="text-pump" />
        {eyebrow}
        <Flame size={14} className="text-pump" />
      </p>
    )}
    <h2 className="font-gothic text-3xl md:text-5xl font-extrabold tracking-wide text-glow">
      {children}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-pump to-transparent mt-4 mx-auto md:mx-0 rounded-full" />
  </div>
);

const Badge = ({ n, k }: { n: number; k: string }) => (
  <>
    {n > 0 && (
      <span
        key={k + n}
        className="absolute -top-1.5 -right-1.5 bg-pump text-ink text-[10px] font-black rounded-full min-w-4 h-4 px-1.5 grid place-items-center shadow-[0_0_10px_#ff7518]"
      >
        {n}
      </span>
    )}
  </>
);

const PumpkinStars = ({ r, n }: { r: number; n: number }) => (
  <div className="flex items-center gap-1.5 text-xs text-ash">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((idx) => (
        <JackOLanternIcon
          key={idx}
          size={14}
          className={idx <= Math.round(r) ? "opacity-100" : "opacity-30 grayscale"}
        />
      ))}
    </div>
    <span className="font-bold text-pump">{r.toFixed(1)}</span>
    <span className="text-[11px] text-ash/80">({n} coven reviews)</span>
  </div>
);

function Navbar() {
  const { count, favs, setOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [sq, setSq] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const link =
    "text-xs tracking-[0.2em] uppercase font-bold text-cream/80 hover:text-pump hover:text-glow transition-all py-1";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    nav(`/shop?q=${encodeURIComponent(q)}`);
    setSq(false);
    setMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-pump/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 font-gothic font-black text-xl md:text-2xl tracking-wider group"
        >
          <div className="relative">
            <JackOLanternIcon size={32} className="group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="leading-tight flex items-center gap-1.5">
              <span>SPOOKY</span>
              <span className="text-pump text-glow">HALLOWEEN</span>
            </div>
            <span className="block text-[9px] tracking-[0.35em] text-ash/70 font-sans uppercase">
              Dark Coven & Curiosities
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex gap-8 items-center" aria-label="Main">
          <NavLink to="/" end className={link}>
            Haunt
          </NavLink>
          <NavLink to="/shop" className={link}>
            Relics & Shop
          </NavLink>
          <Link to="/" state={{ s: "categories", k: Math.random() }} className={link}>
            Collections
          </Link>
          <Link to="/" state={{ s: "about", k: Math.random() }} className={link}>
            Lore
          </Link>
        </nav>
        <div className="flex items-center gap-3 md:gap-4">
          <form onSubmit={submit} className="flex items-center relative">
            {sq && (
              <input
                autoFocus
                aria-label="Search relics"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search relics..."
                className="inp !py-1 !px-3 text-xs w-40"
              />
            )}
            <button
              type={sq ? "submit" : "button"}
              onClick={() => !sq && setSq(true)}
              aria-label="Search"
              className="p-2 text-cream hover:text-pump transition-colors"
            >
              <Search size={19} />
            </button>
          </form>
          <Link
            to="/favorites"
            aria-label="Book of Shadows (Favorites)"
            className="relative p-2 text-cream hover:text-pump transition-colors"
            title="Book of Shadows (Favorites)"
          >
            <Heart size={20} className={favs.length ? "fill-pump text-pump" : ""} />
            <Badge n={favs.length} k="f" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open Cauldron"
            title="Witch's Cauldron (Cart)"
            className="relative p-2 text-cream hover:text-pump transition-colors flex items-center gap-1.5 group"
          >
            <CauldronIcon size={22} className="group-hover:rotate-6 transition-transform text-pump" />
            <span className="hidden xl:inline text-xs font-bold uppercase tracking-wider text-ash group-hover:text-pump">
              Cauldron
            </span>
            <Badge n={count} k="c" />
          </button>
          <button
            className="lg:hidden p-2 text-cream hover:text-pump"
            aria-label="Menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-pump/20 bg-coal/98 px-6 py-6 space-y-4"
            onClick={() => setMenu(false)}
          >
            <Link to="/" className="block text-sm font-bold uppercase tracking-widest hover:text-pump">
              Haunt (Home)
            </Link>
            <Link to="/shop" className="block text-sm font-bold uppercase tracking-widest hover:text-pump">
              Relics (Shop)
            </Link>
            <Link
              to="/"
              state={{ s: "categories", k: Math.random() }}
              className="block text-sm font-bold uppercase tracking-widest hover:text-pump"
            >
              Collections
            </Link>
            <Link
              to="/"
              state={{ s: "about", k: Math.random() }}
              className="block text-sm font-bold uppercase tracking-widest hover:text-pump"
            >
              Lore & Story
            </Link>
            <Link to="/favorites" className="block text-sm font-bold uppercase tracking-widest text-pump">
              Book of Shadows ({favs.length})
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { favs, toggleFav, add } = useStore();
  const fav = favs.includes(p.id);

  return (
    <article
      className="gothic-card rounded-md overflow-hidden flex flex-col group border border-white/10 hover:border-pump/70"
    >
      <CobwebCorner position="top-right" />
      <div className="relative aspect-square overflow-hidden bg-ink/50">
        <Link to={`/product/${p.id}`} aria-label={`View ${p.name}`}>
          <Img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 group-hover:brightness-105"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-black/20 pointer-events-none" />

        {p.badge && (
          <span className="absolute top-3 left-3 bg-ink/90 border border-pump/60 text-pump text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded shadow-md backdrop-blur-md">
            {p.badge}
          </span>
        )}

        <button
          onClick={() => toggleFav(p)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-ink/80 hover:bg-pump/20 text-cream hover:text-pump transition-colors border border-white/10 backdrop-blur-md z-20"
        >
          <span className="block">
            <Heart size={16} className={fav ? "fill-pump text-pump" : ""} />
          </span>
        </button>
      </div>

      <div className="p-5 flex flex-col gap-2.5 flex-1 relative">
        <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-pump/80">{p.category}</p>
        <Link
          to={`/product/${p.id}`}
          className="font-gothic font-bold text-lg hover:text-pump hover:text-glow transition-colors line-clamp-1"
        >
          {p.name}
        </Link>
        <p className="text-xs text-ash line-clamp-2 leading-relaxed flex-1">{p.description}</p>
        <PumpkinStars r={p.rating} n={p.reviews} />

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-gothic text-[#f5eedb]">{usd(p.price)}</span>
            {p.original && <s className="text-xs text-ash/70">{usd(p.original)}</s>}
          </div>
          <button
            onClick={() => add(p)}
            className="btn btn-p !py-2 !px-3.5 text-[11px] flex items-center gap-1.5"
            title="Cast into Witch's Cauldron"
          >
            <CauldronIcon size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

const Grid = ({ list }: { list: Product[] }) => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {list.map((p) => (
      <ProductCard key={p.id} p={p} />
    ))}
  </div>
);

function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pump/15 border border-pump/40 text-pump text-xs tracking-[0.25em] font-bold uppercase mb-6">
            <Sparkles size={14} />
            <span>The Midnight Coven Aesthetic</span>
          </div>

          <h1 className="font-gothic font-black text-4xl sm:text-6xl xl:text-7xl leading-[1.08] text-glow">
            Summon The Magic Of <br />
            <span className="text-pump text-glow font-cinzel-dec">Halloween.</span>
          </h1>

          <p className="mt-6 text-ash text-base md:text-lg max-w-xl leading-relaxed">
            Welcome to the realm of dark fantasy, flickering candlelight, and gothic enchantments. Discover authentic
            carved jack-o'-lanterns, haunted cemetery relics, midnight witch attire, and handcrafted curiosities curated
            for the season of shadows.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 items-center">
            <button className="btn btn-p" onClick={() => nav("/shop")}>
              <Flame size={16} /> Enter Haunted Market
            </button>
            <button
              className="btn btn-o"
              onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
            >
              Browse Collections
            </button>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <p className="text-pump font-bold font-gothic text-xl">100%</p>
              <p className="text-[11px] text-ash tracking-wider uppercase mt-0.5">Atmospheric Relics</p>
            </div>
            <div>
              <p className="text-pump font-bold font-gothic text-xl">FREE</p>
              <p className="text-[11px] text-ash tracking-wider uppercase mt-0.5">Shipping over $75</p>
            </div>
            <div>
              <p className="text-pump font-bold font-gothic text-xl">SALEM</p>
              <p className="text-[11px] text-ash tracking-wider uppercase mt-0.5">Curated Craft</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-square max-w-lg mx-auto w-full">
          <div className="absolute inset-0 bg-pump/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -inset-4 bg-witch/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-pump/40 shadow-[0_0_50px_rgba(255,117,24,0.35)] gothic-card">
            <CobwebCorner position="top-left" />
            <CobwebCorner position="top-right" />
            <Img
              src="/img/hero.jpg"
              alt="Intricately carved Halloween Jack-o-lantern glowing in the dark forest"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-ink/80 backdrop-blur-md border border-pump/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-pump">Featured Relic</span>
                  <p className="font-gothic font-bold text-lg text-cream">The Masterpiece Jack-o'-Lantern</p>
                </div>
                <Link to="/product/cursed-pumpkin" className="btn btn-p !py-1.5 !px-3 text-xs">
                  Inspect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-5 py-20 relative">
      <Title eyebrow="The Haunted Grimoire">Explore Curated Chambers</Title>
      <div className="grid md:grid-cols-4 md:auto-rows-[270px] gap-6">
        {categories.map((c, i) => (
          <Link
            key={c.name}
            to={`/shop?cat=${encodeURIComponent(c.name)}`}
            className={`group relative overflow-hidden rounded-lg border border-pump/25 hover:border-pump min-h-64 transition-all duration-500 shadow-xl ${c.span}`}
          >
            <CobwebCorner position="top-right" />
            <Img
              src={c.image}
              alt={c.name}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                i % 2 ? "object-top" : "object-center"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070509] via-[#070509]/65 to-black/25 group-hover:via-[#070509]/50 transition-colors" />

            <div className="absolute bottom-0 p-6 z-10 w-full">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-pump">Collection</span>
              <h3 className="font-gothic font-black text-2xl md:text-3xl text-cream group-hover:text-pump group-hover:text-glow transition-colors mt-1">
                {c.name}
              </h3>
              <p className="text-xs text-ash/90 mt-2 max-w-md line-clamp-2 leading-relaxed">{c.blurb}</p>
              <div className="mt-3 flex items-center gap-1.5 text-pump text-xs tracking-widest uppercase font-bold transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span>Enter Chamber</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [e, setE] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  const sub = (ev: FormEvent) => {
    ev.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(e);
    setErr(!ok);
    setMsg(
      ok
        ? "🎃 The Coven welcomes you! Check your parchment for seasonal tales and secrets."
        : "Please whisper a valid email address into the night."
    );
  };

  return (
    <section className="border-y border-pump/20 bg-coal/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,117,24,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-5 py-20 text-center relative z-10">
        <span className="text-3xl mb-3 block">🕯️</span>
        <h2 className="font-gothic text-4xl md:text-5xl font-black text-glow">
          Join the <span className="text-pump">Midnight Coven.</span>
        </h2>
        <p className="text-ash mt-4 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          Receive secret full-moon discounts, dark aesthetic inspiration, and early access to limited edition Halloween
          props.
        </p>

        <form onSubmit={sub} noValidate className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            className="inp text-sm"
            type="email"
            aria-label="Email address"
            placeholder="witch@hauntedmanor.com"
            value={e}
            onChange={(x) => setE(x.target.value)}
            aria-invalid={err}
          />
          <button className="btn btn-p shrink-0">Inscribe</button>
        </form>
        <p role="status" className={`mt-4 text-xs font-semibold ${err ? "text-red-400" : "text-pump"}`}>
          {msg}
        </p>
      </div>
    </section>
  );
}

function Home() {
  const loc = useLocation();
  useEffect(() => {
    const s = (loc.state as { s?: string } | null)?.s;
    if (s) {
      setTimeout(() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [loc.key]);

  const feats = [
    {
      title: "Hand-Crafted Artistry",
      desc: "Each skull, lantern, and pumpkin prop is sculpted with authentic gothic character.",
      icon: "🎃",
    },
    {
      title: "Spellbound Shipping",
      desc: "Safe and insured courier delivery right to your crypt door. Free over $75.",
      icon: "🦇",
    },
    {
      title: "Dark Aesthetic Guaranteed",
      desc: "Curated specifically for moody Pinterest aesthetics, witch altars, and festive banquets.",
      icon: "🕯️",
    },
    {
      title: "Coven Protection",
      desc: "Hassle-free 30-night returns if your ghost decides not to haunt.",
      icon: "🔮",
    },
  ];

  return (
    <>
      <Hero />
      <Categories />
      <section className="max-w-7xl mx-auto px-5 pb-24 relative">
        <Title eyebrow="Curated Vault">The Haunted Bestiary</Title>
        <p className="text-ash -mt-6 mb-10 max-w-xl">
          Strange treasures, cursed artifacts, and flickering lanterns chosen by our coven for this season.
        </p>
        <Grid list={[...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8)} />
        <div className="text-center mt-14">
          <Link to="/shop" className="btn btn-o !px-8">
            View All 12 Haunted Relics →
          </Link>
        </div>
      </section>
      <section className="relative overflow-hidden py-28 text-center border-y border-pump/20 bg-gradient-to-b from-ink via-coal to-ink">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,117,24,0.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <span className="text-pump text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            A SPOOKY NIGHT TO REMEMBER
          </span>
          <h2 className="font-gothic font-black text-4xl sm:text-6xl md:text-7xl text-glow leading-tight">
            The Night Belongs To <br />
            <span className="text-pump font-cinzel-dec">Those Who Dare.</span>
          </h2>
          <p className="text-ash mt-5 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Light the black candles, carve your fierce pumpkin grin, and prepare your manor for unforgettable memories.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/shop" className="btn btn-p glow">
              Shop Halloween Essentials
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="max-w-7xl mx-auto px-5 py-24">
        <Title eyebrow="Coven Heritage">Why Seek Relics Here?</Title>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feats.map((f) => (
            <div
              key={f.title}
              className="gothic-card p-6 rounded border-t-2 border-pump relative hover:border-pump transition-colors"
            >
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-gothic font-bold text-lg text-cream">{f.title}</h3>
              <p className="text-ash text-xs mt-2.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="newsletter">
        <Newsletter />
      </div>
    </>
  );
}

function Shop() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const cat = sp.get("cat") || "";
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    const l = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) &&
        (!cat || p.category === cat) &&
        (!min || p.price >= +min) &&
        (!max || p.price <= +max)
    );
    const s: Record<string, (a: Product, b: Product) => number> = {
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      new: (a, b) => b.added - a.added,
      popular: (a, b) => b.popularity - a.popularity,
    };
    return l.sort(s[sort]);
  }, [q, cat, min, max, sort]);

  const upd = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    v ? n.set(k, v) : n.delete(k);
    setSp(n);
  };

  const clear = () => {
    setSp({});
    setMin("");
    setMax("");
    setSort("popular");
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-14">
      <Title eyebrow="Sanctum Market">The Haunted Vault</Title>
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="gothic-card p-6 rounded-md space-y-6 lg:sticky lg:top-28 self-start border border-pump/20">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="font-gothic font-bold text-lg text-cream flex items-center gap-2">
              <Sparkles size={16} className="text-pump" />
              Filter Relics
            </h3>
            {(q || cat || min || max) && (
              <button onClick={clear} className="text-xs text-pump hover:underline">
                Reset
              </button>
            )}
          </div>

          <label className="block text-xs tracking-widest uppercase font-bold text-ash">
            Search
            <input
              className="inp mt-2 normal-case tracking-normal"
              value={q}
              onChange={(e) => upd("q", e.target.value)}
              placeholder="e.g. Pumpkin, Skull, Lantern"
            />
          </label>

          <label className="block text-xs tracking-widest uppercase font-bold text-ash">
            Category
            <select
              className="inp mt-2 cursor-pointer"
              value={cat}
              onChange={(e) => upd("cat", e.target.value)}
            >
              <option value="">All Sacred Chambers</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="block text-xs tracking-widest uppercase font-bold text-ash mb-2">Price Range ($)</span>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={0}
                placeholder="Min"
                className="inp"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
              <input
                type="number"
                min={0}
                placeholder="Max"
                className="inp"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>

          <label className="block text-xs tracking-widest uppercase font-bold text-ash">
            Sort Order
            <select
              className="inp mt-2 cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Most Coveted (Popularity)</option>
              <option value="new">Newest Inscribed</option>
              <option value="low">Tribute: Low to High</option>
              <option value="high">Tribute: High to Low</option>
            </select>
          </label>

          <button onClick={clear} className="btn btn-o w-full !py-2 text-xs">
            Clear All Filters
          </button>
        </aside>
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10 text-xs text-ash">
            <span aria-live="polite">
              Revealing <strong className="text-pump">{list.length}</strong> {list.length === 1 ? "relic" : "relics"}
            </span>
            {cat && <span className="bg-pump/15 text-pump px-2 py-0.5 rounded border border-pump/30">{cat}</span>}
          </div>

          {list.length ? (
            <Grid list={list} />
          ) : (
            <div className="gothic-card p-16 text-center rounded-md border border-pump/30">
              <Ghost className="mx-auto text-pump mb-4" size={40} />
              <p className="font-gothic text-2xl font-bold text-cream">Nothing lurks here.</p>
              <p className="text-ash mt-2 text-sm">No cursed relics match your arcane query.</p>
              <button onClick={clear} className="btn btn-p mt-6">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductPage() {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);
  const { add, toggleFav, favs } = useStore();
  const [qty, setQty] = useState(1);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setQty(1);
    setPos(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!p) {
    return (
      <div className="max-w-3xl mx-auto py-32 text-center">
        <Ghost size={48} className="mx-auto text-pump mb-4" />
        <p className="font-gothic text-3xl font-bold">This relic has vanished into the mist.</p>
        <Link to="/shop" className="btn btn-p mt-6">
          Return to the Vault
        </Link>
      </div>
    );
  }

  const crops = ["object-center", "object-left-top", "object-right-bottom"];
  const fav = favs.includes(p.id);

  return (
    <section className="max-w-7xl mx-auto px-5 py-14">
      <nav className="text-xs text-ash mb-8 flex items-center gap-2" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-pump">
          Vault
        </Link>
        <span>/</span>
        <span className="text-pump">{p.category}</span>
        <span>/</span>
        <span className="text-cream truncate">{p.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border-2 border-pump/40 gothic-card relative group">
            <CobwebCorner position="top-left" />
            <Img
              src={p.image}
              alt={p.name}
              className={`w-full h-full object-cover transition-all duration-700 ${pos ? "scale-125" : ""} ${
                crops[pos]
              }`}
            />
            {p.badge && (
              <span className="absolute top-4 left-4 bg-ink/90 border border-pump text-pump text-xs tracking-widest uppercase font-bold px-3 py-1 rounded">
                {p.badge}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {crops.map((c, i) => (
              <button
                key={i}
                onClick={() => setPos(i)}
                aria-label={`View angle ${i + 1}`}
                className={`w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                  pos === i ? "border-pump shadow-[0_0_15px_rgba(255,117,24,0.5)]" : "border-white/10 opacity-70"
                }`}
              >
                <Img src={p.image} alt="" className={`w-full h-full object-cover ${i ? "scale-125" : ""} ${c}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="gothic-card p-8 rounded-lg border border-pump/30">
          <p className="text-pump text-xs tracking-[0.25em] font-bold uppercase">{p.category}</p>
          <h1 className="font-gothic font-black text-3xl sm:text-4xl mt-2 text-glow">{p.name}</h1>

          <div className="mt-4">
            <PumpkinStars r={p.rating} n={p.reviews} />
          </div>

          <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-white/10">
            <span className="text-3xl sm:text-4xl font-bold font-gothic text-pump text-glow">{usd(p.price)}</span>
            {p.original && <s className="text-base text-ash">{usd(p.original)}</s>}
          </div>

          <p className="text-ash mt-6 text-sm sm:text-base leading-relaxed">{p.description}</p>
          <div className="my-6 p-4 rounded bg-ink/60 border border-white/10 space-y-2 text-xs text-ash">
            <div className="flex justify-between">
              <span>Sanctum Stock:</span>
              <span className="text-green-400 font-bold">{p.stock} available in crypt</span>
            </div>
            <div className="flex justify-between">
              <span>Aura:</span>
              <span className="text-pump">Nocturnal, Haunted & Warm</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span className="text-cream">Dispatched within 24 hours</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="flex items-center border border-pump/40 rounded bg-ink/80">
              <button
                className="p-3 text-cream hover:text-pump"
                aria-label="Decrease quantity"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center font-bold" aria-live="polite">
                {qty}
              </span>
              <button
                className="p-3 text-cream hover:text-pump"
                aria-label="Increase quantity"
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
              >
                <Plus size={15} />
              </button>
            </div>

            <button className="btn btn-p flex-1" onClick={() => add(p, qty)}>
              <CauldronIcon size={18} />
              <span>Cast into Cauldron</span>
            </button>

            <button
              className="btn btn-o"
              aria-pressed={fav}
              aria-label="Toggle favorite"
              onClick={() => toggleFav(p)}
              title="Save to Book of Shadows"
            >
              <Heart size={18} className={fav ? "fill-pump text-pump" : ""} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Title eyebrow="Keep Exploring">Related Relics From The Shadows</Title>
        <Grid
          list={products
            .filter((x) => x.category === p.category && x.id !== p.id)
            .concat(products.filter((x) => x.category !== p.category))
            .slice(0, 4)}
        />
      </div>
    </section>
  );
}

function CartBody({ onGo }: { onGo?: () => void }) {
  const { items, setQty, subtotal, discount, shipping, total, coupon, setCoupon } = useStore();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  if (!items.length) {
    return (
      <div className="text-center py-16">
        <CauldronIcon size={48} className="mx-auto text-pump mb-4" />
        <p className="font-gothic text-2xl font-bold">Your Cauldron is Empty.</p>
        <p className="text-ash text-xs mt-2">No ingredients or cursed relics have been added yet.</p>
        <Link onClick={onGo} to="/shop" className="btn btn-p mt-6">
          Gather Relics
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-white/10 max-h-[420px] overflow-y-auto pr-2">
        {items.map(({ product: p, qty }) => (
          <li key={p.id} className="flex gap-4 py-4 items-center">
            <Img src={p.image} alt={p.name} className="w-16 h-16 rounded object-cover border border-pump/30" />
            <div className="flex-1">
              <p className="font-gothic font-bold text-sm text-cream">{p.name}</p>
              <p className="text-xs text-ash">{usd(p.price)} each</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  aria-label="Decrease"
                  onClick={() => setQty(p.id, qty - 1)}
                  className="border border-white/20 hover:border-pump p-1 rounded"
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-xs font-bold">{qty}</span>
                <button
                  aria-label="Increase"
                  onClick={() => setQty(p.id, Math.min(p.stock, qty + 1))}
                  className="border border-white/20 hover:border-pump p-1 rounded"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-pump">{usd(p.price * qty)}</p>
              <button
                aria-label={`Remove ${p.name}`}
                onClick={() => setQty(p.id, 0)}
                className="text-ash hover:text-red-400 mt-2 p-1"
                title="Banish relic"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form
        className="flex gap-2 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          const ok = setCoupon(code);
          setMsg(
            ok
              ? `✨ Spell accepted! Discount applied for '${code.toUpperCase()}'.`
              : "Invalid spell incantation. Try COVEN15 or SPOOKY31."
          );
        }}
      >
        <input
          className="inp text-xs uppercase font-mono"
          aria-label="Discount code"
          placeholder="Spell code: e.g. COVEN15"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn-o !py-2 text-xs shrink-0">Inscribe</button>
      </form>
      <p className="text-[11px] mt-1.5 font-semibold text-pump" role="status">
        {msg || (coupon ? `Active Spell: ${coupon}` : "Have a code? Enter it above.")}
      </p>
      <dl className="mt-5 space-y-2 text-xs border-t border-white/10 pt-4">
        <div className="flex justify-between">
          <dt className="text-ash">Subtotal</dt>
          <dd className="font-bold">{usd(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-pump">
            <dt>Coven Discount ({coupon})</dt>
            <dd>-{usd(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-ash">Courier Shipping (Free over ${FREE_SHIP})</dt>
          <dd className="font-bold">{shipping ? usd(shipping) : "Free"}</dd>
        </div>
        <div className="flex justify-between text-base font-bold font-gothic border-t border-white/10 pt-3 text-cream">
          <dt>Sacred Total</dt>
          <dd className="text-pump text-glow">{usd(total)}</dd>
        </div>
      </dl>

      <Link to="/checkout" onClick={onGo} className="btn btn-p w-full mt-6 !py-3 text-center">
        Complete Dark Ritual & Checkout
      </Link>
    </div>
  );
}

function CartDrawer() {
  const { open, setOpen } = useStore();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Witch's Cauldron"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-coal/98 z-50 p-6 overflow-y-auto border-l-2 border-pump/40 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/10">
              <h2 className="font-gothic text-2xl font-bold flex items-center gap-2 text-glow">
                <CauldronIcon size={24} className="text-pump" />
                Witch's Cauldron
              </h2>
              <button
                aria-label="Close cart"
                onClick={() => setOpen(false)}
                className="text-ash hover:text-pump p-1"
              >
                <X size={20} />
              </button>
            </div>
            <CartBody onGo={() => setOpen(false)} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Favorites() {
  const { favs, toggleFav, add } = useStore();
  const list = products.filter((p) => favs.includes(p.id));

  return (
    <section className="max-w-7xl mx-auto px-5 py-14">
      <Title eyebrow="Sacred Inscriptions">The Book of Shadows</Title>
      {!list.length ? (
        <div className="gothic-card p-16 text-center rounded-lg border border-pump/30">
          <Heart className="mx-auto text-pump mb-4" size={36} />
          <p className="font-gothic text-2xl font-bold">No relics inscribed yet.</p>
          <p className="text-ash text-sm mt-2">
            Your Book of Shadows is blank. Wander the vault and mark relics you desire.
          </p>
          <Link to="/shop" className="btn btn-p mt-6">
            Explore the Collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div key={p.id} className="gothic-card rounded-md overflow-hidden border border-white/10">
              <Link to={`/product/${p.id}`}>
                <Img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
              </Link>
              <div className="p-5">
                <p className="font-gothic font-bold text-lg text-cream">{p.name}</p>
                <p className="text-pump font-bold mt-1">{usd(p.price)}</p>
                <div className="flex gap-3 mt-4">
                  <button className="btn btn-p flex-1 !px-3 text-xs" onClick={() => add(p)}>
                    Cast to Cauldron
                  </button>
                  <button
                    className="btn btn-o !px-3"
                    aria-label={`Remove ${p.name}`}
                    onClick={() => toggleFav(p)}
                    title="Banish from Shadows"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CartPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-14">
      <Title eyebrow="Review Ingredients">Witch's Cauldron</Title>
      <div className="gothic-card p-8 rounded-lg border border-pump/30">
        <CartBody />
      </div>
    </section>
  );
}

function Checkout() {
  const { items, subtotal, discount, shipping, total } = useStore();
  const [f, setF] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    (Object.keys(f) as (keyof typeof f)[]).forEach((k) => {
      if (!f[k].trim()) er[k] = "This arcane field is required.";
    });
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid mortal or coven email.";
    setErrs(er);
    setSent(!Object.keys(er).length);
  };

  const fields: [keyof typeof f, string][] = [
    ["name", "Mortal / Coven Full Name"],
    ["email", "Email Address (Parchment Destination)"],
    ["address", "Crypt or Manor Street Address"],
    ["city", "Realm / City"],
    ["zip", "Postal Code / Ward"],
    ["country", "Country"],
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 py-14">
      <Title eyebrow="Sacred Pact">Complete The Summoning</Title>
      <div className="grid md:grid-cols-[1fr_380px] gap-12">
        <form onSubmit={submit} noValidate className="gothic-card p-8 rounded-lg border border-pump/30 space-y-4">
          <div className="border border-pump/60 bg-pump/10 p-4 rounded text-xs text-[#f5eedb] leading-relaxed flex items-center gap-3">
            <span className="text-xl">🕯️</span>
            <span>
              <strong>Demo Store Notice:</strong> Payment gateway and actual parcel dispatch are simulated for this
              showcase. No real gold will be charged!
            </span>
          </div>

          {fields.map(([k, l]) => (
            <label key={k} className="block text-xs uppercase font-bold tracking-wider text-ash">
              {l}
              <input
                className="inp mt-1 normal-case tracking-normal text-sm"
                value={f[k]}
                aria-invalid={!!errs[k]}
                onChange={(e) => setF({ ...f, [k]: e.target.value })}
              />
              {errs[k] && <span className="text-red-400 text-xs mt-1 block">{errs[k]}</span>}
            </label>
          ))}

          <button className="btn btn-p w-full !py-3 mt-4" disabled={!items.length}>
            Seal Details & Finalize
          </button>
          {sent && (
            <p role="status" className="text-xs text-pump font-bold text-center mt-3">
              ✨ The Coven has received your inscription! Ritual completed successfully in demo mode.
            </p>
          )}
        </form>

        <aside className="gothic-card p-6 rounded-lg border border-pump/30 h-fit space-y-4">
          <h2 className="font-gothic text-xl font-bold pb-3 border-b border-white/10 text-glow">Cauldron Manifest</h2>
          {items.map(({ product: p, qty }) => (
            <div key={p.id} className="flex justify-between text-xs py-1.5 border-b border-white/5">
              <span className="text-ash truncate max-w-[200px]">
                {p.name} × {qty}
              </span>
              <span className="font-semibold text-cream">{usd(p.price * qty)}</span>
            </div>
          ))}

          <div className="border-t border-white/10 pt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-ash">
              <span>Subtotal</span>
              <span>{usd(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-pump">
                <span>Coven Discount</span>
                <span>-{usd(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ash">
              <span>Delivery Tribute</span>
              <span>{shipping ? usd(shipping) : "Free"}</span>
            </div>
            <div className="flex justify-between font-bold font-gothic text-base pt-3 border-t border-white/10 text-cream">
              <span>Grand Total</span>
              <span className="text-pump text-glow">{usd(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Info() {
  const { slug } = useParams();
  return (
    <section className="max-w-2xl mx-auto px-5 py-24 text-center">
      <Ghost size={44} className="mx-auto text-pump mb-4" />
      <h1 className="font-gothic text-4xl font-bold capitalize text-glow">{slug?.replace("-", " ")}</h1>
      <p className="text-ash mt-4 text-sm leading-relaxed">
        This is an enchanted demonstration chamber. In the full coven release, authentic policy manuscripts and tales for{" "}
        {slug?.replace("-", " ")} will reside here.
      </p>
      <Link to="/" className="btn btn-p mt-8">
        Return to the Haunt
      </Link>
    </section>
  );
}

function Footer() {
  const l = "hover:text-pump hover:text-glow text-ash text-xs tracking-wider transition-colors";
  return (
    <footer className="bg-coal/95 border-t border-pump/20 relative">
      <div className="max-w-7xl mx-auto px-5 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-gothic font-black text-xl flex items-center gap-2">
            <JackOLanternIcon size={24}  />
            Spooky <span className="text-pump text-glow">Halloween</span>
          </p>
          <p className="text-ash text-xs leading-relaxed">
            Curated gothic decorations, artisan carved pumpkins, haunting lighting, and enchanted accessories for a
            memorable All Hallows' Eve.
          </p>
          <div className="pt-2">
            <span className="text-[10px] tracking-widest uppercase font-bold text-pump block mb-2">
              Atmosphere: All Hallows 1692
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-xs tracking-[0.25em] uppercase font-bold text-pump mb-1">Curated Chambers</p>
          {categories.map((c) => (
            <Link key={c.name} className={l} to={`/shop?cat=${encodeURIComponent(c.name)}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-xs tracking-[0.25em] uppercase font-bold text-pump mb-1">Coven Guidance</p>
          <Link className={l} to="/info/contact">
            Whisper to Us (Contact)
          </Link>
          <Link className={l} to="/info/shipping-info">
            Phantom Courier Delivery
          </Link>
          <Link className={l} to="/info/returns">
            30-Night Return Spells
          </Link>
          <Link className={l} to="/" state={{ s: "newsletter", k: 1 }}>
            Midnight Newsletter
          </Link>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase font-bold text-pump mb-3">Pinterest & Visions</p>
          <p className="text-xs text-ash mb-4">Follow our gothic moodboards, pin collections, and pumpkin carvings.</p>
          <div className="flex gap-3">
            {[
              { name: "Pinterest", symbol: "P" },
              { name: "Instagram", symbol: "IG" },
              { name: "TikTok", symbol: "TT" },
            ].map((s) => (
              <Link
                key={s.name}
                to="/info/social-media"
                aria-label={s.name}
                className="border border-pump/40 w-10 h-10 rounded flex items-center justify-center text-xs font-bold text-cream hover:bg-pump hover:text-ink hover:border-pump transition-all shadow-md"
              >
                {s.symbol}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 px-5 text-xs text-ash flex flex-wrap justify-between max-w-7xl mx-auto gap-4">
        <span>© 2026 Spooky Halloween. Handcrafted for souls of the dark night.</span>
        <div className="flex gap-6">
          <Link className="hover:text-pump" to="/info/privacy-policy">
            Parchment Privacy
          </Link>
          <Link className="hover:text-pump" to="/info/terms">
            Coven Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Toast() {
  const { toast } = useStore();
  return (
    <div aria-live="polite" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-coal/95 border-2 border-pump px-6 py-3.5 text-sm font-semibold rounded-lg shadow-[0_0_30px_rgba(255,117,24,0.5)] backdrop-blur-md text-cream"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen text-[#f5eedb] bg-[#070509]">
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity filter contrast-125"
        style={{ backgroundImage: "url('/img/bg-haunted.jpg')" }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 mist-overlay" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <Toast />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/info/:slug" element={<Info />} />
            <Route path="*" element={<Info />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
