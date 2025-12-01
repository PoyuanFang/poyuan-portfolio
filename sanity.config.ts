'use client'

/**
 * 這個設定檔是用來配置 Sanity Studio 的
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// 引用 schema 定義 (確保你有建立 schemaTypes 資料夾)
import { schemaTypes } from './sanity/schemaTypes'

// 從環境變數讀取 Project ID
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio', // 關鍵：告訴 Sanity 後台網址是 /studio
  projectId,
  dataset,

  title: 'My Portfolio Studio', // 後台左上角顯示的標題

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool(), // 核心管理介面
    visionTool(),    // 查詢測試工具 (可選)
  ],
})