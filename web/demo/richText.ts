// Turns the small markup used in ./lessons into Contentful rich-text
// documents, the format the app's RichText / LessonContent components render.
import { BLOCKS, Document, MARKS } from '@contentful/rich-text-types'

type Node = Record<string, unknown>

const text = (line: string): Node[] =>
  line
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => {
      const bold = part.startsWith('**') && part.endsWith('**')
      return {
        nodeType: 'text',
        value: bold ? part.slice(2, -2) : part,
        marks: bold ? [{ type: MARKS.BOLD }] : [],
        data: {}
      }
    })

const paragraph = (line: string): Node => ({
  nodeType: BLOCKS.PARAGRAPH,
  data: {},
  content: text(line)
})

export const toDocument = (lines: string[]): Document => {
  const content: Node[] = []
  let list: Node | undefined

  lines.forEach((line) => {
    if (line.startsWith('- ')) {
      if (!list) {
        list = { nodeType: BLOCKS.UL_LIST, data: {}, content: [] }
        content.push(list)
      }
      const items = list.content as Node[]
      items.push({
        nodeType: BLOCKS.LIST_ITEM,
        data: {},
        content: [paragraph(line.slice(2))]
      })
      return
    }
    list = undefined

    if (line.startsWith('## ')) {
      content.push({
        nodeType: BLOCKS.HEADING_2,
        data: {},
        content: text(line.slice(3))
      })
    } else if (line.startsWith('> ')) {
      content.push({
        nodeType: BLOCKS.QUOTE,
        data: {},
        content: [paragraph(line.slice(2))]
      })
    } else {
      content.push(paragraph(line))
    }
  })

  return { nodeType: BLOCKS.DOCUMENT, data: {}, content } as Document
}
