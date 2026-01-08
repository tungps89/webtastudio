import ProductCard from '@/components/ProductCard';
import { Filter } from 'lucide-react';
import { getProducts } from '@/lib/sanity';

export const revalidate = 60;

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Cửa Hàng</h1>
                    <p className="text-zinc-400">Khám phá các thiết bị âm thanh chất lượng cao tốt nhất.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-studio-panel border border-white/5 rounded-lg text-white hover:bg-white/5 flex items-center gap-2">
                        <Filter size={18} /> Lọc sản phẩm
                    </button>
                    <select className="px-4 py-2 bg-studio-panel border border-white/5 rounded-lg text-white outline-none focus:border-primary">
                        <option>Mới nhất</option>
                        <option>Giá tăng dần</option>
                        <option>Giá giảm dần</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            {...product}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-zinc-500 py-20">
                        Chưa có sản phẩm nào. Hãy thêm trong Admin.
                    </div>
                )}
            </div>
        </div>
    );
}
