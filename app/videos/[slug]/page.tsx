import { getVideo } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 60;

// Helper to extract YouTube ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const video = await getVideo(slug);

    if (!video) return {};

    const videoId = video.youtubeUrl ? getYouTubeId(video.youtubeUrl) : null;
    const ogImage = video.seo?.shareImage || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

    return {
        title: video.seo?.metaTitle || `${video.title} | TAstudio`,
        description: video.seo?.metaDescription || video.description?.slice(0, 160),
        openGraph: {
            images: [ogImage],
        },
        robots: {
            index: !video.seo?.noIndex,
            follow: !video.seo?.noIndex,
        }
    }
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Fetch video data
    const video = await getVideo(slug);

    if (!video) {
        notFound();
    }

    const videoId = getYouTubeId(video.youtubeUrl);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/videos"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
            >
                <ChevronLeft size={20} /> Quay lại danh sách Videos
            </Link>

            {/* Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video mb-8">
                {videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-500">
                        Video không khả dụng
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{video.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                        <Calendar size={16} /> {new Date(video._createdAt).toLocaleDateString()}
                    </span>
                    {video.tags && video.tags.map((tag: string) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                            <Tag size={12} /> {tag}
                        </span>
                    ))}
                </div>

                <div className="prose prose-invert max-w-none text-zinc-300 pt-4 border-t border-white/10">
                    {video.description}
                </div>
            </div>
        </div>
    );
}
