'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Companies from "@/components/sections/Companies";
import YourCompany from "@/components/sections/YourCompany";
import CreditSale from "@/components/sections/CreditSale";
import TopBar from "@/components/user-defined/TopBar";
import SideBar from "@/components/user-defined/SideBar";
import Verify from "@/components/sections/Verify";``

const DashBoard = () => {
  
  
  
  return (
    
    <>
      {/* Main Layout */}
      <div className="flex flex-col no-scrollbar overflow-y-auto" 
       >
        
        {/* Top Bar */}
        <TopBar />

        {/* Main Content Layout */}
        <div className="flex flex-row w-full h-full no-scrollbar overflow-y-auto" >
          <SideBar />

          {/* Content Area */}
          <main className="flex flex-col items-center font-syne h-full w-full px-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <Tabs defaultValue="your-company" className="mt-8 w-full max-w-[calc(100vw-300px)]"> 
            <TabsList className="w-full ml-8 flex justify-start gap-4">
              <TabsTrigger value="your-company">Your Company</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="buy-credits">Buy/Sell Credits</TabsTrigger>
              <TabsTrigger value="verify">Verify</TabsTrigger>
            </TabsList>
    
            <TabsContent value="companies" className="mt-8"><Companies/></TabsContent>
            <TabsContent value="your-company"><YourCompany/></TabsContent>
            <TabsContent value="buy-credits"><CreditSale/></TabsContent>
            <TabsContent value="verify"><Verify/></TabsContent>
          </Tabs>
        </main>
        </div>
      </div>
    </>
  );
};


export default DashBoard;
