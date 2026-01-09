import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'The main title of the website (e.g. TAstudio)'
        }),
        defineField({
            name: 'logo',
            title: 'Main Logo',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'seo',
            title: 'Default SEO',
            type: 'seo',
            description: 'Default SEO settings when specific pages do not have them.'
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' }
                    ]
                }
            ]
        })
    ]
})
