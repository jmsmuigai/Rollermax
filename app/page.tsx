import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="islamic-pattern">
      <Hero />
      <Stats />
      <Services />
      <Features />
      <About />
      <Testimonials />
      <CTA />
    </div>
  )
}

