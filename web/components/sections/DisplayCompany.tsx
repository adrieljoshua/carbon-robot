import React, { useState } from 'react';
import Modal from '../user-defined/Modal';
import { DisplayCompanyProps } from '../../types/types';
import Image from 'next/image';


const DisplayCompany: React.FC<DisplayCompanyProps> = ({ company }) => {
  const [showCreditHistory, setShowCreditHistory] = useState(false); // Added state for modal visibility

  return (
    <div className="w-full font-syne min-h-screen p-10 text-black">
      <h1 className="text-4xl font-bold mb-2 tracking-wide">
            {company.name}
            
          </h1>
          <p className="text-sm mb-6 border-b-4 font-mono border-black pb-3"> <span className="font-bold">Location: </span> {company.location}</p>
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
          <span className="text-3xl font-bold text-blue-600">{company.ecoscore}</span>
        </div>
        <div className="text-xl font-semibold">
          Leaderboard Position:{" "}
          <span className="text-3xl font-bold text-green-600">{company.rank}</span>
        </div>
      </div>

      {/* Credit History */}
      <h2 className="text-2xl font-semibold mt-6 border-b-4 border-black pb-2 flex justify-between">
        Credit History
        {company.creditHistory.length > 0 && (
          <button
            onClick={() => setShowCreditHistory(true)}
            className="text-sm font-medium text-white bg-black px-4 py-2 rounded hover:bg-black/40"
          >
            View Complete History
          </button>
        )}
      </h2>

      {company.creditHistory.length > 0 ? (
        <ul className="text-lg mt-3 space-y-2">
          {company.creditHistory.slice(0, 2).map((entry, index) => (
            <li key={index} className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800">
              <span className="font-mono">{entry.date}</span>
              <span
                className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}
              >
                {entry.amount} Credits
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="mt-10 text-center">No recorded credit transactions.</h1>
      )}

      <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2">Currently Active Devices</h2>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {company.currentActiveDevices.map((device, index) => (
        <div
          key={index}
          className="flex cursor-pointer items-center  space-x-4 border transition-all p-4 rounded-lg shadow-md 
            hover:translate-x-1 hover:translate-y-1"
        >
          <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
            <Image src={device.photoUrl} width={20} height={20} alt={device.name} className="w-full h-full object-contain" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">{device.name}</h3>
        </div>
      ))}
      </div>

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
                <span className="text-gray-400 font-mono">{entry.hash}</span>
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
    </div>
  );
};

export default DisplayCompany;
