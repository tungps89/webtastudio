'use client';

import Link from 'next/link';
import { useCart } from '@/store/useCart';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
    // Handling hydration mismatch by waiting for mount
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, updateQuantity, total } = useCart();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-[60vh] flex items-center justify-center text-white">Loading...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-white mb-4">Giỏ hàng trống</h1>
                <p className="text-zinc-400 mb-8">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                    Tiếp tục mua sắm <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                Giỏ hàng <span className="text-lg font-normal text-zinc-400">({items.length} sản phẩm)</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-4">
                    {items.map((item) => (
                        <div key={item._id} className="bg-studio-panel border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                            <div className="w-24 h-24 bg-white rounded-lg p-2 flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-grow">
                                <Link href={`/shop/${item.slug}`} className="text-lg font-bold text-white hover:text-primary transition-colors line-clamp-1">
                                    {item.title}
                                </Link>
                                <div className="text-red-500 font-bold mt-1">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1 text-white">
                                    <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))} className="p-1 hover:text-primary">
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-primary">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button onClick={() => removeItem(item._id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-xl p-6 text-zinc-800 sticky top-24 shadow-lg">
                        <h2 className="text-xl font-bold mb-6 border-b pb-4">Tổng đơn hàng</h2>

                        <div className="flex justify-between mb-4 text-zinc-600">
                            <span>Tạm tính:</span>
                            <span className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total())}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-green-600">
                            <span>Vận chuyển:</span>
                            <span className="font-bold">Miễn phí</span>
                        </div>

                        <div className="flex justify-between mb-8 text-2xl font-bold text-red-600 border-t pt-4 border-zinc-200">
                            <span>Tổng cộng:</span>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total())}</span>
                        </div>

                        <Link href="/checkout" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-lg font-bold text-lg uppercase transition-transform hover:scale-[1.02] shadow-lg">
                            Thanh Toán Ngay
                        </Link>

                        <Link href="/shop" className="block text-center mt-4 text-zinc-500 hover:text-black hover:underline">
                            Tiếp tục mua hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
