'use client';

import { useCart } from '@/store/useCart';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { createOrder } from '@/actions/createOrder';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        paymentMethod: 'cod' // or 'bank'
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen"></div>;

    if (items.length === 0 && !isSuccess) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
                <p>Giỏ hàng trống.</p>
                <Link href="/" className="text-primary hover:underline">Quay về trang chủ</Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="max-w-xl mx-auto px-4 py-20 text-center">
                <div className="bg-studio-panel border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="text-green-500 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Đặt Hàng Thành Công!</h1>
                    <p className="text-zinc-400 mb-8">
                        Cảm ơn bạn đã tin tưởng TAstudio. <br />
                        Chúng tôi sẽ liên hệ lại sớm nhất để xác nhận đơn hàng.
                    </p>
                    <Link href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-transform hover:scale-105">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const orderData = {
            ...formData,
            items: items.map(item => ({
                _type: 'object', // Important for sanity array of objects
                productName: item.title,
                quantity: item.quantity,
                price: item.price,
                slug: item.slug,
                image: item.image,
                _key: Math.random().toString(36).substring(7) // Random key for Sanity array
            })),
            totalAmount: total(),
        };

        const result = await createOrder(orderData);

        if (result.success) {
            clearCart();
            setIsSuccess(true);
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }

        setIsLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <Link href="/cart" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8">
                <ArrowLeft size={20} /> Quay lại giỏ hàng
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form */}
                <div className="lg:col-span-7">
                    <h2 className="text-2xl font-bold text-white mb-6 uppercase border-b border-white/10 pb-4">Thông tin đặt hàng</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-zinc-400 mb-2 font-medium">Họ và tên *</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-studio-panel border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Nguyễn Văn A"
                                value={formData.customerName}
                                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-400 mb-2 font-medium">Số điện thoại *</label>
                            <input
                                required
                                type="tel"
                                className="w-full bg-studio-panel border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="09xxxxxxx"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-400 mb-2 font-medium">Địa chỉ nhận hàng *</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full bg-studio-panel border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Số nhà, đường, phường/xã..."
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-400 mb-2 font-medium">Phương thức thanh toán</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-colors ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-white/10 bg-studio-panel hover:bg-white/5'}`}>
                                    <input type="radio" className="hidden" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })} />
                                    <span className="w-5 h-5 rounded-full border border-zinc-500 flex items-center justify-center">
                                        {formData.paymentMethod === 'cod' && <span className="w-3 h-3 rounded-full bg-primary" />}
                                    </span>
                                    <span className="text-white font-medium">Thanh toán khi nhận hàng (COD)</span>
                                </label>

                                <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-colors ${formData.paymentMethod === 'bank' ? 'border-primary bg-primary/10' : 'border-white/10 bg-studio-panel hover:bg-white/5'}`}>
                                    <input type="radio" className="hidden" name="payment" value="bank" checked={formData.paymentMethod === 'bank'} onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })} />
                                    <span className="w-5 h-5 rounded-full border border-zinc-500 flex items-center justify-center">
                                        {formData.paymentMethod === 'bank' && <span className="w-3 h-3 rounded-full bg-primary" />}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">Chuyển khoản ngân hàng</span>
                                        <span className="text-xs text-zinc-500">Quét mã QR</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {formData.paymentMethod === 'bank' && (
                            <div className="bg-white rounded-xl p-6 text-center text-zinc-800">
                                <p className="font-bold mb-2">Thông tin chuyển khoản</p>
                                <div className="w-48 h-48 bg-zinc-200 mx-auto flex items-center justify-center rounded-lg mb-2">
                                    <span className="text-sm text-zinc-500">[QR CODE HERE]</span>
                                </div>
                                <p className="text-sm">Vui lòng chuyển khoản với nội dung: <strong>Tên + SĐT</strong></p>
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg uppercase transition-all shadow-[0_4px_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                        </button>
                    </form>
                </div>

                {/* Confirm Items */}
                <div className="lg:col-span-5">
                    <div className="bg-studio-panel border border-white/10 rounded-xl p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">Đơn hàng của bạn</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map(item => (
                                <div key={item._id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-white rounded-md p-1 relative flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                        <span className="absolute -top-2 -right-2 bg-zinc-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        <div className="text-white font-medium line-clamp-2">{item.title}</div>
                                        <div className="text-zinc-400">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="my-6 border-t border-white/10 pt-4 space-y-2">
                            <div className="flex justify-between text-zinc-400">
                                <span>Tạm tính</span>
                                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total())}</span>
                            </div>
                            <div className="flex justify-between text-green-500">
                                <span>Vận chuyển</span>
                                <span>Miễn phí</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                            <span className="text-white font-bold">Tổng cộng</span>
                            <span className="text-2xl font-bold text-red-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total())}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
