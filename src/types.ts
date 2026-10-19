export type Category = "Haunted Decorations" | "Costumes & Masks" | "Spooky Lighting" | "Halloween Accessories";
export interface Product { id: string; name: string; category: Category; price: number; original?: number; description: string; image: string; rating: number; reviews: number; badge?: string; stock: number; added: number; popularity: number }
export interface CartItem { product: Product; qty: number }
