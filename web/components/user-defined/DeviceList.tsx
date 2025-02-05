'use client'
import { useState, useContext } from "react";
import { Context } from "@/context/Context";
import { v4 as uuidv4 } from "uuid";

const devicesList = [
  { name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1",state: "Unconfigured" },
  { name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state:"Unconfigured" },
  { name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state:"Unconfigured" },
  { name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state:"Unconfigured" },
];

function DeviceList({ onClose }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { setSelectedDeviceData } = useContext(Context);

  const handleDeviceSelect = (device) => {
    setSelectedDevice({ ...device, id: crypto.randomUUID() }); // Assign a unique ID
  };

  const handleAddDevice = () => {
    if (selectedDevice) {
      setSelectedDeviceData(selectedDevice);
      onClose();
    }
  };

  return (
    <div className="flex flex-col font-syne items-center w-full">
      <div className="gap-6 w-full mb-6">
        {devicesList.map((device) => (
          <div 
            key={device.id} 
            onClick={() => handleDeviceSelect(device)}
            className={`flex cursor-pointer justify-between items-center gap-x-9 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md mb-4 
             ${selectedDevice?.model === device.model ? "border-4 border-black" : "border"} 
              hover:translate-x-1 hover:translate-y-1 transition-all`}
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

      {/* Selected Device Details */}
      {selectedDevice && (
        <div className="w-full mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Selected Device Details:</h4>
          <p><span className="font-medium">Name:</span> {selectedDevice.name}</p>
          <p><span className="font-medium">Device Model:</span> {selectedDevice.model}</p>
        </div>
      )}

      {/* Add Device Button */}
      {selectedDevice && (
        <button
          onClick={handleAddDevice}
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-black/80 transition-colors"
        >
          Add Device
        </button>
      )}
    </div>
  );
}

export default DeviceList;