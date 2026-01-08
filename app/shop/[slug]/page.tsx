import { getProduct } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { ShoppingCart, Check, ShieldCheck, Truck, Phone, MapPin, Share2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 60;

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // Ensure images is an array
    const images = product.images || [];
    const mainImage = images[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-zinc-400 text-sm mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-primary">Trang chủ</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-primary">Cửa hàng</Link>
                <span>/</span>
                <span className="text-white font-medium">{product.title}</span>
            </div>

            {/* TOP SECTION: 3 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* COL 1: Images (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 aspect-square relative flex items-center justify-center">
                        {mainImage ? (
                            <img src={mainImage} alt={product.title} className="w-full h-full object-contain p-2" />
                        ) : (
                            <div className="text-zinc-400">No Image</div>
                        )}
                    </div>
                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-5 gap-2">
                        {images.map((img: string, idx: number) => (
                            <div key={idx} className={`bg-white rounded-md border ${idx === 0 ? 'border-primary' : 'border-zinc-700'} aspect-square cursor-pointer hover:border-primary overflow-hidden`}>
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* COL 2: Info (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{product.title}</h1>

                    <div className="space-y-2 text-sm text-zinc-400">
                        <p>Thương hiệu: <span className="text-white font-medium">TAstudio Select</span></p>
                        <p>Loại: <span className="text-primary font-medium">{product.category}</span></p>
                        <p>Tình trạng: <span className="text-green-500 font-bold">Còn hàng</span></p>
                    </div>

                    <div className="py-4 border-y border-white/10">
                        <span className="text-3xl md:text-4xl font-bold text-red-500">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <AddToCartButton product={{
                            _id: product._id,
                            title: product.title,
                            price: product.price,
                            image: mainImage,
                            slug: product.slug
                        }} />

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-bold transition-colors">
                                <MessageCircle size={20} /> Chat Zalo
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold transition-colors">
                                <MessageCircle size={20} /> Chat Messenger
                            </button>
                        </div>
                    </div>
                </div>

                {/* COL 3: Sidebar/Contact (3 cols) */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Contact Box */}
                    <div className="bg-white rounded-xl p-4 space-y-4 text-zinc-800 shadow-md">
                        <a href="tel:0965176286" className="block bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-bold transition-colors">
                            Nhấn gọi ngay hotline
                        </a>

                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3 items-start">
                                <Phone className="text-red-600 shrink-0" size={18} />
                                <div>
                                    <span className="font-bold block text-red-600">Hotline: 096.517.6286</span>
                                    <span className="text-zinc-500">(08:30 AM - 20:30 PM)</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <MapPin className="text-red-600 shrink-0" size={18} />
                                <div>
                                    <span className="font-bold block text-blue-600">Showroom Hà Nội:</span>
                                    <span className="text-zinc-600">Số 7 G4D Ngõ 12 Nguyên Hồng.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Box */}
                    <div className="bg-studio-panel border border-white/10 rounded-xl p-4 space-y-3">
                        <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <Truck size={18} className="text-primary" /> Giá đã bao gồm:
                        </h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Miễn phí vận chuyển</li>
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Cài đặt phần mềm từ xa</li>
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Bảo hành 12 tháng</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Description & Tech Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Description (9 cols) */}
                <div className="lg:col-span-9 bg-studio-panel p-6 md:p-8 rounded-xl border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-6 uppercase border-b-2 border-primary inline-block pb-1">Mô tả sản phẩm</h2>
                    <div className="text-zinc-300 leading-relaxed text-lg prose prose-invert prose-p:my-2 prose-h3:text-white prose-strong:text-white max-w-none">
                        {Array.isArray(product.description) ? (
                            <PortableText value={product.description} />
                        ) : (
                            <p>{product.description}</p>
                        )}
                    </div>
                </div>

                {/* Right: Technical Specs (3 cols) */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl p-4 text-zinc-800 sticky top-24">
                        <h3 className="text-lg font-bold text-black mb-4 uppercase border-b pb-2">Thông số kỹ thuật</h3>
                        {product.techSpecs && (
                            <div className="text-sm space-y-3">
                                {/* Attempting to parse text line by line for a pseudo-table look */}
                                {product.techSpecs.split('\n').map((line: string, idx: number) => {
                                    const [label, value] = line.split(':');
                                    return (
                                        <div key={idx} className={`${idx % 2 === 0 ? 'bg-zinc-50' : 'white'} p-2 rounded`}>
                                            <span className="font-semibold block text-zinc-700">{label}{value ? ':' : ''}</span>
                                            <span className="text-zinc-600">{value}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
