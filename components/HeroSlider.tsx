"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Banner {
    _id: string;
    title: string;
    image: string;
    buttonText?: string;
    link?: string;
}

export default function HeroSlider({ banners }: { banners: Banner[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group">
            {banners.map((banner, index) => (
                <div
                    key={banner._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Image */}
                    <div className="absolute inset-0">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Content - Overlay Text from Banner (optional) */}
                    {/* We hide this if we are using the overlay in usage parent, BUT user asked for background. 
              Usually slider has its own text. I'll render the banner text here, but the Homepage text will overlay THIS component if needed.
              Actually, let's keep the banner's OWN text here as it's cleaner. 
          */}
                    {/* Center Overlay Text - Replaces static text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-primary text-sm font-medium mb-4 backdrop-blur-md animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            TAstudio Live
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl mb-6 animate-fade-in-up">
                            {banner.buttonText || banner.title}
                        </h2>

                        {banner.link && (
                            <Link
                                href={banner.link}
                                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
                            >
                                Xem Ngay <ArrowRight size={20} />
                            </Link>
                        )}
                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "bg-primary w-8" : "bg-white/50 w-2 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

