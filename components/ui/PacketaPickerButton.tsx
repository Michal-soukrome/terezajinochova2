"use client";

import { useState } from "react";

export interface PacketaPickupPoint {
  id: string;
  name: string;
  nameStreet: string;
  place: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

interface PacketaPickerButtonProps {
  locale: string;
  onPickupSelected: (pickup: PacketaPickupPoint) => void;
  className?: string;
  children?: React.ReactNode;
}

export function PacketaPickerButton({
  locale,
  onPickupSelected,
  className = "btn btn-primary",
  children,
}: PacketaPickerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const openPacketaWidget = () => {
    setIsLoading(true);
    
    // @ts-ignore - Packeta widget is loaded globally
    if (typeof window !== 'undefined' && window.Packeta) {
      // @ts-ignore
      window.Packeta.Widget.pick(
        process.env.NEXT_PUBLIC_PACKETA_API_KEY || '',
        (point: any) => {
          setIsLoading(false);
          if (point) {
            const pickupPoint: PacketaPickupPoint = {
              id: point.id,
              name: point.name,
              nameStreet: point.nameStreet || point.name,
              place: point.place || point.city,
              street: point.street,
              city: point.city,
              zip: point.zip,
              country: point.country,
            };
            onPickupSelected(pickupPoint);
          }
        },
        {
          country: locale === 'cs' ? 'cz' : 'sk',
          language: locale === 'cs' ? 'cs' : 'en',
        }
      );
    } else {
      console.error('Packeta widget not loaded');
      setIsLoading(false);
      alert(
        locale === 'cs'
          ? 'Widget pro výběr výdejního místa se nepodařilo načíst. Zkuste to prosím znovu.'
          : 'Failed to load pickup point selection widget. Please try again.'
      );
    }
  };

  return (
    <button
      onClick={openPacketaWidget}
      disabled={isLoading}
      className={className}
      type="button"
    >
      {isLoading
        ? locale === 'cs'
          ? 'Načítání...'
          : 'Loading...'
        : children ||
          (locale === 'cs' ? 'Vybrat výdejní místo' : 'Select Pickup Point')}
    </button>
  );
}
