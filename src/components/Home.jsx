// app/page.jsx
import Navbar from './Navbar'
import Background from './Background'
import HeroSection from './HeroSection'

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <Navbar />
      <HeroSection />
      <Background />
    </div>
  )
}
