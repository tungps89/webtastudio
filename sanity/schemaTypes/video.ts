import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'video',
    title: 'Video Tutorial',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube URL',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'tags',
            title: 'Tags (e.g. Cubase, Autotune)',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
