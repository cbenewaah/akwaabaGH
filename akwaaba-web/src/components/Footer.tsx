import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'

const topDestinations = [...destinations]
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 6)

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface mt-auto">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 pt-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
          <span className="h-px flex-1 max-w-[220px] bg-linear-to-r from-transparent to-ghana-gold/70" />
          <div className="rounded-xl border border-hairline-strong bg-surface-deep px-6 py-3.5 shrink-0">
            <div className="flex items-center gap-1.5 font-display text-xl font-extrabold text-white">
              <span className="text-ghana-gold">★</span>Akwaaba<span className="text-ghana-green">GH</span>
            </div>
          </div>
          <span className="h-px flex-1 max-w-[220px] bg-linear-to-l from-transparent to-ghana-gold/70" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3 pb-10">
          <div className="text-center sm:text-left">
            <div className="font-display font-bold text-sm tracking-wide text-white mb-3">EXPLORE</div>
            <div className="flex flex-col gap-2 text-sm text-text-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/destinations" className="hover:text-white transition-colors">Regions</Link>
              <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link>
              <Link to="/travel-tips" className="hover:text-white transition-colors">Travel Tips</Link>
              <Link to="/my-trip" className="hover:text-white transition-colors">Favorites</Link>
            </div>
          </div>

          <div className="text-center">
            <div className="font-display font-bold text-sm tracking-wide text-white mb-3">CONTACT US</div>
            <div className="flex flex-col gap-2 text-sm text-text-4">
              <div>Email: akwaabagh@gmail.com</div>
              <div>Location: Accra, Ghana</div>
              <div>Phone: +233 24 123 4567</div>
              <div>WhatsApp: 024 123 4567</div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-display font-bold text-sm tracking-wide text-white mb-3">TOP DESTINATIONS</div>
            <div className="flex flex-col gap-2 text-sm text-text-4">
              {topDestinations.map((d) => (
                <Link key={d.id} to={`/destinations/${d.id}`} className="hover:text-white transition-colors">
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-hairline px-5 lg:px-8 py-4 flex flex-col sm:flex-row gap-2 justify-between text-xs text-text-6 max-w-[1400px] mx-auto">
        <div><span className="text-ghana-gold">★</span> AkwaabaGH · Ghana Tourism Discovery</div>
        <div>Destinations · Festivals · Experiences · About · Twi</div>
      </div>
    </footer>
  )
}
