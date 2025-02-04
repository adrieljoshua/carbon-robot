'use client'
import SideBar from "@/components/user-defined/SideBar";
import TopBar from "@/components/user-defined/TopBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [loaded, setLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  
  const fetchAddress = async (lat, lng) => {
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
    console.log('Address:', apiKey);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        fetchAddress(lat, lng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    );
  };

  return (
    <div>
      <MapContainer center={[13.044095, 80.241194]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
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