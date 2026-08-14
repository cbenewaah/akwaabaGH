import { PlaceholderMedia } from './PlaceholderMedia'
import accraImg from '../assets/images/accra-cityscape.jpg'
import cediImg from '../assets/images/ghana-cedi.jpg'
import hospitalImg from '../assets/images/ghana-hospital.jpg'
import stormImg from '../assets/images/ghana-storm-sky.jpg'
import trotroImg from '../assets/images/ghana-trotro.jpg'
import bonwireImg from '../assets/images/bonwire-kente.jpg'

const tips = [
  {
    title: 'Accommodation',
    image: accraImg,
    body: 'Ghana offers everything from luxury beachfront resorts to budget guesthouses and eco lodges. Major cities provide international standard hotels, while smaller towns offer affordable and comfortable local stays. Booking ahead is recommended during festive seasons.',
  },
  {
    title: 'Currency & Payments',
    image: cediImg,
    body: 'The Ghanaian Cedi (GHS) is the official currency of Ghana. Cash is widely used, but cards are accepted at major hotels and restaurants. Mobile Money (MoMo) is also very common for everyday payments. ATMs are available in cities and regional capitals.',
  },
  {
    title: 'Health & Hospitals',
    image: hospitalImg,
    body: 'Public and private healthcare facilities operate in all towns, major cities and regional centers. Travel insurance is advisable, and visitors should carry essential medications along. Staying hydrated and using mosquito repellent is recommended, especially in warmer and humid areas.',
  },
  {
    title: 'Climate & Weather',
    image: stormImg,
    body: 'Ghana has a tropical climate with warm temperatures throughout the year. The dry season is generally sunny and ideal for travel, while the rainy season brings greener landscapes and fuller waterfalls. Light clothing and sun protection are recommended for comfort.',
  },
  {
    title: 'Transportation',
    image: trotroImg,
    body: 'Transportation options include taxis, ride hailing services, buses, trains, ships and domestic flights. Roads connect most major destinations, though traffic can be busy in large cities. Planning travel time in advance helps ensure smooth movement.',
  },
  {
    title: 'Culture & Etiquette',
    image: bonwireImg,
    body: 'Ghanaians are known for their hospitality and friendliness. Greeting people politely is important, modest dressing is appreciated in traditional communities, and asking permission before taking photos shows respect.',
  },
]

export function TravelTipsSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#0B1220 0%,#111827 45%,#0B1220 100%)' }}>
      {/* curved decorative divider */}
      <svg
        className="absolute top-0 left-0 w-full h-[60px] sm:h-[90px] text-base"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,0 C360,90 1080,90 1440,0 L1440,0 L0,0 Z" />
      </svg>

      <div className="relative mx-auto max-w-[1100px] px-5 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Travel Tips for Visitors to Ghana
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-linear-to-r from-transparent to-ghana-gold/70" />
            <span className="text-ghana-gold">★</span>
            <span className="h-px w-16 bg-linear-to-l from-transparent to-ghana-gold/70" />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-0 rounded-2xl border border-hairline bg-surface overflow-hidden`}
            >
              <PlaceholderMedia
                image={tip.image}
                alt={tip.title}
                className="h-[190px] sm:h-[220px] md:h-auto md:w-[42%] shrink-0"
              />
              <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">{tip.title}</h3>
                <p className="text-sm leading-relaxed text-text-4">{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
