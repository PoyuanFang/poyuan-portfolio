'use client'

import { useRouter } from 'next/navigation'

import { PortableText } from '@portabletext/react'
import PortableTextComponents from './PortableTextComponents'
import { urlFor } from '@/sanity/client'

import { Project as ProjectType } from '@/type/project'

import { CustomCursor } from '@/components/Home/CustomCursor'
import ProjectImageCarousel from '@/components/Projects/ProjectImageCarousel'

import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

export default function Project({ project }: { project: ProjectType }) {
  const router = useRouter()

  const imageUrls = project.galleryImages?.map((image) => urlFor(image).url()) || []

  return (
    <div className="relative w-full min-h-screen bg-products-bg text-custom-black font-sans overflow-hidden selection:bg-custom-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-products-bg rounded-full blur-[120px] opacity-80"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-custom-orange/10 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <CustomCursor />

      <main className="relative w-full z-10 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/project')}
            className="flex items-center gap-2 text-sm text-custom-gray hover:text-custom-orange transition-colors mb-12 interactive"
          >
            <FaArrowLeft />
            Back to Projects
          </button>

          {/* Header */}
          <header className="mb-12">
            <span className="text-custom-blue text-xs tracking-widest uppercase font-medium">{project.category}</span>
            <h1 className="text-3xl md:text-5xl font-serif mt-2">{project.title}</h1>
          </header>

          {/* Main Image */}
          {imageUrls.length > 0 && (
            <div className="mb-12 shadow-lg border border-custom-black/5 overflow-hidden rounded-lg">
              <ProjectImageCarousel slides={imageUrls} options={{ loop: true }} />
            </div>
          )}

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif">關於專案</h2>
              <div className="text-custom-gray leading-relaxed whitespace-pre-line">
                {project.longDescription ?
                  <PortableText value={project.longDescription} components={PortableTextComponents} />
                  : project.description}</div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">使用技術</h2>
              <ul className="space-y-2">
                {project.techStack?.map(tech => <li key={tech} className="text-custom-gray">{tech}</li>)}
              </ul>
              <div className="flex items-center gap-4 pt-4">
                {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-custom-orange transition-colors interactive">LIVE URL<FaExternalLinkAlt /></a>)}
                {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-custom-orange transition-colors interactive">GitHub <FaGithub /></a>)}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}