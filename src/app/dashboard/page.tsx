'use client';  // Esto indica que es un componente cliente

import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { fetchBookingsByUser, fetchGeneralDashboard, fetchPlacesInUserNotHaveBooking } from '@/app/lib/data';
import BookingUser from '@/app/ui/dashboard/booking-user';
import PlacesWithouBooking from '@/app/ui/dashboard/places-without-booking';
import { BookingUserSkeleton } from '../ui/skeletons';
type DashboardProps = {
    "places": number | string,
    "myBookings": number | string,
    "users": number | string
}
export default function Page() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardProps | null>(null);
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);


  const loadBookings = async () => {
    const data = await fetchBookingsByUser();
    setBookings(data);
  };
  const loadPlaces = async () => {
    const data = await fetchPlacesInUserNotHaveBooking();
    setPlaces(data);
  };
    const fetchData = async () => {
        const data = await fetchGeneralDashboard();
        setDashboard(data);
    };
    useEffect(() => {
        fetchData();
        loadPlaces();
        loadBookings();
    }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      fetchData();
      loadPlaces();
      loadBookings();
    }
  }, [router]);

  const handleRefresh = async () => {
    try {
        fetchData();
        loadPlaces();
        loadBookings();
    } catch (error) {
      console.error('Error recargando las reservas:', error);
    }
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Lugares" value={dashboard?.places} type="collected" />
        <Card title="Mis Reservas" value={dashboard?.myBookings} type="pending" />
        <Card title="Usuarios" value={dashboard?.users} type="pending" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<BookingUserSkeleton />}>
          <BookingUser bookings={bookings} handleRefresh={handleRefresh} />
        </Suspense>
        <Suspense fallback={<BookingUserSkeleton />}>
          <PlacesWithouBooking places={places} handleRefresh={handleRefresh} />
        </Suspense>
      </div>
    </main>
  );
}
