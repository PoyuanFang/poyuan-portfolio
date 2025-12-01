import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false, // if you're using ISR or only static generation at build time, set to true
})

// 輔助函式，用來從 Sanity 取得圖片 URL
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}