"use client";

import React, { useState } from "react";

const YourCompany = () => {
  const [companyName] = useState("ABC Company");
  const [carbonCredits] = useState(1200);
  const [creditHistory] = useState([
    { date: "2025-02-01", amount: "+200" },
    { date: "2025-01-28", amount: "-50" },
    { date: "2025-01-20", amount: "+100" },
    { date: "2025-01-10", amount: "-70" },
  ]);
  const [carbonEmissions] = useState("3.5 Tonnes");
  const [latestTransactions] = useState([
    { id: "#TXN123", type: "Credit Purchase", amount: "+500" },
    { id: "#TXN456", type: "Emission Offset", amount: "-300" },
    { id: "#TXN789", type: "Emission Tax", amount: "-150" },
  ]);
  const [ecoScore] = useState(85);
  

  const [showCreditHistory, setShowCreditHistory] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const activeDevices = [
    { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png" }, // Correct path
    { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png" }, // Add image path
    { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png" }, // Add image path
    { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png" }, // Add image path
    // Add more devices as needed
  ];
  const [showCurrentDevices, setShowCurrentDevices] = useState(false);
  
  

  return (
    <div className="w-full font-syne min-h-screen p-10 text-black">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 border-b-4 border-black pb-3 tracking-wide">
        {companyName}
      </h1>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="text-xl font-semibold">
          Available Carbon Credits:{" "}
          <span className="text-3xl font-bold text-green-600">{carbonCredits}</span>
        </div>
        <div className="text-xl font-semibold">
          Carbon Emissions:{" "}
          <span className="text-3xl font-bold text-red-600">{carbonEmissions}</span>
        </div>
        <div className="text-xl font-semibold col-span-2">
          Eco Score (AI Generated):{" "}
          <span className="text-3xl font-bold text-blue-600">{ecoScore}%</span>
          <span className="text-sm text-gray-600 ml-2">(Higher is better)</span>
        </div>
      </div>

      {/* Credit History */}
      <h2 className="text-2xl font-semibold mt-6 border-b-4 border-black pb-2 flex justify-between">
        Credit History
        <button
          onClick={() => setShowCreditHistory(true)}
          className="text-sm font-medium underline text-gray-700 hover:text-black"
        >
          View All
        </button>
      </h2>
      <ul className="text-lg mt-3 space-y-2">
        {creditHistory.slice(0, 2).map((entry, index) => (
          <li key={index} className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800">
            <span className="font-mono">{entry.date}</span>
            <span className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {entry.amount}
            </span>
          </li>
        ))}
      </ul>

      {/* Latest Carbon Transactions */}
      <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2 flex justify-between">
        Latest Carbon Transactions
        <button
          onClick={() => setShowTransactionHistory(true)}
          className="text-sm font-medium underline text-gray-700 hover:text-black"
        >
          View All
        </button>
      </h2>
      <ul className="text-lg mt-3 space-y-2">
        {latestTransactions.slice(0, 2).map((txn, index) => (
          <li key={index} className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800">
            <span className="font-semibold">{txn.id}</span>
            <span className="text-gray-700">{txn.type}</span>
            <span className={txn.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {txn.amount}
            </span>
          </li>
        ))}
      </ul>

      {/* Currently Active Devices */}
      <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2">
  Currently Active Devices
</h2>
<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {activeDevices.map((device, index) => (
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
        <Modal title="Full Credit History" onClose={() => setShowCreditHistory(false)}>
          {creditHistory.map((entry, index) => (
            <li key={index} className="flex justify-between px-4 py-2 border-b border-gray-300">
              <span className="font-mono">{entry.date}</span>
              <span className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {entry.amount}
              </span>
            </li>
          ))}
        </Modal>
      )}

      {showTransactionHistory && (
        <Modal title="Full Transaction History" onClose={() => setShowTransactionHistory(false)}>
          {latestTransactions.map((txn, index) => (
            <li key={index} className="flex justify-between px-4 py-2 border-b border-gray-300">
              <span className="font-semibold">{txn.id}</span>
              <span className="text-gray-700">{txn.type}</span>
              <span className={txn.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {txn.amount}
              </span>
            </li>
          ))}
        </Modal>
      )}

      {showCurrentDevices && (
        <Modal title="Currently Active Devices" onClose={() => setShowCurrentDevices(false)}>
          {activeDevices.map((device, index) => (
            <li key={index} className="flex justify-between px-4 py-2 border-b border-gray-300">
              <span className="font-semibold">{device.name}</span>
              <span className="text-gray-700">{device.photoUrl}</span>
            </li>
          ))}
        </Modal>
      )}
    </div>
    
  );
};

// Modal Component
const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed font-syne inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[70vh] overflow-auto">
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

export default YourCompany;
