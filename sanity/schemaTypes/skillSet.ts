import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'skillSet',
  title: '專業技能',
  type: 'document',
  icon: () => '🛠️',

  // 啟用排序設定 (讓 Studio 知道怎麼排)
  orderings: [orderRankOrdering],

  fields: [
    // 加入排序欄位 (這在編輯介面會隱藏，是給系統用的)
    // 注意：這裡的 type 必須跟你的 document name 一樣
    orderRankField({ type: 'skillSet' }),
    defineField({
      name: 'name',
      title: '名稱',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: '熟練度',
      type: 'number',
    }),
  ],

  //自訂列表預覽顯示
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const { name } = selection
      return {
        title: name,
      }
    },
  },
})