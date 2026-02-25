const researchers = [
  {
    name: "Diana Baumrind",
    role: "Developmental psychologist",
    contribution: "Authoritative parenting framework",
    work: "Child care practices anteceding three patterns of preschool behavior",
    year: "1967",
  },
  {
    name: "John Gottman",
    role: "Relationship researcher",
    contribution: "Emotional coaching and repair",
    work: "Raising an Emotionally Intelligent Child",
    year: "1997",
  },
  {
    name: "Daniel J. Siegel",
    role: "Clinical professor of psychiatry",
    contribution: "Interpersonal neurobiology",
    work: "The Developing Mind",
    year: "2012",
  },
  {
    name: "Mary Ainsworth",
    role: "Developmental psychologist",
    contribution: "Attachment theory",
    work: "Strange Situation study",
    year: "1978",
  },
  {
    name: "Dr. Becky Kennedy",
    role: "Clinical psychologist",
    contribution: "Repair as cornerstone of connection",
    work: "Good Inside",
    year: "2022",
  },
  {
    name: "Shefali Tsabary",
    role: "Clinical psychologist",
    contribution: "Conscious parenting",
    work: "The Conscious Parent",
    year: "2010",
  },
  {
    name: "Bessel van der Kolk",
    role: "Trauma researcher",
    contribution: "Intergenerational trauma",
    work: "The Body Keeps the Score",
    year: "2014",
  },
  {
    name: "Ronald P. Rohner",
    role: "Cross-cultural psychologist",
    contribution: "Cross-cultural parental acceptance",
    work: "IPARTheory & PARQ — 60+ cultures",
    year: "ongoing",
  },
];

export function KOLCredibility() {
  return (
    <section className="bg-amber-50 py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-4">
            The Research
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight mb-4">
            Grounded in decades of work from the world&apos;s leading parenting
            scientists.
          </h2>
          <p className="text-stone-500 text-base leading-relaxed">
            The Mirror isn&apos;t built on opinion or trend. Every dimension it
            measures draws on peer-reviewed research, longitudinal studies, and
            clinical frameworks that have shaped how the field understands child
            development.
          </p>
        </div>

        {/* Researcher grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-amber-200/60 border border-amber-200/60 rounded-2xl overflow-hidden">
          {researchers.map((researcher) => (
            <div
              key={researcher.name}
              className="bg-amber-50 p-5 lg:p-6 flex flex-col gap-2 hover:bg-amber-100/60 transition-colors"
            >
              {/* Name */}
              <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                {researcher.name}
              </h3>

              {/* Contribution */}
              <p className="text-xs text-amber-700 font-medium leading-snug">
                {researcher.contribution}
              </p>

              {/* Divider */}
              <div className="w-6 h-px bg-amber-300 my-1" aria-hidden="true" />

              {/* Work */}
              <p className="text-xs text-stone-500 leading-snug italic">
                &ldquo;{researcher.work}&rdquo;
              </p>

              {/* Year */}
              <p className="text-xs text-stone-400 mt-auto">
                {researcher.year}
              </p>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <p className="mt-8 text-center text-xs text-stone-400 leading-relaxed max-w-lg mx-auto">
          These thinkers shaped the framework behind The Mirror. Their work
          informs every question, every dimension, every insight.
        </p>
      </div>
    </section>
  );
}
