import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import { LanguageProvider } from './context/LanguageContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Destinations } from './pages/Destinations'
import { DestinationDetail } from './pages/DestinationDetail'
import { Festivals } from './pages/Festivals'
import { FestivalDetail } from './pages/FestivalDetail'
import { Assistant } from './pages/Assistant'
import { Experiences } from './pages/Experiences'
import { TripPlanner } from './pages/TripPlanner'
import { SearchResults } from './pages/SearchResults'
import { About } from './pages/About'
import { TravelTips } from './pages/TravelTips'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />
                <Route path="/festivals" element={<Festivals />} />
                <Route path="/festivals/:id" element={<FestivalDetail />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/my-trip" element={<TripPlanner />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/about" element={<About />} />
                <Route path="/travel-tips" element={<TravelTips />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TripProvider>
    </AuthProvider>
  )
}
