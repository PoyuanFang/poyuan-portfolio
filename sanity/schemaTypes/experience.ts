import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'experience',
  title: '工作經歷',
  type: 'document',
  icon: () => '💼',

  // 啟用排序設定 (讓 Studio 知道怎麼排)
  orderings: [orderRankOrdering],

  fields: [
    // 加入排序欄位 (這在編輯介面會隱藏，是給系統用的)
    // 注意：這裡的 type 必須跟你的 document name 一樣
    orderRankField({ type: 'experience' }),
    defineField({
      name: 'year',
      title: '年份',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: '職位',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: '單位名稱',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '工作內容描述',
      type: 'text',
    }),
  ],

  //自訂列表預覽顯示
  preview: {
    select: {
      role: 'role',
    },
    prepare(selection) {
      const { role } = selection
      return {
        title: role,
      }
    },
  },
})