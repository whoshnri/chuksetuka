import { cloneElement, isValidElement, type ReactElement } from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import {
  HeadingJSXConverter,
  RichText,
  type JSXConverterArgs,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

export type ArticleBody = SerializedEditorState<SerializedLexicalNode>
export type ArticleOutlineItem = { id: string; label: string }

type ArticleNode = SerializedLexicalNode & {
  children?: ArticleNode[]
  tag?: string
  text?: string
}

function textFromNode(node: ArticleNode): string {
  if (typeof node.text === 'string') return node.text
  return (node.children || []).map(textFromNode).join('')
}

function slugifyHeading(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getArticleOutline(body: ArticleBody): ArticleOutlineItem[] {
  const outline: ArticleOutlineItem[] = []
  const slugCounts = new Map<string, number>()

  const visit = (node: ArticleNode) => {
    if (node.type === 'heading' && (node.tag === 'h1' || node.tag === 'h2')) {
      const label = textFromNode(node).trim()
      if (label) {
        const base = slugifyHeading(label) || `section-${outline.length + 1}`
        const count = (slugCounts.get(base) || 0) + 1
        slugCounts.set(base, count)
        outline.push({ id: count === 1 ? base : `${base}-${count}`, label })
      }
    }

    node.children?.forEach(visit)
  }

  body.root.children.forEach((node) => visit(node as ArticleNode))
  return outline
}

export function legacyParagraphsToArticleBody(paragraphs: string[]): ArticleBody {
  const firstBoundary = Math.ceil(paragraphs.length / 3)
  const secondBoundary = Math.ceil((paragraphs.length * 2) / 3)
  const sections = [
    { title: 'The context', paragraphs: paragraphs.slice(0, firstBoundary) },
    { title: 'What to consider', paragraphs: paragraphs.slice(firstBoundary, secondBoundary) },
    { title: 'A practical next step', paragraphs: paragraphs.slice(secondBoundary) },
  ].filter((section) => section.paragraphs.length > 0)

  const textNode = (text: string) => ({
    detail: 0,
    format: 0,
    mode: 'normal' as const,
    style: '',
    text,
    type: 'text' as const,
    version: 1 as const,
  })
  const children = sections.flatMap((section) => [
    {
      children: [textNode(section.title)],
      direction: null,
      format: '',
      indent: 0,
      tag: 'h2',
      type: 'heading',
      version: 1,
    },
    ...section.paragraphs.map((paragraph) => ({
      children: [textNode(paragraph)],
      direction: null,
      format: '',
      indent: 0,
      type: paragraph.startsWith('People don’t stop speaking up') ? 'quote' : 'paragraph',
      version: 1,
    })),
  ])

  return {
    root: {
      children,
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  } as ArticleBody
}

export function ArticleRichText({ body }: { body: ArticleBody }) {
  const outline = getArticleOutline(body)
  let outlineIndex = 0

  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: (args) => {
      const isNavigableHeading = args.node.tag === 'h1' || args.node.tag === 'h2'
      const heading = typeof HeadingJSXConverter.heading === 'function'
        ? HeadingJSXConverter.heading(args as JSXConverterArgs<SerializedHeadingNode>)
        : HeadingJSXConverter.heading
      if (!isNavigableHeading || !isValidElement(heading)) return heading

      const hasLabel = textFromNode(args.node as ArticleNode).trim().length > 0
      const outlineItem = hasLabel ? outline[outlineIndex++] : undefined
      if (!outlineItem) return heading

      const className = args.node.tag === 'h1'
        ? 'scroll-mt-28 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-[-.03em] text-[#171514]'
        : 'scroll-mt-28'

      return cloneElement(heading as ReactElement<{ id?: string; className?: string }>, {
        id: outlineItem.id,
        className,
      })
    },
  })

  return <RichText className="article-rich-text" data={body} converters={converters} />
}
