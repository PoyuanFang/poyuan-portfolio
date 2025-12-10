import Project from '@/components/Projects/Project'

import { Project as ProjectType } from '@/type/project'

import { client } from '@/sanity/client'

export default async function ProjectPage({ params: paramsPromise }: { params: { id: string } }) {
  // In some development environments, `params` can be a promise-like object
  // that needs to be awaited to prevent synchronous access to dynamic data.
  const params = await paramsPromise;
  const { id } = params;

  const query = `*[_type == "project" && _id == $id][0]`
  const project = await client.fetch<ProjectType>(query, { id })

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-custom-black">Project not found.</div>
    )
  }
  return <Project project={project} />
}
