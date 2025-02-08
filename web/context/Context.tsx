'use client';

import { createContext, useState, ReactNode } from 'react';

// Define interface for form data
interface FormData {
   address: string;
   companyName: string;
   location: any | null;
   ecoScore: number | null;
    carbonEmissions: number | null;
    credits: number | null;
}

// Define interface for the selected device
interface DeviceData {
  name: string;
  photoUrl: string;
  id: string;
}

// Define interface for context value
interface ContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
  selectedDeviceData: DeviceData | null;
  setSelectedDeviceData: (device: DeviceData | null) => void;
}

// Create context with initial values
export const Context = createContext<ContextType>({
  formData: { address:'', companyName: '', location: null, ecoScore: null, carbonEmissions: null, credits: null },
  setFormData: () => {},
  selectedDeviceData: { name: '', photoUrl: '', id: '' },
  setSelectedDeviceData: () => {},
});

// Define props interface for DataProvider
interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    address: '',
    companyName: '',
    location: null,
    ecoScore: null,
    carbonEmissions: null,
    credits: null
  });

  const [selectedDeviceData, setSelectedDeviceData] = useState<DeviceData | null>(null);

  return (
    <Context.Provider 
      value={{ 
        formData, 
        setFormData, 
        selectedDeviceData, 
        setSelectedDeviceData 
      }}
    >
      {children}
    </Context.Provider>
  );
}