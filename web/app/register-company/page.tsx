'use client'
import SideBar from "@/components/user-defined/SideBar";
import TopBar from "@/components/user-defined/TopBar";
import LocationPicker from "@/components/user-defined/LocationMarker";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { Context } from "@/context/Context";

const RegisterCompany = () => {
    const { toast } = useToast()
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState(null);
    const { formData, setFormData } = useContext(Context);
    const router = useRouter();
    
    const handleSubmitClick = (e) => {
      e.preventDefault();
      setFormData({ companyName, location });
      toast({ title: "Company Successfully Registered", description: `Company Name: ${companyName}` })
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
                <div className="max-w-md min-w-96"> <LocationPicker onLocationSelect={setLocation} /> </div>
                {companyName && ( <Button type="submit" className="font-syne mt-4"> Register Company </Button> )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegisterCompany;