import Link from "next/link";
import { getVideos } from "@/lib/sanity";
import { PlayCircle, Calendar } from "lucide-react";

export const revalidate = 60;

function getYouTubeThumbnail(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Video & Hướng Dẫn</h1>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Tổng hợp các video hướng dẫn cài đặt phần mềm, review thiết bị và chia sẻ kinh nghiệm thu âm, livestream.
                </p>
            </div>

            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video: any) => {
                        const thumbnail = getYouTubeThumbnail(video.youtubeUrl);
                        return (
                            <Link
                                key={video._id}
                                href={`/videos/${video.slug}`}
                                className="group bg-studio-panel border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:translate-y-[-4px]"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-video relative bg-black">
                                    {thumbnail ? (
                                        <img src={thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-600">No Thumb</div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                            <PlayCircle size={24} fill="white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                                        <Calendar size={14} />
                                        {new Date(video._createdAt).toLocaleDateString()}
                                    </div>
                                    <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {video.tags && video.tags.slice(0, 2).map((tag: string) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 text-zinc-500 bg-studio-panel rounded-xl border border-white/5">
                    Chưa có video nào. Vui lòng quay lại sau.
                </div>
            )}
        </div>
    );
}
