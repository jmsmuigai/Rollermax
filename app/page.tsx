import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter'; // Your existing gallery

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Newsletter />

      {/* Footer Teaser */}
      <section className="bg-roller-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Create an account to manage your shipments, view invoices, and schedule pickups instantly.</p>
          <button className="bg-roller-red px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors">
            Create Free Account
          </button>
        </div>
      </section>
    </main>
  );
}
