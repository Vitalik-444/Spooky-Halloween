import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { products } from "./data";
import { CartItem, Product } from "./types";
import { FREE_SHIP, SHIP } from "./data";

function useLS<T>(k: string, init: T) {
  const [v, s] = useState<T>(() => {
    try {
      const r = localStorage.getItem(k);
      return r ? JSON.parse(r) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  }, [k, v]);
  return [v, s] as const;
}

const COUPON_RATES: Record<string, number> = {
  COVEN15: 0.15,
  SPOOKY31: 0.20,
  SPOOKY20: 0.20,
  BLOODMOON: 0.15,
  PUMPKIN10: 0.10,
  FREESHIP: 0.0,
};

interface Store {
  items: CartItem[];
  count: number;
  favs: string[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon: string;
  setCoupon: (c: string) => boolean;
  add: (p: Product, q?: number) => void;
  setQty: (id: string, q: number) => void;
  toggleFav: (p: Product) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  toast: string;
}

const Ctx = createContext<Store>(null!);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLS<Record<string, number>>("sh-cart", {});
  const [favs, setFavs] = useLS<string[]>("sh-favs", []);
  const [coupon, setC] = useLS<string>("sh-coupon", "");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo(
    () =>
      Object.entries(cart).flatMap(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return product && qty > 0 ? [{ product, qty }] : [];
      }),
    [cart]
  );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);

  const rate = COUPON_RATES[coupon] ?? 0;
  const discount = rate > 0 ? subtotal * rate : 0;
  const isFreeShipCoupon = coupon === "FREESHIP";
  const shipping =
    subtotal === 0 || isFreeShipCoupon || subtotal - discount >= FREE_SHIP ? 0 : SHIP;
  const total = Math.max(0, subtotal - discount + shipping);

  const add = (p: Product, q = 1) => {
    setCart((c) => ({ ...c, [p.id]: Math.min(p.stock, (c[p.id] || 0) + q) }));
    setToast(`🎃 "${p.name}" cast into your Cauldron!`);
  };

  const setQty = (id: string, q: number) =>
    setCart((c) => {
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = q;
      return n;
    });

  const toggleFav = (p: Product) => {
    setFavs((f) =>
      f.includes(p.id) ? f.filter((x) => x !== p.id) : [...f, p.id]
    );
    setToast(
      favs.includes(p.id)
        ? `🕯️ "${p.name}" banished from your Shadows`
        : `🔮 "${p.name}" inscribed in your Book of Shadows`
    );
  };

  const setCoupon = (c: string) => {
    const clean = c.trim().toUpperCase();
    if (clean in COUPON_RATES) {
      setC(clean);
      return true;
    }
    return false;
  };

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        favs,
        subtotal,
        discount,
        shipping,
        total,
        coupon,
        setCoupon,
        add,
        setQty,
        toggleFav,
        open,
        setOpen,
        toast,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
