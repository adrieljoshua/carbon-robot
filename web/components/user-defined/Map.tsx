'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

interface MapProps {
  position: { lat: number, lng: number } | null;
  setPosition: (position: { lat: number, lng: number }) => void;
  address: string;
  fetchAddress: (lat: number, lng: number) => void;
}

const LocationMarker = ({ position, setPosition, address, fetchAddress }: MapProps) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      fetchAddress(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

const Map = ({ position, setPosition, address, fetchAddress }: MapProps) => {
  return (
    <MapContainer center={[13.044095, 80.241194]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker 
        position={position}
        setPosition={setPosition}
        address={address}
        fetchAddress={fetchAddress}
      />
    </MapContainer>
  );
};

export default Map;