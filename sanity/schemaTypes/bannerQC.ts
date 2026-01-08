import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'bannerQC',
    title: 'Promotional Banner (QC)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Link URL',
            type: 'string',
            description: 'Optional link when clicking the banner'
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0
        })
    ]
})
