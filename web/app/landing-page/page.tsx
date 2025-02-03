import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, Monitor } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Companies from "@/components/sections/Companies";
import YourCompany from "@/components/sections/YourCompany";


const LandingPage = () => {
  
  return (
    <div className="flex h-screen">
      
      {/* Main Layout */}
      <div className="flex flex-col flex-1">
        
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b-2 border-black">
          <Image src={Logo} alt="Logo" width={60} height={60} className="" />
          <Button className="rounded-3xl text-xs" name="0x41545.....14535" />
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:flex w-64 p-4 bg-white border-r-2 border-black flex-col gap-y-6">
            <Button className="text-sm text-white font-syne w-full">Register Company</Button>
          </aside>

          {/* Content Area */}
          <main className="flex flex-col items-center font-syne w-full px-6">
          <Tabs defaultValue="companies" className="mt-8 w-full max-w-[calc(100vw-300px)]"> 
            <TabsList className="w-full ml-8 flex justify-start gap-4">
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="your-company">Your Company</TabsTrigger>
              <TabsTrigger value="buy-credits">Buy Credits</TabsTrigger>
            </TabsList>
    
            <TabsContent value="companies" className="mt-8"><Companies/></TabsContent>
            <TabsContent value="your-company"><YourCompany/></TabsContent>
            <TabsContent value="buy-credits">Change your email here.</TabsContent>
          </Tabs>
        </main>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;
