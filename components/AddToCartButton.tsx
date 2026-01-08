'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
    product: {
        _id: string;
        title: string;
        price: number;
        image: string;
        slug: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCart((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);
    const router = useRouter();

    const handleAddToCart = () => {
        addItem({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            slug: product.slug,
            quantity: 1
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addItem({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            slug: product.slug,
            quantity: 1
        });
        router.push('/cart');
    };

    return (
        <div className="space-y-3">
            <button
                onClick={handleBuyNow}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg uppercase transition-transform hover:scale-[1.01] active:scale-95 flex flex-col items-center justify-center shadow-lg shadow-red-900/20"
            >
                <span>Mua Ngay</span>
                <span className="text-xs font-normal normal-case opacity-90">Giao hàng tận nơi - Miễn phí vận chuyển</span>
            </button>

            <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 border ${isAdded ? 'bg-green-600 text-white border-green-600' : 'bg-studio-panel hover:bg-white/10 text-primary border-primary'}`}
            >
                <ShoppingCart size={20} />
                {isAdded ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
            </button>
        </div>
    );
}
