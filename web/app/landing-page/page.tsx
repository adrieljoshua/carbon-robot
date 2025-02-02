import NeoButton from "../../components/Button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const LandingPage = () => {
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
          <NeoButton className="rounded-3xl text-xs" name="0x41545.....14535" />
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:flex w-64 p-4 bg-inherit border-r-2 border-black flex-col gap-x-4 gap-y-6">
            <NeoButton name="REGISTER COMPANY" className="text-sm font-syne" />
            
            {/* Dropdown for Workspace Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger name="VIEW DEVICES" className=" text-sm flex justify-center font-syne"/>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


          </aside>

          {/* Content Area */}
          <main className="flex  flex-col items-center font-tactical text-center">
            <Tabs defaultValue="account" className="mt-8 px-10 w-[800px]">
              <TabsList className="">
                <TabsTrigger value="companies" >Companies</TabsTrigger>
                <TabsTrigger value="your-company">Your Company</TabsTrigger>
                <TabsTrigger value="buy-credits">Buy Credits</TabsTrigger>
              </TabsList>
                <TabsContent value="companies">Make changes to your account here.</TabsContent>
                <TabsContent value="your-company">Change your password here.</TabsContent>
                <TabsContent value="buy-credits">Change your email here.</TabsContent>
            </Tabs>

          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
