import Link from "next/link";
import { List, ChevronRight, Mic2, Music, AppWindow, Speaker, Headphones, Box, Cable, Settings } from "lucide-react";

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

// Map common keywords to icons (optional, for visual flair)
const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('micro')) return <Mic2 size={18} />;
    if (t.includes('sound')) return <Music size={18} />;
    if (t.includes('phần mềm') || t.includes('daw')) return <AppWindow size={18} />;
    if (t.includes('loa')) return <Speaker size={18} />;
    if (t.includes('tai nghe')) return <Headphones size={18} />;
    if (t.includes('box')) return <Box size={18} />;
    if (t.includes('phụ kiện')) return <Cable size={18} />;
    return <Settings size={18} />;
};

export default function Sidebar({ categories }: { categories: Category[] }) {
    return (
        <div className="bg-studio-panel border border-white/5 rounded-xl overflow-hidden h-full">
            <div className="bg-primary/10 p-4 border-b border-white/5 flex items-center gap-2">
                <List size={20} className="text-primary" />
                <h3 className="font-bold text-white uppercase text-sm">Danh Mục Sản Phẩm</h3>
            </div>
            <ul className="py-2">
                {categories.map((cat) => (
                    <li key={cat._id}>
                        <Link
                            href={`/shop?category=${cat.slug?.current}`}
                            className="flex items-center justify-between px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm border-b border-white/5 last:border-0 group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-zinc-500 group-hover:text-primary transition-colors">
                                    {getIcon(cat.title)}
                                </span>
                                {cat.title}
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </li>
                ))}
                {/* Placeholder Categories if list is short/empty (to match look) */}
                {categories.length === 0 && (
                    <>
                        {['Thiết bị thu âm', 'Lắp đặt phòng Livestream', 'Soundcard - Mixer', 'Microphone', 'Loa kiểm âm', 'Tai nghe', 'Phụ kiện chính hãng'].map((item, i) => (
                            <li key={i}>
                                <Link href="#" className="flex items-center justify-between px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm border-b border-white/5 last:border-0 group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-zinc-500 group-hover:text-primary transition-colors">
                                            <Settings size={18} />
                                        </span>
                                        {item}
                                    </div>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}
