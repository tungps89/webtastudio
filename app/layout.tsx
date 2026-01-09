import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { getSettings } from '@/lib/sanity';

const inter = Inter({ subsets: ['latin'] });

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      template: `%s | ${settings?.title || "TAstudio"}`,
      default: settings?.title || "TAstudio - Thiết Bị Thu Âm Chính Hãng",
    },
    description: settings?.seo?.metaDescription || "Chuyên cung cấp thiết bị thu âm, livestream, cài đặt phần mềm Cubase, Autotune chuyên nghiệp.",
    openGraph: {
      images: [settings?.seo?.shareImage || ""],
    },
    robots: {
      index: !settings?.seo?.noIndex,
      follow: !settings?.seo?.noIndex,
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="vi">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar logo={settings?.logo} />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer socialLinks={settings?.socialLinks} />
      </body>
    </html>
  );
}
