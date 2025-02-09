"use client";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/utils/context/WalletContext";
import { Context } from "@/context/Context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LocationPicker from "@/components/user-defined/LocationMarker";
import SideBar from "@/components/user-defined/SideBar";
import TopBar from "@/components/user-defined/TopBar";
import { useToast } from "@/hooks/use-toast";
import { CustomLocation } from "@/types/types";
import { getCompanyData } from "@/utils/contracts/getters";
import { createCompany } from "@/utils/contracts/setters";

const RegisterCompany: React.FC = () => {
  const { walletAccount } = useWallet();
  const { toast } = useToast();
  const { setFormData } = useContext(Context);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState<CustomLocation | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!companyName || !location) {
      toast({
        title: "Error",
        description: "Please enter all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const emissionsAmount = { low: 0, high: 0 };
      const coordinates = `${location?.coordinates.lat.toFixed(
        2
      )},${location?.coordinates.lng.toFixed(2)}`;
      const tx = await createCompany(companyName, coordinates, emissionsAmount);

      if (!tx || !walletAccount) {
        throw new Error("Transaction failed or wallet not connected");
      }

      const response = await walletAccount.execute(tx);
      console.log("Transaction response:", response);

      const companyData = await getCompanyData(tx.contractAddress);

      const formData = {
        address: tx.contractAddress,
        companyName,
        location,
        ecoScore: companyData.ecoScore,
        carbonEmissions: companyData.carbonEmissions,
        credits: companyData.credits,
      };

      setFormData(formData);

      toast({
        title: "Company Successfully Registered",
        description: `Company Name: ${companyName}`,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering company:", error);
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  return (
    <div className="flex z-0 flex-col">
      <TopBar />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col items-center mt-10 w-full">
          <h1 className="text-3xl font-syne font-bold mb-10">
            REGISTER COMPANY
          </h1>

          <form onSubmit={handleSubmitClick}>
            <div
              className="max-w-2xl min-w-96 rounded-lg p-6 border-2 border-black bg-white mb-10 
                          shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
                          hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] 
                          active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 
                          flex flex-col items-center gap-y-3"
            >
              <h2 className="text-2xl font-syne font-semibold">
                Enter Company Name
              </h2>
              <Input
                id="companyName"
                type="text"
                value={companyName}
                onChange={handleInputChange}
                className="w-full"
              />

              <h2 className="text-2xl font-syne font-semibold mt-4">
                Select Location
              </h2>
              <div className="max-w-md min-w-96">
                <LocationPicker
                  onLocationSelect={(loc: CustomLocation | null) =>
                    setLocation(loc)
                  }
                />
              </div>

              {companyName && (
                <Button type="submit" className="font-syne mt-4">
                  Register Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
