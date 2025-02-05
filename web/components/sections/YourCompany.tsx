"use client";

import React, { useEffect, useState } from "react";
import Modal from "../user-defined/Modal";
import { Context } from "@/context/Context";
import { useContext } from "react";
import { CheckCircle, PlusCircleIcon, PlusIcon, Scan, ScanIcon, ScanSearchIcon } from "lucide-react";
import DeviceList from "../user-defined/DeviceList";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from 'uuid';
import EmissionScanTerminal from "./Terminal";


const YourCompany = () => {
  // const { formData } = useContext(Context);
  const {  selectedDeviceData } = useContext(Context);
  const formData = { companyName: "ABC Company", location: "T Nagar, Chennai, India" };  //Comment this line after integrating with the actual data
  const [company,setCompany] = useState(CompanyDetails);
  const [showCreditHistory, setShowCreditHistory] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [addDevice, setAddDevice] = useState(false);
  const [configureDevice, setConfigureDevice] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);


  useEffect(() => {
    if (selectedDeviceData) {
      const newDevice = { ...selectedDeviceData, id: crypto.randomUUID() }; // Assign unique ID
      setCompany((prevCompany) => ({
        ...prevCompany,
        currentActiveDevices: [...prevCompany.currentActiveDevices, newDevice],
      }));
    }
  }, [selectedDeviceData]);

  function handlePrivateKeySubmission(): void {
    if (!selectedDevice) return;
    setCompany((prevCompany) => ({
      ...prevCompany,
      currentActiveDevices: prevCompany.currentActiveDevices.map((device) =>
        device.id === selectedDevice.id ? { ...device, state: "Configured" } : device
      ),
    }));
    setConfigureDevice(false);
    setSelectedDevice(null);
  }


  return (
    <div className="w-full font-syne min-h-screen p-10 text-black">
      {formData.companyName ? (
        <>
          <h1 className="text-4xl font-bold mb-6 border-b-4 border-black pb-3 tracking-wide">
            {formData.companyName}
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
              <span className="text-3xl font-bold text-blue-600">{company.ecoscore}</span>
            </div>
            <div className="text-xl font-semibold">
              Leaderboard Position:{" "}
              <span className="text-3xl font-bold text-green-600">{company.leaderboard}</span>
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
          
          {(company.creditHistory.length > 0) ? (
          <ul className="text-lg mt-3 space-y-2">
            {company.creditHistory.slice(0, 2).map((entry, index) => (
              <li key={index} className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800">
                <span className="font-mono">{entry.date}</span>
                <span className={entry.amount.includes("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {entry.amount} Credits
                </span>
              </li>
            ))}
          </ul>):(
            <h1 className="mt-10 text-center">No recorded credit transactions.</h1>
          )}

          <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2">
            Currently Active Devices
          </h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
                onClick={() => setAddDevice(true)}
                className="flex cursor-pointer items-center space-x-4 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md"
              >
                  <div className="w-full h-full flex items-center p-4 justify-evenly overflow-hidden">
                    <PlusIcon size={35} />
                    <h3 className="text-lg font-medium text-gray-800">Add Device</h3>
              </div>
            </div> 

            {company.currentActiveDevices.map((device, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedDevice(device)} 
                className={`flex cursor-pointer items-center space-x-4 border transition-all p-4 rounded-lg shadow-md hover:translate-x-1 hover:translate-y-1
                  ${device.state === "Unconfigured" ? "bg-yellow-200 border-yellow-600 hover:bg-yellow-300" : "bg-green-200 border-green-600 hover:bg-green-300"}
                `}
              >
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={device.photoUrl} 
                    alt={device.name} 
                    className="w-full h-full object-contain" 
                  />
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

        {addDevice && (
        <Modal 
          title="Select Device" 
          onClose={() => setAddDevice(false)} 
          className="w-[500px] no-scrollbar overflow-y-auto"
        >
          <DeviceList onClose={() => setAddDevice(false)} />
        </Modal>
          )}    

          {/* Device Details Modal */}
          {selectedDevice && (
            <Modal 
              title="Device Details" 
              onClose={() => setSelectedDevice(null)} 
              className="w-[500px] no-scrollbar overflow-y-auto"
            >
              <div className="flex flex-col items-center no-scrollbar overflow-y-auto">
                <img 
                  src={selectedDevice.photoUrl} 
                  alt={selectedDevice.name} 
                  className="w-64 h-64 object-contain border-2 border-gray-200 mb-4" 
                />
                <div className="w-full space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Device Name:</span>
                    <span>{selectedDevice.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Device Model:</span>
                    <span>{selectedDevice.model}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Unique Device ID:</span>
                    <span>{selectedDevice.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Status</span>
                    {selectedDevice.state === "Unconfigured" ? (
                    <div className="flex items-center space-x-4">
                      <span>{selectedDevice.state}</span>
                      <Button className="text-xs p-2 bg-gray-950" onClick={()=>setConfigureDevice(true)}>Configure</Button>
                    </div>):(
                      <div className="flex items-center space-x-4">
                      <span>{selectedDevice.state}</span>
                      <CheckCircle size={20} className="text-green-400"/>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
          )}
          {configureDevice && (
        <Modal 
          title="Configure Device" 
          onClose={() => setAddDevice(false)} 
          className="w-[500px] no-scrollbar overflow-y-auto"
        >
          <div className="flex items-center no-scrollbar overflow-y-auto">
            <input type="text" placeholder="Enter device private key to configure" className="w-full"/>
            <Button className="bg-green-600" onClick={()=>handlePrivateKeySubmission()}>Configure</Button>
          </div>
        </Modal>
          )}  

        {/* Start Scan Button */}
          {company.currentActiveDevices.some(device => device.state === "Configured") && (
            <div className="flex justify-center mt-10">
              <Button className="bg-black text-white" onClick={() => setShowTerminal(true)}>
                <ScanSearchIcon size={20} className="mr-2"/>
                <span>START CARBON EMISSION SCAN</span>
              </Button>
            </div>
          )}

          {company.currentActiveDevices.length > 0 && !company.currentActiveDevices.some(device => device.state === "Configured") && 
           (
            <div className="flex flex-col items-center mt-10">
              <Button 
                className="bg-black text-white opacity-50 cursor-not-allowed" 
                onClick={() => setShowTerminal(true)} 
                disabled
              >
                <ScanSearchIcon size={20} className="mr-2"/>
                <span>START CARBON EMISSION SCAN</span>
              </Button>
              <p className="text-sm text-red-500 mt-2">Please configure devices to initiate scan.</p>
            </div>
          )}

        {showTerminal && <EmissionScanTerminal onClose={() => setShowTerminal(false)} />}
        </>
      ) : (
        <div className="flex  justify-center h-screen">
          <h1 className="text-xl mt-20 text-center ">Your Company has not been registered.</h1>
        </div>
      )}
    </div>
);
}


const CompanyDetails = {
  name: "ABC Company",
  ecoscore: "-",
  leaderboard: "-",
  carbonCredits: 0,
  carbonEmissions: "-",
  creditHistory: [
    // { date: "2025-02-01", amount: "+12", type: "Credit Purchase", id: "#TXN123",otherParty: "XYZ Company" },
    // { date: "2024-08-28", amount: "-15", type: "Emission Offset", id: "#TXN456",otherParty: "SmartTech Solutions" },
    // { date: "2024-01-20", amount: "+24", type: "Credit Purchase", id: "#TXN789",otherParty: "EcoTech Innovations" },
    // { date: "2023-06-10", amount: "-5", type: "Emission Offset", id: "#TXN101",otherParty: "GreenTech Inc" },
    // { date: "2022-12-25", amount: "-15", type: "Emission Offset", id: "#TXN113",otherParty: "GreenTech Inc" },
  ],
  currentActiveDevices: [

  ]
}


export default YourCompany;
