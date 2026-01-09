import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO & Social',
    type: 'object',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Title used for search engines and browser tabs.',
            validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Description for search engines.',
            validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
        }),
        defineField({
            name: 'shareImage',
            title: 'Share Graphic',
            type: 'image',
            description: 'Image for Facebook/Twitter sharing (1200x630px recommended)',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'noIndex',
            title: 'Discourage Search Engines',
            type: 'boolean',
            description: 'Hide this page from search engines (noindex)',
            initialValue: false
        })
    ]
})
