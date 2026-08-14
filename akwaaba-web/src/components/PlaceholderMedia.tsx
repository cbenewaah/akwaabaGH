interface Props {
  label?: string
  variant?: 'default' | 'map'
  className?: string
  image?: string
  alt?: string
  children?: React.ReactNode
}

export function PlaceholderMedia({ label, variant = 'default', className = '', image, alt, children }: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={image} alt={alt ?? label ?? ''} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
        {children && <div className={`relative ${className}`}>{children}</div>}
      </div>
    )
  }

  return (
    <div
      className={`${variant === 'map' ? 'placeholder-media-map' : 'placeholder-media'} relative flex items-center justify-center ${className}`}
    >
      {label && (
        <span className="absolute top-2 left-2 font-mono text-[10px] text-text-5/80">{label}</span>
      )}
      {children}
    </div>
  )
}
