import Image from "next/image";
import { ArrowRight, Mic2, Music, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getBanners, getCategories, getVideos, getArticles, getPromotionalBanners } from '@/lib/sanity';
import HeroSlider from '@/components/HeroSlider';
import Sidebar from '@/components/Sidebar';

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const banners = await getBanners();
  const categories = await getCategories();
  const videos = await getVideos();
  const articles = await getArticles();
  const promoBanners = await getPromotionalBanners();

  return (
    <div className="flex flex-col gap-16 pb-20">

      {/* MAIN TOP SECTION: Sidebar + Hero Slider */}
      <section className="max-w-7xl mx-auto px-4 pt-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">

          {/* Left Sidebar (3 cols) - Hidden on mobile, visible on lg */}
          <div className="hidden lg:block lg:col-span-3 h-full">
            <Sidebar categories={categories} />
          </div>

          {/* Right Hero (9 cols) */}
          <div className="lg:col-span-9 h-full relative group">
            {/* The Slider Background */}
            {banners.length > 0 ? (
              <HeroSlider banners={banners} />
            ) : (
              <div className="w-full h-full bg-studio-panel rounded-2xl flex items-center justify-center border border-white/5">
                <p className="text-zinc-500">Chưa có Banner. Hãy thêm trong Admin.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Promotional Banners (QC) */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        {promoBanners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoBanners.map((banner: any) => (
              <div key={banner._id} className="relative rounded-xl overflow-hidden aspect-[3/1] md:aspect-[5/2] group border border-white/5 bg-zinc-900 shadow-lg">
                {banner.link ? (
                  <Link href={banner.link} className="block w-full h-full">
                    <img
                      src={banner.image}
                      alt={banner.title || 'Banner QC'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Link>
                ) : (
                  <img
                    src={banner.image}
                    alt={banner.title || 'Banner QC'}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Placeholder if no banners are added yet
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-studio-panel border border-white/5 h-40 flex items-center justify-center text-zinc-600">
                <p>Banner QC {i} (Chưa cập nhật)</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-studio-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Tại Sao Chọn TAstudio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-studio-panel rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Hỗ Trợ Kỹ Thuật 24/7</h3>
              <p className="text-zinc-400">Đội ngũ kỹ thuật viên am hiểu chuyên sâu về Cubase, Autotune sẵn sàng hỗ trợ bạn.</p>
            </div>
            <div className="p-6 bg-studio-panel rounded-xl">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Cài Đặt Phần Mềm Từ Xa</h3>
              <p className="text-zinc-400">Dịch vụ cài đặt Project hát live, mix nhạc chuyên nghiệp qua UltraViewer/TeamViewer.</p>
            </div>
            <div className="p-6 bg-studio-panel rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Bảo Hành Chính Hãng</h3>
              <p className="text-zinc-400">Cam kết hàng chính hãng 100%, bảo hành 1 đổi 1 nhanh chóng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products - Using Real Data */}
      <section className="bg-studio-panel py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white">Sản Phẩm Mới</h2>
            <Link href="/shop" className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium group">
              Xem tất cả <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.slice(0, 4).map((product: any) => (
                <ProductCard
                  key={product._id}
                  {...product}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-zinc-500 py-10">
                Đang cập nhật sản phẩm...
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Latest Videos Section */}
      <section className="bg-studio-dark py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white">Video & Hướng Dẫn</h2>
            <Link href="/videos" className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium group">
              Xem tất cả <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.length > 0 ? (
              videos.slice(0, 4).map((video: any) => {
                const getThumbnail = (url: string) => {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                  const match = url.match(regExp);
                  const videoId = (match && match[2].length === 11) ? match[2] : null;
                  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
                };
                const thumbnail = getThumbnail(video.youtubeUrl);

                return (
                  <Link
                    key={video._id}
                    href={`/videos/${video.slug}`}
                    className="group bg-studio-panel border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 block"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video relative bg-black">
                      {thumbnail ? (
                        <img src={thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">No Thumb</div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <PlayCircle size={20} fill="white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 line-clamp-2 text-sm group-hover:text-primary transition-colors h-10">
                        {video.title}
                      </h3>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center text-zinc-500 py-10">
                Đang cập nhật video...
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Latest Articles Section */}
      <section className="bg-studio-dark py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white">Tin Tức & Blog</h2>
            <Link href="/blog" className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium group">
              Xem tất cả <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {articles.length > 0 ? (
              articles.slice(0, 4).map((article: any) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-800 border border-white/5">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image</div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="text-sm text-zinc-500 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                  </div>
                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-zinc-500 py-10">
                Chưa có bài viết nào...
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

