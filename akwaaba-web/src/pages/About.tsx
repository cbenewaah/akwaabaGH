import { destinations, regions } from '../data/destinations'
import { festivals } from '../data/festivals'

const valueProps = [
  {
    icon: '✦',
    iconBg: 'rgba(0,107,63,.25)',
    iconColor: '#006B3F',
    title: 'AI assistant',
    body: 'Ask in plain language; get recommendations drawn from curated data.',
  },
  {
    icon: '★',
    iconBg: 'rgba(242,183,5,.18)',
    iconColor: '#F2B705',
    title: 'Festivals calendar',
    body: "The first aggregated calendar of Ghana's festivals, by date & region.",
  },
  {
    icon: '🗣',
    iconBg: 'rgba(206,17,38,.22)',
    iconColor: '#CE1126',
    title: 'Twi support',
    body: "Content in Twi via Khaya AI — accessible to Ghana's largest language audience.",
  },
]

export function About() {
  return (
    <div>
      <div
        className="px-5 py-14 sm:py-16 text-center"
        style={{ background: 'linear-gradient(120deg,#0d1f16,#0a170f)' }}
      >
        <div className="font-extrabold text-xs tracking-widest text-ghana-gold">
          ★ AKWAABAGH — YOU ARE WELCOME
        </div>
        <h1 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-white max-w-[640px] mx-auto">
          Ghana's tourism, finally in one intelligent place.
        </h1>
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-text-4 max-w-[560px] mx-auto">
          Destinations, festivals, and culture — discoverable, connected, and accessible in English and Twi.
        </p>
      </div>

      <div className="mx-auto max-w-[820px] px-5 lg:px-8 py-7">
        <p className="text-sm leading-relaxed text-text-2">
          Ghana's tourist destinations and festivals are richly documented — but scattered across blogs, social
          media, and outdated sites. AkwaabaGH brings them together with an AI assistant that gives contextual
          recommendations, a festivals calendar that helps you time your trip, and full Twi language support so
          the platform serves Ghanaians in the language they're most comfortable in.
        </p>

        <div className="grid sm:grid-cols-3 gap-3.5 mt-6">
          {valueProps.map((v) => (
            <div key={v.title} className="rounded-2xl border border-hairline p-4">
              <div
                className="flex h-9.5 w-9.5 items-center justify-center rounded-lg text-lg"
                style={{ background: v.iconBg, color: v.iconColor }}
              >
                {v.icon}
              </div>
              <div className="font-display font-bold text-[15px] text-white mt-2.5 mb-1">{v.title}</div>
              <div className="text-xs leading-relaxed text-text-4">{v.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-hairline p-5 flex flex-wrap justify-around gap-6 text-center">
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-green">{destinations.length}</div>
            <div className="text-xs font-semibold text-text-6">Destinations</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-red">{festivals.length}</div>
            <div className="text-xs font-semibold text-text-6">Festivals</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-ghana-gold">{regions.length}</div>
            <div className="text-xs font-semibold text-text-6">Regions</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-white">2</div>
            <div className="text-xs font-semibold text-text-6">Languages</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-hairline p-5">
          <div className="font-display text-lg font-bold text-white mb-2">A student capstone project</div>
          <p className="text-sm leading-relaxed text-text-4">
            AkwaabaGH began as an academic proposal by Christabel Benewaah: a curated database of Ghanaian tourist
            destinations, a structured cultural festivals calendar, an AI-powered assistant for contextual
            recommendations, and Twi language support via the Khaya AI API — scope deliberately constrained for
            delivery quality within a two-month build.
          </p>
        </div>
      </div>
    </div>
  )
}
