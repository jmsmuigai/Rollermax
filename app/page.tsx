import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CTA />
    </div>
  )
}