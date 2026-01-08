import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'banner',
    title: 'Home Banner',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Banner Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
        defineField({
            name: 'link',
            title: 'Link (e.g. /shop/microphone)',
            type: 'string',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
        }),
    ],
})
