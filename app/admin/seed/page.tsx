import SeedClient from '../seed-client'

export const metadata = { title: 'Admin - Seed' }

export default function SeedPage() {
  return (
    <div className="min-h-screen bg-primary-dark pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Run Seeder</h1>
        <p className="text-gray-300 mb-6">Trigger the demo data seeder (requires seed secret).</p>
        <SeedClient />
      </div>
    </div>
  )
}
