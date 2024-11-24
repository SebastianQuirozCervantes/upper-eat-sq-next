"use client"; // Para habilitar interactividad en este archivo

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { deleteBookingById } from '@/app/lib/data';
import {
  ClipboardDocumentCheckIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';
type BookingProps = {
  place: {name: string};
  date: string;
  hour: string;
  numberOfPeople: number;
  id: number;
};
type BookingUserProps = {
  bookings: BookingProps[],
  handleRefresh: () => void
}
export default function BookingUser({bookings, handleRefresh}: BookingUserProps) {
  const handleDelete = async (id: number) => {
    try {
      await deleteBookingById(id);
      handleRefresh()
    } catch (error) {
      console.error('Error eliminando la reserva:', error);
    }
  };

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Reservas</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {bookings.map((booking: BookingProps, i) => (
            <div
              key={booking.id}
              className={clsx('flex flex-row items-center justify-between py-4', {
                'border-t': i !== 0,
              })}
            >
              <div className="flex items-center">
                <ClipboardDocumentCheckIcon width={32} height={32} />
                <div className="min-w-0 ml-4">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {booking?.place?.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    Cantidad de personas: {booking?.numberOfPeople}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
              >
                {booking?.date} {booking?.hour}
              </p>
              <XCircleIcon
                onClick={() => handleDelete(booking.id)}
                className="h-8 w-8 text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
              />
            </div>
          ))}
          {bookings?.length == 0 && (<p className='text-center'>No hay reservas</p>)}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon
            onClick={handleRefresh}
            className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer"
          />
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  );
}
