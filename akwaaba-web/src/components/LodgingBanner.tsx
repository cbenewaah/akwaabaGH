import { Link } from 'react-router-dom'
import { PlaceholderMedia } from './PlaceholderMedia'
import lodgeImg from '../assets/images/ghana-beach-resort-lodge.jpg'

export function LodgingBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-10 sm:py-14">
      <div className="relative h-[260px] sm:h-[340px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderMedia image={lodgeImg} alt="Beach resort in Ghana" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end sm:items-end sm:justify-end p-6 sm:p-10 text-center sm:text-right">
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-3 drop-shadow max-w-[380px]">
            Ready to plan where you will stay?
          </h3>
          <Link
            to="/assistant?topic=lodging"
            className="rounded-full bg-white px-6 py-3 font-display font-bold text-sm text-ink hover:bg-ghana-gold transition-colors"
          >
            Find a place to lodge →
          </Link>
        </div>
      </div>
    </section>
  )
}
