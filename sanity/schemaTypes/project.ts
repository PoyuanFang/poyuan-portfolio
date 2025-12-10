import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: '作品集 (Project)',
  type: 'document',
  icon: () => '🎨',

  // 啟用排序設定 (讓 Studio 知道怎麼排)
  orderings: [orderRankOrdering],

  fields: [
    // 加入排序欄位 (這在編輯介面會隱藏，是給系統用的)
    // 注意：這裡的 type 必須跟你的 document name ('project') 一樣
    orderRankField({ type: 'project' }),
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: '精選專案',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: '專案簡介 (短)',
      type: 'text',
      rows: 3, // 限制行數
    }),
    defineField({
      name: 'longDescription',
      title: '專案詳述 (長)',
      type: 'array',
      of: [
        // 標準文字區塊 (H1, H2, Bold, Italic, Lists...)
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'category',
      title: '專案類別',
      type: 'string',
      // 加入下拉選單
      options: {
        list: [
          { title: '前端開發 (Frontend)', value: 'frontend' },
          { title: '後端開發 (Backend)', value: 'backend' },
          { title: '全端開發 (Fullstack)', value: 'fullstack' },
          { title: 'UI/UX 設計', value: 'design' },
        ],
      },
    }),
    defineField({
      name: 'galleryImages',
      title: '專案圖片集',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid', // 讓多張圖片以網格顯示
      },
    }),
    defineField({
      name: 'techStack',
      title: '技術棧 (Tech Stack)',
      type: 'array',
      of: [{ type: 'string' }],
      // 修改：變成標籤輸入模式
      options: {
        layout: 'tags',
      },
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

  //自訂列表預覽顯示
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, media, category, featured } = selection
      // 將類別代碼轉成中文顯示 (對應上面的 options)
      const categories: Record<string, string> = {
        frontend: '前端',
        backend: '後端',
        fullstack: '全端',
        design: '設計',
      }
      const categoryName = categories[category as string] || category || '未分類'

      return {
        title: title,
        media: media,
        subtitle: `${featured ? '精選 | ' : ''}${categoryName}`,
      }
    },
  },
})