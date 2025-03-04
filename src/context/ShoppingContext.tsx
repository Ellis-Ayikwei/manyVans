'use client';

import { createContext, useContext, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface ShoppingContextType {
    cart: CartItem[];
    wishlist: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === product.id);
            if (existingItem) {
                return currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    };

    const updateCartQuantity = (productId: string, quantity: number) => {
        setCart((currentCart) => currentCart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item)));
    };

    const toggleWishlist = (product: Product) => {
        setWishlist((currentWishlist) => {
            const isInWishlist = currentWishlist.some((item) => item.id === product.id);
            if (isInWishlist) {
                return currentWishlist.filter((item) => item.id !== product.id);
            }
            return [...currentWishlist, product];
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <ShoppingContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
}

export const useShopping = () => {
    const context = useContext(ShoppingContext);
    if (context === undefined) {
        throw new Error('useShopping must be used within a ShoppingProvider');
    }
    return context;
};
