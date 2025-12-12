"use client";

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type UserDoc = {
  uid: string;
  email?: string | null;
  name?: string | null;
  provider?: string;
  createdAt?: any;
};

export default function AdminUsers() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    (async () => {
      try {
        // Get ID token from current user
        const idToken = await currentUser.getIdToken();
        const functionUrl = process.env.NEXT_PUBLIC_FUNCTIONS_URL || 'https://us-central1-rollermax-courier.cloudfunctions.net';
        
        const res = await fetch(`${functionUrl}/listUsers`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `Failed to fetch users (${res.status})`);
        }

        const data = await res.json();
        setUsers(data.users || []);
      } catch (e) {
        console.error('Failed to load users', e);
        setError((e as Error).message);
      } finally { 
        setLoading(false); 
      }
    })();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">
        Please sign in to view registered users.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">Registered Users</h3>
      <p className="text-sm text-gray-600 mb-6">Signed in as: <span className="font-semibold">{currentUser.email}</span></p>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-roller-blue">
                <th className="py-3 px-2 font-semibold">Email</th>
                <th className="py-3 px-2 font-semibold">Name</th>
                <th className="py-3 px-2 font-semibold">Provider</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid} className="odd:bg-gray-50 even:bg-white border-b hover:bg-blue-50">
                  <td className="py-3 px-2">{u.email}</td>
                  <td className="py-3 px-2">{u.name || '—'}</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-gray-200 rounded">{u.provider || 'password'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-4">Total users: {users.length}</p>
        </div>
      ) : (
        <p className="text-gray-500">No users registered yet.</p>
      )}
    </div>
  );
}
