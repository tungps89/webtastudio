import { MetadataRoute } from 'next'
import { getProducts, getArticles, getVideos } from '@/lib/sanity'

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tastudio.live'

    // Fetch all data
    const products = await getProducts();
    const articles = await getArticles();
    const videos = await getVideos();

    // Static routes
    const routes = [
        '',
        '/shop',
        '/videos',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }))

    // Products
    const productRoutes = products.map((product: any) => ({
        url: `${baseUrl}/shop/${product.slug}`,
        lastModified: new Date(product._createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Articles
    const articleRoutes = articles.map((article: any) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.publishedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Videos
    const videoRoutes = videos.map((video: any) => ({
        url: `${baseUrl}/videos/${video.slug}`,
        lastModified: new Date(video._createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...productRoutes, ...articleRoutes, ...videoRoutes]
}
