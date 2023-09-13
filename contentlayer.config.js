import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { isForInStatement } from 'typescript'

/** @type {import('contentlayer/source-files').ComputedFields}  */
const computedFields = {
  slug: { 
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'complete-nextjs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', },
    piblished: { type: 'boolean', default: true },
    date: { type: 'date', required: true },
  },
  computedFields,
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Doc],
    mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            onVisiline(node) {
              // Prevent lines from colamsing in 'diplay: grid' mode, 
              // and allow empty lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }]
              }
            },
            onVisitHighlightedLine(node) {
              node.propieties.className.push('line-highlighted')
            },
            onVisitHighlightedWord(node) {
              node.propieties.className = ['word-highlighted']            
            },
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['subheading-anchor'],
              arialLabel: 'Link to section',
            },
          },
        ],
      ]

}})
