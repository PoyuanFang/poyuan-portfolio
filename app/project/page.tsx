import { client } from '../../sanity/client'
import { AllProjects } from '@/components/Projects/AllProjects'

// 定義從 Sanity API 回傳的資料類型
interface Project {
  _id: string
  title: string
  image: any
  description: string
  longDescription: string
  link: string
  skills: string
  category: string
}

// 將頁面元件改為 async function，在伺服器端使用 await
export default async function ProjectPage() {
  // 1. 編寫一個 GROQ 查詢，同時獲取 projects
  const query = `{
    "projects": *[_type == "project"] | order(orderRank),
    }`
  // 之後可以在這裡加入其他資料查詢

  // 2. 使用 client.fetch 來執行查詢
  //    回傳的資料結構會是 { projects: Project[]}
  const { projects } = await client.fetch<{
    projects: Project[]
  }>(query)

  return <AllProjects projects={projects} />
}
