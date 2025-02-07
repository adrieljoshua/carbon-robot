import OfferCard from "@/components/user-defined/OfferCard";
import { JSX } from "react";
import { IconType } from "react-icons";

export interface CompanyProps {
  id: number;
  location: string;
  name: string;
  carbonCredits: number;
  rank: number | null;
  previousRank: number | null;
  carbonEmissions: number | null;
  ecoscore: number | null;
  creditHistory: CreditTransaction[];
  scanHistory: ScanReport[];
  currentActiveDevices: Device[];
}

export interface CompanyListProps extends CompanyProps {
}

export interface ScanReport {
  hash: string;
  date: string;
  emissionRate: number;
}

export interface Device {
  id: string;
  name: string;
  photoUrl: string;
  model: string;
  state: string;
  description: string;
}

export interface CreditTransaction {
  hash : string;
  date: string;
  amount: string;
  type: string;
  otherParty: string;
}


export interface CompanyCardProps {
  company: CompanyProps;  // This is the prop for the company details
  logo: IconType;  // This is the prop for the logo icon
  onViewCompany: ()=>void// This is the prop for the view company function
}

export interface DisplayCompanyProps {
  company: CompanyProps;
}
export interface CustomLocation {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
