'use client'
import { useState } from "react";
import CompanyCard from "../user-defined/CompanyCard";
import { FaBriefcase, FaBuilding, FaBusinessTime, FaChartLine, FaClipboard, FaHandshake, FaIndustry, FaMoneyBillWave, FaUniversity, FaUsers } from "react-icons/fa";
import DisplayCompany from "./DisplayCompany";

const Companies = () => {
  const [companies, setCompanies] = useState(companiesList);
  const [selectedCompany, setSelectedCompany] = useState<null | { id: number }> (null); // State to track selected company

  // Function to handle company selection
  const handleViewCompany = (companyId: number) => {
    setSelectedCompany(companies.find(company => company.id === companyId) || null);
  };

  return (
    <div>
      {/* Conditional Rendering */}
      {selectedCompany ? (
        <DisplayCompany company={selectedCompany} /> // Pass the selected company to DisplayCompany
      ) : (
        <div className="flex flex-wrap justify-center mb-10 gap-x-4 w-full gap-y-6 mt-10">
          {companies.map((company, index) => (
            <CompanyCard
              key={company.id}
              company={company}
              logo={iconList[index % iconList.length]}
              onViewCompany={() => handleViewCompany(company.id)} // Pass the company ID to the handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

const iconList = [ FaBuilding, FaIndustry, FaBusinessTime, FaChartLine, FaBriefcase, FaUsers, FaUniversity,     
                    FaClipboard, FaMoneyBillWave, FaHandshake ];

const companiesList = [
  {
    id: 1,
    name: "EcoTech Solutions",
    carbonCredits: 145,
    leaderboardRank: 45,
    prevLeaderboardRank: 40,
    carbonEmissions: 1200,
    ecoscore: 85,
    creditHistory: [
      { date: "2025-02-01", amount: "+12", type: "Credit Purchase", id: "#TXN123", otherParty: "XYZ Company" },
      { date: "2024-08-28", amount: "-15", type: "Emission Offset", id: "#TXN456", otherParty: "SmartTech Solutions" },
      { date: "2024-01-20", amount: "+24", type: "Credit Purchase", id: "#TXN789", otherParty: "EcoTech Innovations" },
      { date: "2023-06-10", amount: "-5", type: "Emission Offset", id: "#TXN101", otherParty: "GreenTech Inc" },
      { date: "2022-12-25", amount: "-15", type: "Emission Offset", id: "#TXN113", otherParty: "GreenTech Inc" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 2,
    name: "Green Innovations Ltd",
    carbonCredits: 300,
    leaderboardRank: 20,
    prevLeaderboardRank: 25,
    carbonEmissions: 800,
    ecoscore: 92,
    creditHistory: [
      { date: "2025-01-15", amount: "+30", type: "Credit Purchase", id: "#TXN321", otherParty: "TechGlobal Solutions" },
      { date: "2024-12-02", amount: "-25", type: "Emission Offset", id: "#TXN654", otherParty: "EcoFuture Tech" },
      { date: "2024-09-10", amount: "+35", type: "Credit Purchase", id: "#TXN987", otherParty: "ClimateTech Solutions" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 3,
    name: "EcoVision Corp",
    carbonCredits: 500,
    leaderboardRank: 10,
    prevLeaderboardRank: 15,
    carbonEmissions: 1500,
    ecoscore: 75,
    creditHistory: [
      { date: "2025-02-01", amount: "+50", type: "Credit Purchase", id: "#TXN789", otherParty: "SolarTech Inc" },
      { date: "2024-08-10", amount: "-30", type: "Emission Offset", id: "#TXN456", otherParty: "WindCorp Ltd" },
      { date: "2024-04-05", amount: "+60", type: "Credit Purchase", id: "#TXN123", otherParty: "TechGreen Solutions" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 4,
    name: "SustainTech Solutions",
    carbonCredits: 275,
    leaderboardRank: 18,
    prevLeaderboardRank: 22,
    carbonEmissions: 1100,
    ecoscore: 82,
    creditHistory: [
      { date: "2025-01-10", amount: "+25", type: "Credit Purchase", id: "#TXN135", otherParty: "GreenSolutions" },
      { date: "2024-11-20", amount: "-10", type: "Emission Offset", id: "#TXN246", otherParty: "CarbonTech" },
      { date: "2024-07-15", amount: "+20", type: "Credit Purchase", id: "#TXN357", otherParty: "EcoEnergy" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 5,
    name: "FutureTech Innovations",
    carbonCredits: 320,
    leaderboardRank: 12,
    prevLeaderboardRank: 10,
    carbonEmissions: 950,
    ecoscore: 88,
    creditHistory: [
      { date: "2025-01-15", amount: "+40", type: "Credit Purchase", id: "#TXN111", otherParty: "NextGen Energy" },
      { date: "2024-10-05", amount: "-20", type: "Emission Offset", id: "#TXN222", otherParty: "SmartEco" },
      { date: "2024-03-25", amount: "+45", type: "Credit Purchase", id: "#TXN333", otherParty: "TechRenew" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },{
  id: 6,
    name: "CleanTech Global",
    carbonCredits: 400,
    leaderboardRank: 8,
    prevLeaderboardRank: 10,
    carbonEmissions: 1300,
    ecoscore: 90,
    creditHistory: [
      { date: "2025-01-30", amount: "+50", type: "Credit Purchase", id: "#TXN555", otherParty: "GreenFuture Solutions" },
      { date: "2024-09-18", amount: "-40", type: "Emission Offset", id: "#TXN666", otherParty: "EcoWorld Innovations" },
      { date: "2024-05-12", amount: "+60", type: "Credit Purchase", id: "#TXN777", otherParty: "SolarWave Inc." },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 7,
    name: "GreenTech Innovations",
    carbonCredits: 210,
    leaderboardRank: 35,
    prevLeaderboardRank: 34,
    carbonEmissions: 1050,
    ecoscore: 80,
    creditHistory: [
      { date: "2025-01-25", amount: "+15", type: "Credit Purchase", id: "#TXN888", otherParty: "EcoSolutions" },
      { date: "2024-12-10", amount: "-20", type: "Emission Offset", id: "#TXN999", otherParty: "SolarTech" },
      { date: "2024-06-05", amount: "+30", type: "Credit Purchase", id: "#TXN1010", otherParty: "SmartGreen Technologies" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 8,
    name: "Renewable Power Inc",
    carbonCredits: 600,
    leaderboardRank: 3,
    prevLeaderboardRank: 5,
    carbonEmissions: 750,
    ecoscore: 95,
    creditHistory: [
      { date: "2025-01-22", amount: "+100", type: "Credit Purchase", id: "#TXN202", otherParty: "GreenEnergy Co." },
      { date: "2024-11-12", amount: "-50", type: "Emission Offset", id: "#TXN303", otherParty: "WindPower Solutions" },
      { date: "2024-07-01", amount: "+80", type: "Credit Purchase", id: "#TXN404", otherParty: "EcoWind Inc." },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 9,
    name: "TechRenewables Ltd",
    carbonCredits: 275,
    leaderboardRank: 16,
    prevLeaderboardRank: 9,
    carbonEmissions: 850,
    ecoscore: 85,
    creditHistory: [
      { date: "2025-02-01", amount: "+20", type: "Credit Purchase", id: "#TXN567", otherParty: "EcoPlanet Solutions" },
      { date: "2024-10-10", amount: "-15", type: "Emission Offset", id: "#TXN678", otherParty: "TechSolar" },
      { date: "2024-06-15", amount: "+25", type: "Credit Purchase", id: "#TXN789", otherParty: "SolarEdge Innovations" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 10,
    name: "EcoWave Technologies",
    carbonCredits: 330,
    leaderboardRank: 15,
    prevLeaderboardRank: 20,
    carbonEmissions: 1000,
    ecoscore: 89,
    creditHistory: [
      { date: "2025-01-28", amount: "+40", type: "Credit Purchase", id: "#TXN901", otherParty: "GreenSolutions" },
      { date: "2024-09-09", amount: "-30", type: "Emission Offset", id: "#TXN202", otherParty: "EcoPower" },
      { date: "2024-03-21", amount: "+35", type: "Credit Purchase", id: "#TXN303", otherParty: "CleanTech Solutions" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 11,
    name: "SolarWave Solutions",
    carbonCredits: 500,
    leaderboardRank: 7,
    prevLeaderboardRank: 9,
    carbonEmissions: 1150,
    ecoscore: 91,
    creditHistory: [
      { date: "2025-02-03", amount: "+60", type: "Credit Purchase", id: "#TXN111", otherParty: "PowerGreen" },
      { date: "2024-11-15", amount: "-45", type: "Emission Offset", id: "#TXN222", otherParty: "EcoSolar Inc." },
      { date: "2024-05-08", amount: "+50", type: "Credit Purchase", id: "#TXN333", otherParty: "EcoPower Systems" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  },
  {
    id: 12,
    name: "TechEco Innovators",
    carbonCredits: 375,
    leaderboardRank: 13,
    prevLeaderboardRank: 11,
    carbonEmissions: 980,
    ecoscore: 86,
    creditHistory: [
      { date: "2025-01-12", amount: "+30", type: "Credit Purchase", id: "#TXN444", otherParty: "EnergyTech" },
      { date: "2024-08-01", amount: "-20", type: "Emission Offset", id: "#TXN555", otherParty: "SolarSys" },
      { date: "2024-04-20", amount: "+35", type: "Credit Purchase", id: "#TXN666", otherParty: "GreenWind Technologies" },
    ],
    currentActiveDevices: [
      { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured" },
      { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured" },
      { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured" },
      { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured" },
    ]
  }
                    ];
                    export default Companies;
