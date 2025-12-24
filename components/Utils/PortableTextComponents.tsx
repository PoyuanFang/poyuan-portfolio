import { PortableTextComponents } from '@portabletext/react'

const RichTextComponents: PortableTextComponents = {
  // 定義 Block 類型的渲染方式
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-3 mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-3 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-2 mb-1">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium mt-2 mb-1">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
  },
}

export default RichTextComponents;