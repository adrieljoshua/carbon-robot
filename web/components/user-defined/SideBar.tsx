'use client'
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import DeviceDropdown from "./DevicesDropdown";
import Modal from "./Modal";

const SideBar = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showDevices, setShowDevices] = useState(false);
    const router = useRouter();
    const handleRegisterCompany = () => {
        router.push("/register-company");
    }

    function handleKeyPress(): void {
        if(showDevices){
            setShowDevices(false);
        }
        else{
            setShowDevices(true);
        }
    }

    const sortedCompanies = companiesList
  .sort((a, b) => {
    if (b.ecoscore === a.ecoscore) {
      return a.carbonEmissions - b.carbonEmissions; // If ecoScore is equal, rank by carbonEmissions
    }
    return b.ecoscore - a.ecoscore; // Otherwise, rank by ecoScore
  })
  .map((company, index) => ({
    ...company,
    rank: index + 1
  }));

    return(    
    <>  
        <aside className="hidden min-h-screen z-9 md:flex w-64 p-4 border-black items-center bg-white border-r-2 flex-col gap-y-6">
            <Button className=" text-white text-sm font-syne w-full" onClick={handleRegisterCompany}>REGISTER COMPANY</Button>
            <Button className=" text-black text-sm hover:bg-gray-100 
            font-syne bg-white border-2 border-black w-full" onClick={()=>setShowLeaderboard(true)}>ECOLEADERBOARD 🎖️</Button>
            <div className="flex items-center font-syne gap-x-2 hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer" 
            onClick={()=>handleKeyPress()}><span>VIEW DEVICES </span><ArrowDown size={15}/></div>
            {showDevices && <DeviceDropdown onClose={()=>setShowDevices(false)}  />}
        </aside>
        {showLeaderboard && 
  <Modal 
    title="🌱 ECO LEADERBOARD" 
    onClose={() => setShowLeaderboard(false)} 
    className="w-[800px] max-w-4xl no-scrollbar"
  >
    <ul className="w-full">
      <li>
        <div className="grid grid-cols-4 justify-evenly text-center py-4 border-b border-gray-300 font-semibold">
          <span>Rank</span>
          <span>Company Name</span>
          <span>EcoScore</span>
          <span>Carbon Emissions</span>
        </div>
      </li>
      {sortedCompanies.map((entry, index) => {
        let medal = "";
        if (index === 0) medal = "🏅"; // Gold for rank 1
        else if (index === 1) medal = "🥈"; // Silver for rank 2
        else if (index === 2) medal = "🥉"; // Bronze for rank 3

        return (
          <li 
            key={index} 
            className="grid grid-cols-4 justify-evenly text-center py-4 border-b border-gray-300"
          >
            <span className="font-mono">
              {medal} 
               {entry.rank > 3
                ? entry.rank
                : null}
            </span>
            <span>{entry.name}</span>
            <span className="text-gray-500">{entry.ecoscore}</span>
            <span className="text-gray-500">{entry.carbonEmissions}</span>
          </li>
        );
      })}
    </ul>
  </Modal>
}

    </>
    )
}




const companiesList = [
    { id: 1, name: "ABC Corp", leaderboardRank: 1, prevLeaderboardRank: 3, carbonEmissions: 1200, ecoscore: 95 },
    { id: 2, name: "GreenTech Ltd", leaderboardRank: 2, prevLeaderboardRank: 1, carbonEmissions: 1100, ecoscore: 94 },
    { id: 3, name: "EcoInnovators", leaderboardRank: 3, prevLeaderboardRank: 5, carbonEmissions: 1300, ecoscore: 93 },
    { id: 4, name: "Sustainify Inc", leaderboardRank: 4, prevLeaderboardRank: 4, carbonEmissions: 1500, ecoscore: 91 },
    { id: 5, name: "NatureFirst", leaderboardRank: 5, prevLeaderboardRank: 2, carbonEmissions: 1250, ecoscore: 90 },
    { id: 6, name: "CarbonZero", leaderboardRank: 6, prevLeaderboardRank: 7, carbonEmissions: 1700, ecoscore: 88 },
    { id: 7, name: "Renewable Solutions", leaderboardRank: 7, prevLeaderboardRank: 8, carbonEmissions: 1900, ecoscore: 87 },
    { id: 8, name: "EarthGuard", leaderboardRank: 8, prevLeaderboardRank: 10, carbonEmissions: 2000, ecoscore: 85 },
    { id: 9, name: "EcoFuture", leaderboardRank: 9, prevLeaderboardRank: 6, carbonEmissions: 1400, ecoscore: 84 },
    { id: 10, name: "GreenWave", leaderboardRank: 10, prevLeaderboardRank: 12, carbonEmissions: 2100, ecoscore: 83 },
    { id: 11, name: "SolarRise", leaderboardRank: 11, prevLeaderboardRank: 11, carbonEmissions: 1600, ecoscore: 82 },
    { id: 12, name: "WindEdge", leaderboardRank: 12, prevLeaderboardRank: 9, carbonEmissions: 1800, ecoscore: 81 },
    { id: 13, name: "GreenSpark", leaderboardRank: 13, prevLeaderboardRank: 13, carbonEmissions: 2200, ecoscore: 79 },
    { id: 14, name: "EcoSavvy", leaderboardRank: 14, prevLeaderboardRank: 14, carbonEmissions: 2300, ecoscore: 78 },
    { id: 15, name: "BlueEarth", leaderboardRank: 15, prevLeaderboardRank: 15, carbonEmissions: 2500, ecoscore: 77 },
    { id: 16, name: "SmartCarbon", leaderboardRank: 16, prevLeaderboardRank: 16, carbonEmissions: 2600, ecoscore: 76 },
    { id: 17, name: "GreenEra", leaderboardRank: 17, prevLeaderboardRank: 18, carbonEmissions: 2700, ecoscore: 75 },
    { id: 18, name: "EcoRevolution", leaderboardRank: 18, prevLeaderboardRank: 17, carbonEmissions: 2800, ecoscore: 74 },
    { id: 19, name: "PlanetPositive", leaderboardRank: 19, prevLeaderboardRank: 20, carbonEmissions: 2900, ecoscore: 73 },
    { id: 20, name: "GreenPledge", leaderboardRank: 20, prevLeaderboardRank: 19, carbonEmissions: 3000, ecoscore: 72 },
  ]; 

export default SideBar;