import AdminUsers from '../../components/AdminUsers';
import { Suspense } from 'react'
import Link from 'next/link'
import Reports from '../../components/Reports'

export const metadata = {
  title: 'Admin - Users'
};

export default function AdminPage() {
  return (
      <div className="min-h-screen bg-primary-dark pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-white mb-6">Admin</h1>
          <p className="text-gray-300 mb-6">Admin utilities and reports.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link href="/admin/users" className="btn">User Management</Link>
            <Link href="/admin/shipments" className="btn">Shipment Explorer</Link>
            <Link href="/admin/seed" className="btn">Run Seeder (local only)</Link>
          </div>
          <div className="space-y-6">
            <Suspense fallback={<div className="text-gray-300">Loading reports...</div>}>
              {/* @ts-ignore */}
              <Reports />
            </Suspense>
          </div>
        </div>
      </div>
  );
}
