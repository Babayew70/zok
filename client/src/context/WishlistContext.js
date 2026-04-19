import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('zok_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('zok_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = useCallback((product) => {
        setWishlist(prev => {
            if (prev.find(p => p.id === product.id)) return prev;
            return [...prev, { id: product.id, name_ru: product.name_ru, name_tm: product.name_tm, name_en: product.name_en, price: product.price, image_url: product.image_url, color: product.color }];
        });
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlist(prev => prev.filter(p => p.id !== productId));
    }, []);

    const isInWishlist = useCallback((productId) => {
        return wishlist.some(p => p.id === productId);
    }, [wishlist]);

    const toggleWishlist = useCallback((product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    }, [isInWishlist, addToWishlist, removeFromWishlist]);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            wishlistCount: wishlist.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
