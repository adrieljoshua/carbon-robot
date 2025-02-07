'use client'
import SideBar from "@/components/user-defined/SideBar";
import TopBar from "@/components/user-defined/TopBar";
import LocationPicker from "@/components/user-defined/LocationMarker";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { Context } from "@/context/Context";
import { CustomLocation } from "@/types/types";

const RegisterCompany = () => {
    const [isClient, setIsClient] = useState(false);
    const { toast } = useToast()
    const [companyName, setCompanyName] = useState<string>(""); // ✅ Explicitly define as string
    const [location, setLocation] = useState<CustomLocation | null>(null); // ✅ Ensure CustomLocation is defined
    const { setFormData } = useContext(Context);
    const router = useRouter();

     useEffect(() => {
        setIsClient(true); // Set to true after the component has mounted
    }, []);

    if (!isClient) {
        return null; // Prevent rendering on the server
    }
    
    const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setFormData({ companyName, location });
    toast({ title: "Company Successfully Registered", description: `Company Name: ${companyName}`});
    router.push("/dashboard");
    };


    return (
      <div className="flex z-0 flex-col">
        <TopBar />
        <div className="flex">
          <SideBar />
          <div className="flex flex-col items-center mt-10 w-full">
            <h1 className="text-3xl font-syne font-bold mb-10">REGISTER COMPANY</h1>
            <form onSubmit={handleSubmitClick}>
              <div className="max-w-2xl min-w-96 rounded-lg p-6 border-2 border-black bg-white mb-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
                hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] gap-y-3 active:translate-x-0 active:translate-y-0 flex flex-col items-center">
                <h2 className="text-2xl font-syne font-semibold">Enter Company Name</h2>
                <Input id="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full" />
                <h2 className="text-2xl font-syne font-semibold mt-4">Select Location</h2>
                <div className="max-w-md min-w-96"> <LocationPicker onLocationSelect={(location: CustomLocation | null) => setLocation(location)} /> </div>
                {companyName && ( <Button type="submit" className="font-syne mt-4"> Register Company </Button> )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegisterCompany;