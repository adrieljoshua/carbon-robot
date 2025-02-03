"use client";

import React, { useState } from "react";

const YourCompany = () => {
  const [company,setCompany] = useState(CompanyDetails);
  const [showCreditHistory, setShowCreditHistory] = useState(false);
  

  return (
    <div className="w-full font-syne min-h-screen p-10 text-black">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 border-b-4 border-black pb-3 tracking-wide">
        {company.name}
      </h1>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="text-xl font-semibold">
          Available Carbon Credits:{" "}
          <span className="text-3xl font-bold text-black">{company.carbonCredits}</span>
        </div>
        <div className="text-xl font-semibold">
          Carbon Emissions:{" "}
          <span className="text-3xl font-bold text-red-600">{company.carbonEmissions}</span>
        </div>
        <div className="text-xl font-semibold">
          Eco Score (AI Generated):{" "}
          <span className="text-3xl font-bold text-blue-600">{company.ecoscore}%</span>
        </div>
        <div className="text-xl font-semibold">
          Leaderboard Position:{" "}
          <span className="text-3xl font-bold text-green-600">{company.leaderboard}</span>
        </div>
      </div>

      {/* Credit History */}
      <h2 className="text-2xl font-semibold mt-6 border-b-4 border-black pb-2 flex justify-between">
        Credit History
        <button
          onClick={() => setShowCreditHistory(true)}
          className="text-sm font-medium text-white bg-black px-4 py-2 rounded hover:bg-black/40"
        >
          View Complete History
        </button>
      </h2>
      <ul className="text-lg mt-3 space-y-2">
        {company.creditHistory.slice(0, 2).map((entry, index) => (
          <li key={index} className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800">
            <span className="font-mono">{entry.date}</span>
            <span className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {entry.amount} Credits
            </span>
          </li>
        ))}
      </ul>


      {/* Currently Active Devices */}
      <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2">
  Currently Active Devices
</h2>
<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {company.currentActiveDevices.map((device, index) => (
    <div key={index} className="flex items-center space-x-4 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md">
      {/* Replace with your device images */}
      <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
        {/* Example: Replace with actual device images */}
        <img src={device.photoUrl} alt={device.name} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-medium text-gray-800">{device.name}</h3>
    </div>
  ))}
</div>

      {/* Modals */}
      {showCreditHistory && (
    <Modal 
      title="Full Credit History" 
      onClose={() => setShowCreditHistory(false)} 
      className="w-[800px] max-w-4xl"
    >
      <ul className="w-full">
        {company.creditHistory.map((entry, index) => (
          <li 
            key={index} 
            className="grid grid-cols-5 text-center px-4 py-2 border-b border-gray-300"
          >
            <span className="text-gray-400 font-mono">{entry.id}</span>
            <span className="font-mono">{entry.date}</span>
            <span className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {entry.amount}
            </span>
            <span className="text-gray-500">{entry.type}</span>
            <span className="text-gray-500">{entry.otherParty}</span>
          </li>
        ))}
      </ul>
    </Modal>
      )}

      {/* {showDevice && (
        <Modal title="Currently Active Devices" onClose={() => setDevice(false)}>
          {activeDevices.map((device, index) => (
            <li key={index} className="flex justify-between px-4 py-2 border-b border-gray-300">
              <span className="font-semibold">{device.name}</span>
              <span className="text-gray-700">{device.photoUrl}</span>
            </li>
          ))}
        </Modal>
      )} */}
    </div>
    
  );
};

// Modal Component
const Modal = ({ title, children, onClose, className = "" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-syne">
      <div className={`bg-white p-6 rounded-lg flex flex-col items-center shadow-xl max-h-[70vh] overflow-auto ${className}`}>
        <h2 className="text-xl font-bold border-b pb-2">{title}</h2>
        <ul className="mt-4">{children}</ul>
        <button
          onClick={onClose}
          className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CompanyDetails = {
  name: "ABC Company",
  ecoscore: 74,
  leaderboard: 155,
  carbonCredits: 40,
  carbonEmissions: "34.5 Tonnes",
  creditHistory: [
    { date: "2025-02-01", amount: "+12", type: "Credit Purchase", id: "#TXN123",otherParty: "XYZ Company" },
    { date: "2024-08-28", amount: "-15", type: "Emission Offset", id: "#TXN456",otherParty: "SmartTech Solutions" },
    { date: "2024-01-20", amount: "+24", type: "Credit Purchase", id: "#TXN789",otherParty: "EcoTech Innovations" },
    { date: "2023-06-10", amount: "-5", type: "Emission Offset", id: "#TXN101",otherParty: "GreenTech Inc" },
    { date: "2022-12-25", amount: "-15", type: "Emission Offset", id: "#TXN113",otherParty: "GreenTech Inc" },
  ],
  currentActiveDevices: [
    { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", id: "DEV-486", count: 2 ,location: "Warehouse 1" },
    { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png",id: "DEV-454", count: 1, location: "Warehouse 2" },
    { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", id: "DEV-123", count: 3, location: "Warehouse 1" },
    { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", id: "DEV-789", count: 1, location: "Warehouse 3" },
  ]
}

export default YourCompany;
