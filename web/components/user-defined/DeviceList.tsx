'use client'
import { useState } from "react";

const devicesList = [
  { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", id: "DEV-486" },
  { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", id: "DEV-454" },
  { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", id: "DEV-123"},
  { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", id: "DEV-789" },
];

function DevicesList() {


  return (
    <div className="flex flex-col font-syne items-center w-full">
      <h2 className="text-2xl font-syne mb-4 font-semibold">Select Devices</h2>
      <div className="gap-6 w-full">
        {devicesList.map((device) => (
          <div 
            key={device.id} 
            className="flex cursor-pointer justify-between items-center gap-x-9 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md"
          >
            {/* Device Image */}
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img src={device.photoUrl} alt={device.name} className="w-full h-full object-contain" />
            </div>

            {/* Device Name */}
            <h3 className="text-lg text-wrap font-medium text-gray-800">{device.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevicesList;
