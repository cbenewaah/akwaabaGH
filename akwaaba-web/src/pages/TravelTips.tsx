import { PlaceholderMedia } from '../components/PlaceholderMedia'
import cediImg from '../assets/images/ghana-cedi.jpg'

const tips = [
  {
    title: 'Best time to visit',
    body: 'The dry season (November–March) is easiest for travel — clearer roads, better hiking conditions, and the most festivals. The rainy season (April–October) is greener and quieter, with waterfalls at their fullest.',
  },
  {
    title: 'Currency & payments',
    body: 'The Ghana cedi (GHS) is the local currency. Cash is preferred outside major cities; mobile money (MoMo) is widely used. Cards are accepted at hotels and larger restaurants in Accra and Kumasi.',
  },
  {
    title: 'Getting around',
    body: 'Shared taxis ("tro-tros") and ride-hailing apps cover the cities; intercity travel is by bus, private car, or domestic flight for longer distances (e.g. Accra–Tamale).',
  },
  {
    title: 'Visas',
    body: 'Most visitors need a visa or eVisa in advance — check requirements for your nationality before you travel. ECOWAS citizens generally travel visa-free.',
  },
  {
    title: 'Dress & etiquette',
    body: 'Dress modestly at religious and heritage sites. Ask before photographing people or rituals, especially at festivals. Greet elders and hosts before starting a conversation.',
  },
  {
    title: 'Language',
    body: 'English is the official language. Twi is the most widely spoken local language — use the EN/TW toggle on AkwaabaGH to browse the site in Twi.',
  },
]

export function TravelTips() {
  return (
    <div className="mx-auto max-w-[900px] px-5 lg:px-8 py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Travel tips for Ghana</h1>
      <p className="mt-1.5 text-sm text-text-4 max-w-[560px]">
        Practical notes to help you plan — currency, timing, transport, and a few cultural pointers before you go.
      </p>

      <div className="mt-7 rounded-2xl overflow-hidden border border-hairline">
        <PlaceholderMedia image={cediImg} alt="Ghana cedi banknotes" className="h-[180px]" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-7">
        {tips.map((tip) => (
          <div key={tip.title} className="rounded-2xl border border-hairline p-4">
            <div className="font-display font-bold text-[15px] text-white mb-1.5">{tip.title}</div>
            <div className="text-sm leading-relaxed text-text-4">{tip.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
