import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
    title: string;
    price: number;
    category: string;
    image: string;
    slug: string;
}

export default function ProductCard({ title, price, category, image, slug }: ProductCardProps) {
    return (
        <div className="bg-studio-dark border border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col h-full">
            <Link href={`/shop/${slug}`} className="relative h-64 bg-zinc-800 overflow-hidden">
                {/* Placeholder for Image if not valid URL, or use next/image if valid */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 bg-white group-hover:scale-105 transition-transform duration-500">
                    {/* In real app, use <Image /> with Sanity URL. For demo, we might use text or simple img tag if external url */}
                    {image && image.startsWith('http') ? (
                        <img src={image} alt={title} className="w-full h-full object-contain p-2" />
                    ) : (
                        <span className="text-4xl font-bold opacity-20">IMG</span>
                    )}
                </div>

                <div className="absolute top-2 right-2 bg-studio-dark/80 backdrop-blur px-2 py-1 rounded text-xs font-medium text-white border border-white/10">
                    {category}
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/shop/${slug}`} className="hover:text-primary transition-colors">
                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                </Link>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">
                    Thiết bị chuyên nghiệp cho studio của bạn.
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-primary font-bold text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                    </span>
                    <button className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                        <ShoppingCart size={16} />
                        <span className="hidden sm:inline">Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
