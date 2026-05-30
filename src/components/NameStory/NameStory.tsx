import { useState } from 'react'

const musicIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
    />
  </svg>
)

const medicalIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  </svg>
)

const boltIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    />
  </svg>
)

function Tidbit({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-blue-400 mt-0.5 shrink-0">{boltIcon}</span>
      <p className="text-gray-600 text-sm leading-relaxed">
        <span className="font-semibold text-gray-800">{label}</span> {text}
      </p>
    </div>
  )
}

export const NameStory = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="name" className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto my-12 py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 border-2 border-dotted border-blue-300 rounded-3xl [background-image:radial-gradient(var(--color-blue-200)_1px,transparent_1px)] [background-size:22px_22px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">What's in a Name?</h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Behind every great company is a story. Ours starts in a garage in upstate New York — and ends in the fight
            against cancer.
          </p>
        </div>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Music pillar */}
          <div className="bg-white rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
                {musicIcon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">The Garage Band Days</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-5">
              RadioClash founder <span className="font-semibold text-gray-800">John Qiao</span> grew up in upstate New
              York playing in garage bands — writing and performing original music inspired by two of the most
              influential rock acts in history: <span className="font-semibold text-gray-800">Radiohead</span> and{' '}
              <span className="font-semibold text-gray-800">The Clash</span>. Put them together and you get{' '}
              <span className="font-semibold text-blue-500">RadioClash</span> — a name that pays tribute to the bands
              that shaped his song-writing and sharpened his creativity in music and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              As it happens, The Clash themselves released a single called <em>"This Is Radio Clash"</em> in 1981 — a
              track about broadcast signals cutting through the noise. A fitting parallel for a company sending energy
              straight to the core of tumors.
            </p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <Tidbit
                label="Radiohead"
                text="Formed in 1985 in Oxford, England. Their name came from a Talking Heads song. Known for pushing sonic boundaries — OK Computer and Kid A are landmarks of modern rock."
              />
              <Tidbit
                label="The Clash"
                text={`Formed in London in 1976 and billed as "The Only Band That Matters." Rock and Roll Hall of Fame inductees who pioneered politically conscious punk. Joe Strummer said it best: "We're anti-fascist, anti-violence, anti-racist, and pro-creative."`}
              />
            </div>
          </div>

          {/* Medical pillar */}
          <div className="bg-white rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
                {medicalIcon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">The Medical Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-5">
              The name carries a deeper meaning, too. <span className="font-semibold text-gray-800">"Radio"</span> is a
              nod to John's career as an <span className="font-semibold text-gray-800">interventional radiologist</span>{' '}
              — the image-guided, minimally invasive surgical discipline at the core of RadioClash's technology.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              And <span className="font-semibold text-gray-800">"Clash"</span>? That is a word that describes the
              culture of creative destruction for interventional radiology, an innovative field in medicine with a
              history for replacing established open surgeries with paradigm-shifting minimally-invasive operations.
              With the enhanced electroporation therapy platform{' '}
              <span className="font-semibold text-blue-500">RadioClash</span> is developing, precisely targeted
              electrical fields <em>clash</em> with cancer cells at the molecular level — creating irreversible
              nanopores that destroy tumors while sparing the surrounding healthy tissue and vital structures.
            </p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <Tidbit
                label="Interventional Radiology"
                text="A medical specialty using imaging (x-ray, CT, ultrasound, MRI) to guide minimally invasive, targeted surgical treatments. Less pain, less risk, faster recovery."
              />
              <Tidbit
                label="Electroporation"
                text="Ultra-short electrical pulses create nanopores in cancer cell membranes, triggering cell death by loss of homeostasis. The technique preserves blood vessels, nerves, and bile ducts within the treatment zone, decreasing damage to surrounding structures."
              />
            </div>
          </div>
        </div>

        {/* Expanded detail */}
        <div className="max-w-3xl mx-auto mt-10 text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors cursor-pointer"
          >
            {expanded ? 'Read less' : 'A bit more of the story'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? 'max-h-150 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <blockquote className="bg-blue-50 rounded-xl p-6 text-left">
              <p className="text-gray-700 leading-relaxed text-sm">
                The Clash was famous for "fighting the good fight that few others would fight" — whether it was tearing
                down barbed wire at festivals or challenging the status quo through music. That same spirit drives
                RadioClash today. Cancer does not discriminate. It affects our family, friends, and loved ones without
                regard for the color of your skin, your background, or your accomplishments. And it presents some of
                medicine's toughest challenges — tumors that are often inoperable or located near critical structures
                where conventional treatments fall short. Enhanced electroporation therapy brings a new weapon to that
                fight: precise, effective, and minimally invasive.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm mt-4">
                From garage bands to groundbreaking medical devices — the name RadioClash is challenging the status quo,
                serving as a bridge between where the journey began and where the mission leads.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
