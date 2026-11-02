import Image from 'next/image'

/** Article cover = the per-post social thumbnail in /public/og/<slug>.png (2400x1260, 2x retina). */
export default function PostCover({
  slug,
  className = '',
  sizes = '(min-width:1024px) 420px, 92vw',
  priority = false,
}: {
  slug: string
  className?: string
  sizes?: string
  priority?: boolean
  showLabel?: boolean
}) {
  return (
    <div className={`relative overflow-hidden bg-hero ${className}`}>
      <Image src={`/og/${slug}.png`} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  )
}
