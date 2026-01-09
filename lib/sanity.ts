import { client } from "@/sanity/lib/client";

export async function getVideos() {
  return client.fetch(`
    *[_type == "video"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      description,
      tags,
      _createdAt
    }
  `);
}

export async function getVideo(slug: string) {
  return client.fetch(`
    *[_type == "video" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      description,
      tags,
      _createdAt
    }
  `, { slug });
}

export async function getArticles() {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      publishedAt,
      "excerpt": array::join(string::split((pt::text(content)), "")[0..150], "") + "..."
    }
  `);
}

export async function getArticle(slug: string) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      content,
      publishedAt,
      "seo": seo {
        ...,
        "shareImage": shareImage.asset->url
      }
    }
  `, { slug });
}

export async function getBanners() {
  return client.fetch(`
    *[_type == "banner" && isActive == true] {
      _id,
      title,
      "image": image.asset->url,
      buttonText,
      link
    }
  `);
}

export async function getSettings() {
  return client.fetch(`
    *[_type == "settings"][0] {
      title,
      "logo": logo.asset->url,
      "socialLinks": socialLinks[] {
        platform,
        url
      },
      "seo": seo {
        ...,
        "shareImage": shareImage.asset->url
      }
    }
  `);
}

export async function getPromotionalBanners() {
  return client.fetch(`
    *[_type == "bannerQC"] | order(order asc) {
      _id,
      title,
      "image": image.asset->url,
      link
    }
  `);
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }
  `);
}

export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      "title": name,
      "slug": slug.current,
      price,
      "category": category->title,
      "image": images[0].asset->url,
      "images": images[].asset->url
    }
  `);
}

export async function getProduct(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      "title": name,
      "slug": slug.current,
      price,
      "category": category->title,
      "images": images[].asset->url,
      description,
      techSpecs,
      "seo": seo {
        ...,
        "shareImage": shareImage.asset->url
      }
    }
  `, { slug });
}
