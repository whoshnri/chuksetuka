/**
 * <Shape> — organic shapes + brand tones in one prop each.
 *
 *   <Shape shape="pear-tl" tone="teal" className="p-8">…</Shape>          // div by default
 *   <Shape as="section" shape="blob" tone="soft-coral">…</Shape>
 *   <Shape as={Link} href="/services" shape="pear-wide-tl" tone="wine">Go</Shape>
 *
 * Plain classes work too: className="shape shape-pear-tl tone-coral".
 * Shapes: pear-tl/tr/bl/br, pear-wide-tl/tr/bl/br, blob, blob-wide, pebble, leaf, leaf-flip,
 *   leaf-wide, cloud, paint-slash, notch, wave-bottom (see lib/shapes.ts, SHAPES.md).
 * Tones: teal coral wine green yellow, soft-* (light bg + ink text), deep-* (dark bg + white text).
 * Clip-paths cut borders, shadows and outlines; shaped elements get an inset focus ring instead.
 * Keep text clear of the cut-away corner (e.g. pear-tl: start content below ~20% height or keep the
 * first line short; use the *-wide shapes for short/wide elements).
 */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { shapeClasses, type ShapeName, type Tone } from '@/lib/shapes'

type ShapeProps<T extends ElementType> = {
  as?: T
  shape?: ShapeName
  tone?: Tone
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Shape<T extends ElementType = 'div'>({ as, shape = 'pear-tl', tone, className, children, ...props }: ShapeProps<T>) {
  const Component = (as ?? 'div') as ElementType
  const classes = [shapeClasses(shape, tone), className].filter(Boolean).join(' ')
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
