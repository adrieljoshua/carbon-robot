'use client';

import { createContext, useState } from 'react';

export const FormContext = createContext({
  formData: { companyName: '', location: null },
  setFormData: (p0: { companyName: string; location: null; }) => {},
});

export function DataProvider({ children }) {
  const [formData, setFormData] = useState({
    companyName: '',
    location: null,
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
