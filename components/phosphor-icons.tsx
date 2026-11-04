import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>{children}</svg>
}

export function ArrowUpRight(props: IconProps) {
  return <Icon {...props}><path d="M200 56H96a8 8 0 0 0 0 16h84.69L58.34 194.34a8 8 0 0 0 11.32 11.32L192 83.31V168a8 8 0 0 0 16 0V64a8 8 0 0 0-8-8Z" fill="currentColor" /></Icon>
}

export function ArrowRight(props: IconProps) {
  return <Icon {...props}><path d="M221.66 133.66 149.66 205.66a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" fill="currentColor" /></Icon>
}

export function Play(props: IconProps) {
  return <Icon {...props}><path d="M232.4 114.49 88.32 27.55A16 16 0 0 0 64 41.06v173.88a16 16 0 0 0 24.32 13.51l144.08-86.94a15.95 15.95 0 0 0 0-27.02Z" fill="currentColor" /></Icon>
}

export function List(props: IconProps) {
  return <Icon {...props}><path d="M40 72h16a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 0H88a8 8 0 0 0 0-16h128a8 8 0 0 0 0 16Zm-176 64h16a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 0H88a8 8 0 0 0 0-16h128a8 8 0 0 0 0 16Zm-176 64h16a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 0H88a8 8 0 0 0 0 16h128a8 8 0 0 0 0-16Z" fill="currentColor" /></Icon>
}

export function X(props: IconProps) {
  return <Icon {...props}><path d="M139.31 128 216 51.31A8 8 0 0 0 204.69 40L128 116.69 51.31 40A8 8 0 0 0 40 51.31L116.69 128 40 204.69A8 8 0 0 0 51.31 216L128 139.31 204.69 216A8 8 0 0 0 216 204.69L139.31 128Z" fill="currentColor" /></Icon>
}

export function Plus(props: IconProps) {
  return <Icon {...props}><path d="M128 32v192M32 128h192" stroke="currentColor" strokeLinecap="round" strokeWidth="16" /></Icon>
}

export function Minus(props: IconProps) {
  return <Icon {...props}><path d="M32 128h192" stroke="currentColor" strokeLinecap="round" strokeWidth="16" /></Icon>
}

export function Clock(props: IconProps) {
  return <Icon {...props}><path d="M128 24a104 104 0 1 0 104 104A104.12 104.12 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm8-88V72a8 8 0 0 0-16 0v56a8 8 0 0 0 2.34 5.66l40 40a8 8 0 0 0 11.32-11.32Z" fill="currentColor" /></Icon>
}

export function Monitor(props: IconProps) {
  return <Icon {...props}><path d="M216 40H40a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h72v24H80a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16h-32v-24h72a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 128H40V56h176Z" fill="currentColor" /></Icon>
}

export function CalendarBlank(props: IconProps) {
  return <Icon {...props}><rect x="32" y="48" width="192" height="176" rx="16" stroke="currentColor" strokeLinejoin="round" strokeWidth="16" /><path d="M80 24v48m96-48v48M32 96h192" stroke="currentColor" strokeLinecap="round" strokeWidth="16" /></Icon>
}

export function EnvelopeSimple(props: IconProps) {
  return <Icon {...props}><rect x="24" y="48" width="208" height="160" rx="16" stroke="currentColor" strokeLinejoin="round" strokeWidth="16" /><path d="m32 64 96 80 96-80" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></Icon>
}

export function ChatCircleText(props: IconProps) {
  return <Icon {...props}><path d="M128 32a96 96 0 0 0-83.3 143.8L32 224l48.2-12.7A96 96 0 1 0 128 32Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="16" /><path d="M88 112h80m-80 32h56" stroke="currentColor" strokeLinecap="round" strokeWidth="16" /></Icon>
}

export function VideoCamera(props: IconProps) {
  return <Icon {...props}><rect x="24" y="56" width="144" height="144" rx="16" stroke="currentColor" strokeLinejoin="round" strokeWidth="16" /><path d="m168 104 64-40v128l-64-40" stroke="currentColor" strokeLinejoin="round" strokeWidth="16" /></Icon>
}

export function UsersThree(props: IconProps) {
  return <Icon {...props}><path d="M88 128a48 48 0 1 0-48-48 48 48 0 0 0 48 48Zm80-40a40 40 0 1 0-40-40 40 40 0 0 0 40 40ZM16 216a72 72 0 0 1 144 0m-24-80a64 64 0 0 1 104 56M192 112a56 56 0 0 1 48 56" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></Icon>
}

export function Scales(props: IconProps) {
  return <Icon {...props}><path d="M128 32v176m-64 16h128M64 64h128M40 96l24-32 24 32a32 32 0 0 1-48 0Zm80 0 24-32 24 32a32 32 0 0 1-48 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></Icon>
}

export function Target(props: IconProps) {
  return <Icon {...props}><circle cx="128" cy="128" r="88" stroke="currentColor" strokeWidth="16" /><circle cx="128" cy="128" r="48" stroke="currentColor" strokeWidth="16" /><circle cx="128" cy="128" r="8" fill="currentColor" /></Icon>
}
