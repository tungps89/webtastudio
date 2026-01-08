import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    _id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    slug: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i._id === item._id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...currentItems, item] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i._id !== id) });
            },
            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i._id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
)
