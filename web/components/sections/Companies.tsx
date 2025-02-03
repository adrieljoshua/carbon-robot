'use client'
import { useState } from "react";
import CompanyCard from "../CompanyCard";
import { FaBriefcase, FaBuilding, FaBusinessTime, FaChartLine, FaClipboard, FaHandshake, FaIndustry, FaMoneyBillWave, FaUniversity, FaUsers } from "react-icons/fa";

const Companies = () => {
  const [companies, setCompanies] = useState(companiesList) 

  return (
    <div className="flex flex-wrap justify-center mb-10 gap-x-4 w-full gap-y-6 mt-10">
    {companies.map((company, index) => (
      <CompanyCard key={company.id} company={company} logo={iconList[index % iconList.length]} />
    ))}
  </div>
  );
};

const iconList = [ FaBuilding, FaIndustry, FaBusinessTime, FaChartLine, FaBriefcase, FaUsers, FaUniversity,     
                    FaClipboard, FaMoneyBillWave, FaHandshake ];

const companiesList = [{
                      id: 1,
                      name: "ABC Corp",
                      carbonCredits: 145,
                      leaderboardRank: 45,
                      prevLeaderboardRank: 48,
                    },
                    {
                      id: 2,
                      name: "EcoTech Solutions",
                      carbonCredits: 25,
                      leaderboardRank: 12,
                      prevLeaderboardRank: 10,
                    },
                    {
                      id: 3,
                      name: "Green Future Ltd",
                      carbonCredits: 324,
                      leaderboardRank: 8,
                      prevLeaderboardRank: 7,
                    },
                    {
                      id: 4,
                      name: "Sustainable Innovations",
                      carbonCredits: 75,
                      leaderboardRank: 22,
                      prevLeaderboardRank: 25,
                    },
                    {
                      id: 5,
                      name: "Eco Warriors Ltd",
                      carbonCredits: 450,
                      leaderboardRank: 5,
                      prevLeaderboardRank: 4,
                    },
                    {
                      id: 6,
                      name: "CleanTech Industries",
                      carbonCredits: 200,
                      leaderboardRank: 30,
                      prevLeaderboardRank: 28,
                    },
                    {
                      id: 7,
                      name: "FutureGreen Ltd",
                      carbonCredits: 100,
                      leaderboardRank: 18,
                      prevLeaderboardRank: 16,
                    },
                    {
                      id: 8,
                      name: "NetZero Tech",
                      carbonCredits: 500,
                      leaderboardRank: 15,
                      prevLeaderboardRank: 17,
                    },
                    {
                      id: 9,
                      name: "ZeroCarbon Co.",
                      carbonCredits: 1000,
                      leaderboardRank: 3,
                      prevLeaderboardRank: 3,
                    },
                    {
                      id: 10,
                      name: "PlanetSaver Ltd",
                      carbonCredits: 50,
                      leaderboardRank: 40,
                      prevLeaderboardRank: 38,
                    },
                    {
                      id: 11,
                      name: "EcoFriendly Systems",
                      carbonCredits: 300,
                      leaderboardRank: 27,
                      prevLeaderboardRank: 30,
                    },
                    {
                      id: 12,
                      name: "GreenFuture Corp",
                      carbonCredits: 150,
                      leaderboardRank: 7,
                      prevLeaderboardRank: 8,    
                    }];
export default Companies;
