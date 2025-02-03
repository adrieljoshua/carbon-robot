import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, Monitor } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Companies from "@/components/sections/Companies";
import YourCompany from "@/components/sections/YourCompany";


const LandingPage = () => {

  const devices = [
    { id: 1, name: "MacBook Pro", image: "/api/placeholder/200/150" },
    { id: 2, name: "iPhone 13", image: "/api/placeholder/200/150" },
    { id: 3, name: "iPad Air", image: "/api/placeholder/200/150" }
  ];
  
  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 bg-white border-r border-black">
          <nav className="flex flex-col gap-4">
            <Button variant="outline" className="w-full text-left">View All Companies</Button>
            <Button variant="outline" className="w-full text-left">Buy Credits</Button>
            <Button variant="outline" className="w-full text-left">Your Company</Button>
            <Button variant="outline" className="w-full text-left">Leaderboard</Button>
            <Button variant="default" className="w-full">Register New Company</Button>
            <Button variant="default" className="w-full">Your Devices</Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Layout */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 border-b-2 border-black">
          <Image src={Logo} alt="Logo" width={60} height={60} className="ml-10" />
          <Button className="rounded-3xl text-xs" name="0x41545.....14535" />
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:flex w-64 p-4 bg-white border-r-2 border-black flex-col gap-y-6">
      <Button 
        className="text-sm text-white font-syne w-full" 
      >Register Company</Button>
      
      
    </aside>

          {/* Content Area */}
          <main className="flex flex-col items-center font-syne text-center w-full px-6">
  <Tabs defaultValue="companies" className="mt-8 w-full max-w-[calc(100vw-300px)]"> 
    <TabsList className="w-full flex justify-center gap-4">
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
