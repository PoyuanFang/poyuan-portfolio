
import { client } from '../sanity/client'
import { Project } from '../type/project'
import { HomePageContent } from '@/components/Home/HomePageContent'

export default async function Home() {
  const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(_createdAt desc)`
  const featuredProjects = await client.fetch<Project[]>(featuredProjectsQuery)

  return (
    <HomePageContent projects={featuredProjects} />
  );
}