"use client"; // Para habilitar interactividad en este archivo

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { createBooking } from '@/app/lib/data';
import { BuildingLibraryIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import ModalAddBooking from "./modal-add-booking"

type PlaceProps = {
  name: string;
  address: string;
  id: number;
};
type BookingUserProps = {
  places: PlaceProps[],
  handleRefresh: () => void
}
export default function BookingUser({places, handleRefresh}: BookingUserProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actualPlace, setActualPlace] = useState<PlaceProps | undefined>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReservationSubmit = async (data: { numberOfPeople: number; date: string; hour: string }) => {
    const response = await createBooking({...data, placeId: actualPlace?.id})
    if(response) handleRefresh()
  };

  const handleNewBooking = async (place: PlaceProps) => {
    openModal()
    setActualPlace(place)
  };
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Lugares donde aún no reservas
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {places.map((place: PlaceProps, i) => {
            return (
              <div
                key={place.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <BuildingLibraryIcon width={32} height={32} />
                  <div className="min-w-0 ml-4">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {place?.name}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {place?.address}
                </p>
                <PlusCircleIcon
                  onClick={() => handleNewBooking(place)}
                  className="h-8 w-8 text-gray-500 hover:text-green-500 transition-colors duration-200 cursor-pointer" />
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado justo ahora</h3>
        </div>
      </div>
      <ModalAddBooking isOpen={isModalOpen} onClose={closeModal} onSubmit={handleReservationSubmit} actualPlace={actualPlace} />
    </div>
  );
}
