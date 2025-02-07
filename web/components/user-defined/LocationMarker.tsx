'use client';

import { useEffect, useState } from "react";
import { CustomLocation } from "@/types/types";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(
  () => import('./Map'),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center border-2 border-black">Loading map...</div>
  }
);

interface LocationPickerProps {
  onLocationSelect: (location: CustomLocation | null) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [isClient, setIsClient] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setApiKey(process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || null);
  }, []);

  if (!isClient) {
    return <div className="h-[400px] w-full flex items-center justify-center border-2 border-black">Loading...</div>;
  }
  
  const fetchAddress = async (lat: number, lng: number) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const newAddress = data.results[0].formatted;
        setAddress(newAddress);
        onLocationSelect({ address: newAddress, coordinates: { lat, lng } });
      } else {
        setAddress('Address not found');
        onLocationSelect(null);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
      onLocationSelect(null);
    }
  };

  return (
    <div>
      <MapWithNoSSR 
        position={position}
        setPosition={setPosition}
        address={address}
        fetchAddress={fetchAddress}
      />
      {position && (
        <div className='flex flex-col items-center justify-center gap-y-3 p-6'>
          <h1 className='text-2xl border-4 rounded-xl border-black font-vt323 p-6 text-center'>
            {address}
          </h1>
          <div className='flex gap-x-4'>
            <p className='text-center font-syne'>Latitude: {position.lat.toFixed(4)}</p>
            <p className='text-center font-syne'>Longitude: {position.lng.toFixed(4)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;