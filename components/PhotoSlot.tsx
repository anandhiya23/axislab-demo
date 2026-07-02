import Image from "next/image";

// Drop real photography into /public/photos and pass `src`.
// Until then, renders a filmic monochrome placeholder with a caption label
// so the layout reads correctly during the preview stage.
export function PhotoSlot({
  src,
  alt = "",
  label,
  className = "",
  priority = false,
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className={`photo-slot flex items-end ${className}`}>
      {label && (
        <span className="label relative z-10 m-5 text-paper/40">{label}</span>
      )}
    </div>
  );
}
