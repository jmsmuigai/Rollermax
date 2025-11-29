import Hero from '@/components/Hero'
import ImageMarquee from '@/components/ImageMarquee'
import Services from '@/components/Services'
import MpesaIntegration from '@/components/MpesaIntegration'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import GeminiBot from '@/components/GeminiBot'

export default function Home() {
  return (
    <div className="bg-[var(--bg-primary)]">
      <Hero />
      <ImageMarquee />
      <Services />
      <Stats />
      <About />
      <MpesaIntegration />
      <Testimonials />
      <CTA />
      <GeminiBot />
    </div>
  )
}

