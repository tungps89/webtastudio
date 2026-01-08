import Link from "next/link";
import { getArticles } from "@/lib/sanity";
import { Calendar } from "lucide-react";

export const revalidate = 60;

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Tin Tức</h1>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                    Cập nhật những tin tức mới nhất về công nghệ âm thanh, hướng dẫn sử dụng và chia sẻ kinh nghiệm từ TAstudio.
                </p>
            </div>

            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article: any) => (
                        <Link
                            key={article._id}
                            href={`/blog/${article.slug}`}
                            className="group bg-studio-panel border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 flex flex-col"
                        >
                            <div className="aspect-[16/9] relative overflow-hidden bg-zinc-900">
                                {article.image ? (
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-medium">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
                                    <Calendar size={14} className="text-primary" />
                                    {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow">
                                    {article.excerpt}
                                </p>
                                <span className="text-primary text-sm font-semibold group-hover:underline decoration-primary/50 underline-offset-4">
                                    Đọc tiếp &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 text-zinc-500 bg-studio-panel rounded-2xl border border-white/5">
                    <p className="text-xl">Chưa có bài viết nào.</p>
                    <p className="mt-2 text-sm">Vui lòng quay lại sau.</p>
                </div>
            )}
        </div>
    );
}
