import { shapeDefs } from '@/lib/shapes'

/** Mounted once in the root layout: every `.shape-*` class points at one of these clip paths. */
export function ShapeDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {Object.entries(shapeDefs).map(([name, def]) => (
          <clipPath id={`shape-${name}`} key={name} clipPathUnits="objectBoundingBox">
            <path
              d={def.d}
              transform={'transform' in def ? def.transform : undefined}
            />
          </clipPath>
        ))}
      </defs>
    </svg>
  )
}
