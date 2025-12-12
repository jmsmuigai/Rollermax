"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

type UserDoc = {
  uid: string;
  email?: string | null;
  name?: string | null;
  provider?: string;
  createdAt?: any;
  updatedAt?: any;
};

export default function AdminUsers() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentEmail(u?.email ?? null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const adminEnv = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    setAllowed(currentEmail ? adminEnv.includes(currentEmail.toLowerCase()) : false);
  }, [currentEmail]);

  useEffect(() => {
    if (!allowed) return;
    setLoading(true);
    (async () => {
      try {
        const q = collection(db, 'users');
        const snap = await getDocs(q);
        const list: UserDoc[] = snap.docs.map(d => d.data() as UserDoc);
        setUsers(list);
      } catch (e) {
        console.error('Failed to load users', e);
      } finally { setLoading(false); }
    })();
  }, [allowed]);

  if (!currentEmail) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">Please sign in to view registered users.</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">Access denied for {currentEmail}. Contact site admin to enable access.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Registered Users</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Email</th>
                <th className="py-2">Name</th>
                <th className="py-2">Provider</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid} className="odd:bg-white even:bg-gray-50">
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.name || '—'}</td>
                  <td className="py-2">{u.provider || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
