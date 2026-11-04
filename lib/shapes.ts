/** Organic shape library: clip paths in objectBoundingBox units (0..1), so they scale to any element. */

const PEAR = 'M0.07,0 L0.34,0 C0.42,0 0.48,0.03 0.54,0.07 C0.66,0.14 1,0.13 1,0.24 L1,0.93 C1,0.97 0.97,1 0.93,1 L0.07,1 C0.03,1 0,0.97 0,0.93 L0,0.07 C0,0.03 0.03,0 0.07,0 Z'
// Wide/short (buttons, banners): the bulge only touches the top-left ~30% width / ~40% height.
const PEAR_WIDE = 'M0.3,0 L0.97,0 C0.99,0 1,0.1 1,0.2 L1,0.8 C1,0.9 0.99,1 0.97,1 L0.03,1 C0.01,1 0,0.9 0,0.8 L0,0.55 C0,0.3 0.12,0 0.3,0 Z'
const BLOB = 'M0.12,0.02 C0.4,-0.01 0.75,0.03 0.92,0.06 C0.99,0.08 1,0.2 1,0.45 C1,0.75 0.99,0.92 0.9,0.97 C0.7,1.01 0.3,1 0.08,0.96 C0.01,0.94 0,0.8 0,0.5 C0,0.2 0.02,0.04 0.12,0.02 Z'
const BLOB_WIDE = 'M0.06,0.08 C0.3,-0.02 0.75,0.02 0.95,0.06 C1,0.1 1,0.3 1,0.5 C1,0.75 1,0.9 0.94,0.95 C0.7,1.02 0.3,0.98 0.05,0.94 C0,0.9 0,0.7 0,0.5 C0,0.3 0.01,0.12 0.06,0.08 Z'
const PEBBLE = 'M0.1,0 L0.88,0.02 C0.96,0.03 1,0.08 1,0.16 L0.98,0.86 C0.98,0.95 0.93,1 0.84,1 L0.12,0.98 C0.04,0.97 0,0.92 0,0.84 L0.01,0.12 C0.01,0.04 0.05,0 0.1,0 Z'
const LEAF = 'M0.3,0 L1,0 L1,0.7 C1,0.87 0.87,1 0.7,1 L0,1 L0,0.3 C0,0.13 0.13,0 0.3,0 Z'
const LEAF_WIDE = 'M0.12,0 L1,0 L1,0.6 C1,0.82 0.96,1 0.88,1 L0,1 L0,0.4 C0,0.18 0.04,0 0.12,0 Z'
// Large panels/banners: small tip (~12% width, ~20% height) so top-left headings stay clear.
const PEAR_PANEL = 'M0.12,0 L0.98,0 C0.995,0 1,0.01 1,0.03 L1,0.97 C1,0.99 0.995,1 0.98,1 L0.02,1 C0.005,1 0,0.99 0,0.97 L0,0.2 C0,0.09 0.05,0 0.12,0 Z'
// Puffy cloud: bumpy top/sides, gently flat bottom. Safe text box ≈ x 18–82%, y 32–88%.
const CLOUD = 'M0.12,0.95 C0.04,0.95 0,0.86 0,0.76 C0,0.64 0.06,0.56 0.14,0.55 C0.12,0.38 0.22,0.26 0.36,0.28 C0.4,0.12 0.52,0.04 0.64,0.08 C0.74,0.11 0.8,0.2 0.81,0.3 C0.92,0.3 1,0.42 1,0.56 C1,0.7 0.95,0.8 0.88,0.84 C0.9,0.92 0.84,0.97 0.78,0.95 C0.6,0.99 0.3,0.99 0.12,0.95 Z'
// Plain paint slash: smooth solid stroke, straight flush right edge, soft rounded taper on the left.
// Solid body ≈ x 12–100%, y 12–90%.
const PAINT_SLASH = 'M1,0.08 C0.75,0.05 0.45,0.1 0.2,0.1 C0.08,0.1 0.02,0.3 0.02,0.5 C0.02,0.72 0.09,0.9 0.22,0.9 C0.5,0.91 0.75,0.95 1,0.94 Z'
const NOTCH = 'M0,0 L0.6,0 C0.66,0 0.68,0.03 0.7,0.06 C0.72,0.09 0.74,0.1 0.8,0.1 L1,0.1 L1,1 L0,1 Z'
const WAVE_BOTTOM = 'M0,0 L1,0 L1,0.9 C0.83,0.98 0.67,0.84 0.5,0.92 C0.33,1 0.17,0.86 0,0.94 Z'

const FLIP_X = 'matrix(-1 0 0 1 1 0)'
const FLIP_Y = 'matrix(1 0 0 -1 0 1)'
const FLIP_XY = 'matrix(-1 0 0 -1 1 1)'

export const shapeDefs = {
  'pear-tl': { d: PEAR },
  'pear-tr': { d: PEAR, transform: FLIP_X },
  'pear-bl': { d: PEAR, transform: FLIP_Y },
  'pear-br': { d: PEAR, transform: FLIP_XY },
  'pear-wide-tl': { d: PEAR_WIDE },
  'pear-wide-tr': { d: PEAR_WIDE, transform: FLIP_X },
  'pear-wide-bl': { d: PEAR_WIDE, transform: FLIP_Y },
  'pear-wide-br': { d: PEAR_WIDE, transform: FLIP_XY },
  'pear-panel': { d: PEAR_PANEL },
  'pear-panel-tr': { d: PEAR_PANEL, transform: FLIP_X },
  blob: { d: BLOB },
  'blob-wide': { d: BLOB_WIDE },
  pebble: { d: PEBBLE },
  leaf: { d: LEAF },
  'leaf-flip': { d: LEAF, transform: FLIP_X },
  'leaf-wide': { d: LEAF_WIDE },
  cloud: { d: CLOUD },
  'paint-slash': { d: PAINT_SLASH },
  notch: { d: NOTCH },
  'wave-bottom': { d: WAVE_BOTTOM },
} as const

export type ShapeName = keyof typeof shapeDefs
/** Shapes safe for short, wide elements such as buttons (labels never clip). */
export type ButtonShapeName = 'pear-wide-tl' | 'pear-wide-tr' | 'pear-wide-bl' | 'pear-wide-br' | 'blob-wide' | 'leaf-wide' | 'pebble'

export const tones = [
  'teal', 'coral', 'wine', 'green', 'yellow',
  'soft-teal', 'soft-coral', 'soft-wine', 'soft-green', 'soft-yellow',
  'deep-teal', 'deep-coral', 'deep-wine', 'deep-green', 'deep-yellow',
] as const
export type Tone = (typeof tones)[number]

export function shapeClasses(shape?: ShapeName, tone?: Tone) {
  return [shape && `shape shape-${shape}`, tone && `tone-${tone}`].filter(Boolean).join(' ')
}
