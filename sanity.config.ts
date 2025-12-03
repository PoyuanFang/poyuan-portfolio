'use client'

/**
 * 這個設定檔是用來配置 Sanity Studio 的
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// 引入排序外掛的 Helper
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// 引用 schema 定義
import { schemaTypes } from './sanity/schemaTypes'

// 從環境變數讀取 Project ID
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  title: 'My Portfolio Studio',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({
      // 自訂側邊欄結構
      structure: (S, context) =>
        S.list()
          .id('root') // 為根列表加上一個唯一的 ID
          .title('內容管理') // 側邊欄標題
          .items([
            // --- 區塊: 可拖曳排序的作品集 ---
            orderableDocumentListDeskItem({
              type: 'project', // 這裡要對應你的 schema name
              title: '作品集 (可拖曳排序)',
              icon: () => '📂',
              S,
              context,
            }),

            // --- 分隔線 ---
            S.divider(),

            orderableDocumentListDeskItem({
              type: 'experience', // 這裡要對應你的 schema name
              title: '工作經歷',
              icon: () => '💼',
              S,
              context,
            }),

            // --- 分隔線 ---
            S.divider(),

            // --- 區塊: 其他所有未定義的內容 ---
            // 自動列出除了project 以外的其他 schema
            ...S.documentTypeListItems().filter(
              (listItem) => !['project', 'experience'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],
})