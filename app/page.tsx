
import { client } from '../sanity/client'
import { Project } from '../type/project'
import { Experience } from '../type/experience'
import { SkillSet } from '../type/skillSet'
import { HomePageContent } from '@/components/Home/HomePageContent'

export default async function Home() {

  // 編寫 GROQ 查詢
  const query = `{
    "featuredProjects": *[_type == "project" && featured == true] | order(orderRank),
    "experience": *[_type == "experience"] | order(orderRank),
    "skillSet": *[_type == "skillSet"] | order(orderRank)
    }`
  // 之後可以在這裡加入其他資料查詢

  // 使用 client.fetch 來執行查詢
  // 回傳的資料結構會是 { projects: Project[]}
  const { featuredProjects, experience, skillSet } = await client.fetch<{
    featuredProjects: Project[],
    experience: Experience[],
    skillSet: SkillSet[]
  }>(query)

  return (
    <HomePageContent
      projects={featuredProjects}
      experience={experience}
      skillSet={skillSet}
    />
  );
}