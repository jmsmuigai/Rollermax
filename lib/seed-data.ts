import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SHIPMENTS = [
  { trackingNumber: 'RMX1001', status: 'Delivered', currentLocation: 'Mombasa', origin: 'Nairobi', destination: 'Mombasa', type: 'road' },
  { trackingNumber: 'RMX1002', status: 'In Transit', currentLocation: 'Nakuru', origin: 'Eldoret', destination: 'Nairobi', type: 'road' },
  { trackingNumber: 'RMX1003', status: 'Pending', currentLocation: 'Warehouse', origin: 'Kisumu', destination: 'Nairobi', type: 'air' },
  { trackingNumber: 'RMX1004', status: 'Delivered', currentLocation: 'Dubai', origin: 'Nairobi', destination: 'Dubai', type: 'air' },
  { trackingNumber: 'RMX1005', status: 'Delayed', currentLocation: 'Port', origin: 'China', destination: 'Nairobi', type: 'ocean' },
  { trackingNumber: 'RMX1006', status: 'In Transit', currentLocation: 'Thika', origin: 'Nairobi', destination: 'Garissa', type: 'road' },
  { trackingNumber: 'RMX1007', status: 'Delivered', currentLocation: 'London', origin: 'Nairobi', destination: 'London', type: 'air' },
  { trackingNumber: 'RMX1008', status: 'In Transit', currentLocation: 'Tana River', origin: 'Garissa', destination: 'Mombasa', type: 'road' },
  { trackingNumber: 'RMX1009', status: 'Pending', currentLocation: 'Sorting Center', origin: 'Nairobi', destination: 'New York', type: 'air' },
  { trackingNumber: 'RMX1010', status: 'Delivered', currentLocation: 'Nairobi', origin: 'Mombasa', destination: 'Nairobi', type: 'road' },
];

export async function seedShipments() {
  console.log('Seeding fake shipment data...');
  try {
    for (const ship of SHIPMENTS) {
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 5) + 2);
      
      await addDoc(collection(db, 'shipments'), {
        ...ship,
        createdAt: serverTimestamp(),
        estimatedDelivery: estimatedDelivery.toISOString(),
        history: [
          { status: 'Picked Up', location: ship.origin, timestamp: new Date().toISOString(), description: 'Package picked up from sender' },
          { status: ship.status, location: ship.currentLocation, timestamp: new Date().toISOString(), description: `Currently ${ship.status.toLowerCase()}` }
        ]
      });
    }
    console.log('Successfully seeded 10 shipments.');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
}
