interface FooterProps {
    socialLinks?: { platform: string; url: string }[];
}

import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Footer({ socialLinks }: FooterProps) {
    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook': return <Facebook size={20} />;
            case 'youtube': return <Youtube size={20} />;
            case 'instagram': return <Instagram size={20} />;
            default: return <Globe size={20} />;
        }
    };

    return (
        <footer className="bg-studio-panel border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 inline-block">
                            TAstudio<span className="text-white">.live</span>
                        </Link>
                        <p className="text-zinc-400 text-sm mb-6">
                            Chuyên cung cấp thiết bị thu âm, livestream chính hãng và giải pháp phần mềm âm thanh chuyên nghiệp.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks && socialLinks.length > 0 ? (
                                socialLinks.map((link) => (
                                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary transition-colors">
                                        {getSocialIcon(link.platform)}
                                    </a>
                                ))
                            ) : (
                                <>
                                    <a href="#" className="text-zinc-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                                    <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors"><Youtube size={20} /></a>
                                    <a href="#" className="text-zinc-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Danh mục</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/shop/microphone" className="hover:text-primary">Micro thu âm</Link></li>
                            <li><Link href="/shop/soundcard" className="hover:text-primary">Sound Card</Link></li>
                            <li><Link href="/shop/software" className="hover:text-primary">Phần mềm (Cubase/Autotune)</Link></li>
                            <li><Link href="/tutorials" className="hover:text-primary">Hướng dẫn sử dụng</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><a href="#" className="hover:text-primary">Chính sách bảo hành</a></li>
                            <li><a href="#" className="hover:text-primary">Vận chuyển & Thanh toán</a></li>
                            <li><a href="#" className="hover:text-primary">Liên hệ hỗ trợ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-0.5" />
                                <span>Số 7 G4D Ngõ 12 Nguyên Hồng, Hà Nội</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />
                                <span>096.517.6286 (Zalo)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                <span>tastudio68@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} TAstudio.live. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
