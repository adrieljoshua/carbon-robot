'use client'
import { useState } from "react";
import CompanyCard from "../user-defined/CompanyCard";
import { FaBriefcase, FaBuilding, FaBusinessTime, FaChartLine, FaClipboard, FaHandshake, FaIndustry, FaMoneyBillWave, FaUniversity, FaUsers } from "react-icons/fa";
import DisplayCompany from "./DisplayCompany";
import { CompanyProps } from "../../types/types";
import { CompanyListProps } from "../../types/types";
import { companiesList } from "@/lib/companiesList";

const Companies = () => {
  const [companies] = useState<CompanyListProps[]>(companiesList); // State to store the list of companies
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps|null> (null); // State to track selected company

  
  // Function to handle company selection
  const handleViewCompany = (companyId: string) => {
    setSelectedCompany(companies.find(company => company.address === companyId) || null);
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
              key={company.address}
              company={company}
              logo={iconList[index % iconList.length]}
              onViewCompany={() => handleViewCompany(company.address)} // Pass the company ID to the handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

const iconList = [ FaBuilding, FaIndustry, FaBusinessTime, FaChartLine, FaBriefcase, FaUsers, FaUniversity,     
                    FaClipboard, FaMoneyBillWave, FaHandshake ];

export default Companies;

                    