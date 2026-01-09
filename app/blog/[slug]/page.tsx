import { getArticle } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ChevronLeft, User } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return {};

    return {
        title: article.seo?.metaTitle || `${article.title} | TAstudio`,
        description: article.seo?.metaDescription || article.title,
        openGraph: {
            images: [article.seo?.shareImage || article.image || ''],
        },
        robots: {
            index: !article.seo?.noIndex,
            follow: !article.seo?.noIndex,
        }
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Back Button */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Quay lại Blog
            </Link>

            <article>
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-zinc-400 mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Calendar size={14} className="text-primary" />
                            {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1.5 ">
                            <User size={14} /> Admin
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        {article.title}
                    </h1>

                    {article.image && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none text-zinc-300 prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-img:rounded-xl">
                    {Array.isArray(article.content) ? (
                        <PortableText value={article.content} />
                    ) : (
                        <p>Nội dung đang cập nhật...</p>
                    )}
                </div>
            </article>

        </div>
    );
}
