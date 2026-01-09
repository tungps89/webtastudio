'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Mic2, Tv, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';

interface NavbarProps {
    logo?: string;
}

export default function Navbar({ logo }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const items = useCart((state) => state.items);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-studio-dark/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
                            {logo ? (
                                <img src={logo} alt="TAstudio Logo" className="h-10 w-auto object-contain" />
                            ) : (
                                <>TAstudio<span className="text-white">.live</span></>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/shop" className="hover:text-primary transition-colors flex items-center gap-1">
                                <Mic2 size={18} /> Shop
                            </Link>
                            <Link href="/videos" className="hover:text-primary transition-colors flex items-center gap-1">
                                <Tv size={18} /> Videos
                            </Link>
                            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
                                <BookOpen size={18} /> Blog - Tin Tức
                            </Link>
                        </div>
                    </div>

                    {/* Icons (Cart) */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                            <ShoppingCart size={20} />
                            {mounted && items.length > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-accent text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {items.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/studio" className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors">
                            Admin
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-studio-panel border-b border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 hover:text-primary">Shop</Link>
                        <Link href="/videos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 hover:text-primary">Videos</Link>
                        <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 hover:text-primary">Blog - Tin Tức</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
