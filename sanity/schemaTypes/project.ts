import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: '作品集 (Project)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '專案標題',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: '專案截圖',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: '精選專案',
      type: 'boolean',
      initialValue: false, // 預設為非精選
    }),
    defineField({
      name: 'description',
      title: '專案簡介 (短)',
      type: 'text',
    }),
    defineField({
      name: 'longDescription',
      title: '專案詳述 (長)',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: '專案類別',
      type: 'string',
    }),
    defineField({
      name: 'galleryImages',
      title: '專案圖片集',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'techStack',
      title: '技術棧 (Tech Stack)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'liveUrl',
      title: '線上預覽連結 (Live URL)',
      type: 'url',
    }),
    defineField({
      name: 'repoUrl',
      title: 'GitHub 倉庫連結 (Repo URL)',
      type: 'url',
    }),
  ],
})