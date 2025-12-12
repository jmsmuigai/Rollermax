import AdminUsers from '../../components/AdminUsers';

export const metadata = {
  title: 'Admin - Users'
};

export default function AdminPage() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-white via-rose-50 to-white">
      <div className="container mx-auto">
        <AdminUsers />
      </div>
    </main>
  );
}
