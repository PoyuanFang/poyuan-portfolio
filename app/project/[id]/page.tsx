import Project from '@/components/Projects/Project'
import { client } from '../../../sanity/client'

interface ProjectData {
  _id: string
  title: string
  image: any
  description: string
  longDescription: string
  link: string
  skills: string
  category: string
  galleryImages?: any[]
  techStack?: string[]
  liveUrl?: string
  repoUrl?: string
}

export default async function ProjectPage({ params: paramsPromise }: { params: { id: string } }) {
  // In some development environments, `params` can be a promise-like object
  // that needs to be awaited to prevent synchronous access to dynamic data.
  const params = await paramsPromise;
  const { id } = params;
  
  const query = `*[_type == "project" && _id == $id][0]`
  const project = await client.fetch<ProjectData>(query, { id })

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-custom-black">Project not found.</div>
    )
  }
  return <Project project={project} />
}
