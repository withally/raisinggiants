import Image from "next/image";

interface IconProps {
  className?: string;
}

function ArchetypeIcon({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={192}
      height={192}
      className={className}
    />
  );
}

export function SteadyAnchorIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/steady-anchor.png"
      alt="The Steady Anchor"
      className={className}
    />
  );
}

export function FierceGuardianIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/fierce-guardian.png"
      alt="The Fierce Guardian"
      className={className}
    />
  );
}

export function GentleNurturerIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/gentle-nurturer.png"
      alt="The Gentle Nurturer"
      className={className}
    />
  );
}

export function IntentionalGuideIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/intentional-guide.png"
      alt="The Intentional Guide"
      className={className}
    />
  );
}

export function ResilientStriverIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/resilient-striver.png"
      alt="The Resilient Striver"
      className={className}
    />
  );
}

export function StructuredMentorIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/structured-mentor.png"
      alt="The Structured Mentor"
      className={className}
    />
  );
}

export function OpenHeartedLearnerIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/open-hearted-learner.png"
      alt="The Open-Hearted Learner"
      className={className}
    />
  );
}

export function DevotedChampionIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/devoted-champion.png"
      alt="The Devoted Champion"
      className={className}
    />
  );
}

export function CollaborativeAllyIcon({ className }: IconProps) {
  return (
    <ArchetypeIcon
      src="/images/illustrations/collaborative-ally.png"
      alt="The Collaborative Ally"
      className={className}
    />
  );
}
