import { client } from '../../sanity/client'
import { AllProjects } from '@/components/Projects/AllProjects'

// 定義從 Sanity API 回傳的資料類型
interface Project {
  _id: string
  title: string
  image: any
  description: string
  link: string
  skills: string
}

// 將頁面元件改為 async function，這樣我們就可以在伺服器端使用 await
export default async function ProjectPage() {
  // 1. 編寫 GROQ 查詢語句，來獲取所有類型為 "project" 的文件
  const query = `*[_type == "project"] | order(_createdAt desc)`

  // 2. 使用 client.fetch 來執行查詢
  const projects = await client.fetch<Project[]>(query)

  // 3. 將獲取到的資料作為 props 傳遞給客戶端元件
  return <AllProjects projects={projects} />
}
