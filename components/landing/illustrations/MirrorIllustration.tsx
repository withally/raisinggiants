import Image from "next/image";

interface MirrorIllustrationProps {
  className?: string;
}

export function MirrorIllustration({ className }: MirrorIllustrationProps) {
  return (
    <Image
      src="/images/illustrations/hero-mirror.png"
      alt="The Inherited Reflection — a figure seeing inherited patterns in a mirror"
      width={448}
      height={597}
      className={className}
      priority
    />
  );
}
