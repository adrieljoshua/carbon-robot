'use client'
import { useState } from "react";
import CompanyCard from "../CompanyCard";
import { FaBriefcase, FaBuilding, FaBusinessTime, FaChartLine, FaClipboard, FaHandshake, FaIndustry, FaMoneyBillWave, FaUniversity, FaUsers } from "react-icons/fa";

const Companies = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "ABC Corp",
      carbonEmission: 1.085,
      prevCarbonEmission: 1.050,
      leaderboardRank: 45,
      prevLeaderboardRank: 48,
    },
    {
      id: 2,
      name: "EcoTech Solutions",
      carbonEmission: 2.300,
      prevCarbonEmission: 2.100,
      leaderboardRank: 12,
      prevLeaderboardRank: 10,
    },
    {
      id: 3,
      name: "Green Future Ltd",
      carbonEmission: 0.950,
      prevCarbonEmission: 1.100,
      leaderboardRank: 8,
      prevLeaderboardRank: 7,
    },
    {
      id: 4,
      name: "Sustainable Innovations",
      carbonEmission: 3.200,
      prevCarbonEmission: 3.500,
      leaderboardRank: 22,
      prevLeaderboardRank: 25,
    },
    {
      id: 5,
      name: "Eco Warriors Ltd",
      carbonEmission: 0.750,
      prevCarbonEmission: 0.600,
      leaderboardRank: 5,
      prevLeaderboardRank: 4,
    },
    {
      id: 6,
      name: "CleanTech Industries",
      carbonEmission: 1.900,
      prevCarbonEmission: 2.000,
      leaderboardRank: 30,
      prevLeaderboardRank: 28,
    },
    {
      id: 7,
      name: "FutureGreen Ltd",
      carbonEmission: 1.500,
      prevCarbonEmission: 1.450,
      leaderboardRank: 18,
      prevLeaderboardRank: 16,
    },
    {
      id: 8,
      name: "NetZero Tech",
      carbonEmission: 2.750,
      prevCarbonEmission: 2.900,
      leaderboardRank: 15,
      prevLeaderboardRank: 17,
    },
    {
      id: 9,
      name: "ZeroCarbon Co.",
      carbonEmission: 0.480,
      prevCarbonEmission: 0.500,
      leaderboardRank: 3,
      prevLeaderboardRank: 3,
    },
    {
      id: 10,
      name: "PlanetSaver Ltd",
      carbonEmission: 4.200,
      prevCarbonEmission: 4.000,
      leaderboardRank: 40,
      prevLeaderboardRank: 38,
    },
    {
      id: 11,
      name: "EcoFriendly Systems",
      carbonEmission: 1.250,
      prevCarbonEmission: 1.300,
      leaderboardRank: 27,
      prevLeaderboardRank: 30,
    },
    {
      id: 12,
      name: "GreenFuture Corp",
      carbonEmission: 0.950,
      prevCarbonEmission: 1.000,
      leaderboardRank: 7,
      prevLeaderboardRank: 8,    }
  ]);

  return (
    <div className="flex flex-wrap justify-center mb-10 gap-x-4 w-full gap-y-6 mt-10">
    {companies.map((company, index) => (
      <CompanyCard key={company.id} company={company} logo={iconList[index % iconList.length]} />
    ))}
  </div>
  );
};

const iconList = [
  FaBuilding,       // Corporate / Real Estate
  FaIndustry,       // Industrial / Manufacturing
  FaBusinessTime,   // Business / Time Management
  FaChartLine,      // Business Analytics / Growth
  FaBriefcase,      // Business / Professional Work
  FaUsers,          // People / Teams / Workforce
  FaUniversity,     // Education / Institutions
  FaClipboard,      // Documentation / Business Operations
  FaMoneyBillWave,  // Finance / Economics
  FaHandshake,      // Partnerships / Collaboration
];

export default Companies;
