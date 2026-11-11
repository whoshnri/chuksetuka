# Shapes & tones

Organic clip-path shapes + brand colour tones. Defined once (`lib/shapes.ts`), rendered as SVG
`<clipPath clipPathUnits="objectBoundingBox">` by `<ShapeDefs />` in `app/layout.tsx`, so every shape scales.

## Shapes
| Name | Use |
|---|---|
| `pear-tl` (default), `pear-tr`, `pear-bl`, `pear-br` | Cards. Narrow tip at that corner, fattening away from it. Keep the first ~20% of height short (label) on the tip side. |
| `pear-wide-tl/-tr/-bl/-br` | Buttons, short wide elements. Bulge only affects ~30% width / ~40% height in its corner. |
| `pear-panel`, `pear-panel-tr` | Large panels/banners. Small tip (~12% w, ~20% h). |
| `blob`, `blob-wide` | Soft irregular rounded rect (cards / buttons). Keep ~8–10% padding. |
| `pebble` | Gently uneven rounded rect. Safe for anything. |
| `leaf`, `leaf-flip`, `leaf-wide` | Two opposite big rounded corners. |
| `cloud` | Puffy cloud (bumpy top/sides, flat-ish bottom). Keep text in the middle: ~18% side padding, ~32% top, ~12% bottom. |
| `paint-slash` | Plain smooth paint stroke: straight right edge (bleed it off the right), soft rounded taper on the left. Keep text in the body (~18% left padding, ~14% top/bottom). |
| `notch` | Tab notch on the top-right. |
| `wave-bottom` | Wavy bottom edge (sections, hero bands). |

## Tones
`teal coral wine green` (white text), `yellow` (near-black text),
`soft-*` (light tint + dark ink text, AA), `deep-*` (dark ink bg + white text, AA).
Note: white on `teal` (3.4:1), `coral` (3.5:1) and `green` only passes AA for large text; prefer `deep-*` for small text.

## Usage
```tsx
import { Shape } from '@/components/shape'
import { Button } from '@/components/ui/button'

<Shape shape="pear-tl" tone="soft-teal" className="p-8">…</Shape>          // div
<Shape as="section" shape="wave-bottom" tone="deep-teal">…</Shape>
<Shape as={Link} href="/contact" shape="pear-wide-tl" tone="wine">Contact</Shape>

<Button>Send</Button>                                   // filled → pear-wide-tl automatically
<Button shape="blob-wide" tone="coral">Book</Button>
<Button shape="none">Square-ish (rounded-sm)</Button>
<Button variant="outline">Outline stays rounded-sm</Button>
```
Plain classes: `className="shape shape-leaf tone-soft-coral"`.

Notes: clip-path cuts borders, shadows and outlines; shaped elements show an inset focus ring.
Filled `.action-link--teal/--orange` use `pear-wide-tl`; cards site-wide use `pear-tl` (narrow) or `pear-panel` (wide).
