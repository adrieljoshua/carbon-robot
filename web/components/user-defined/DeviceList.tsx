'use client'
import { useState, useContext } from "react";
import { Context } from "@/context/Context";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";


export const devicesList = [
  { name: "FLIR A615 Thermal Camera",
    photoUrl: "/images/FLIR-A615-Thermal-Camera.png", 
    model: "DEV-1",state: "Unconfigured",
    decription: "The FLIR A615 is a compact thermal imaging camera designed for condition monitoring, process control, quality assurance, and fire prevention. It features a 640 x 480 pixel microbolometer that detects temperature differences as small as 50 mK, ensuring accuracy at longer distances. The camera offers 16-bit temperature linear output, allowing integration with third-party software. It can stream full-frame 16-bit images at 50 Hz, or up to 200 Hz in windowed mode, accommodating high-speed processes." 
  },
  { name: "AeroVironment Quantix Drone",
    photoUrl: "/images/AeroVironment Quantix Drone.png",
    model: "DEV-2", 
    state:"Unconfigured",
    decription: "The AeroVironment Quantix is a hybrid vertical takeoff and landing (VTOL) drone designed for commercial applications. It combines the vertical takeoff and landing capabilities of a quadcopter with the speed and endurance of a fixed-wing aircraft. This design allows for efficient data collection over large areas, making it suitable for agriculture, construction, and environmental monitoring.",
  },
  { name: "SenseFly eBee X Drone",
    photoUrl: "/images/SenseFly eBee X Drone.png", 
    model: "DEV-3", 
    state:"Unconfigured" ,
    description: "The SenseFly eBee X is a fixed-wing drone designed for professional mapping and surveying. It offers extended flight times and the ability to cover large areas, making it ideal for applications such as agriculture, mining, and environmental monitoring. The eBee X is known for its ease of use and high-quality data collection capabilities."
  },
  { name: "Horiba PG-250 Portable Gas Analyzer",
    photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", 
    model: "DEV-4", 
    state:"Unconfigured",
    description: "The Horiba PG-250 is a portable gas analyzer designed for measuring emissions from diesel engines. It provides real-time data on pollutants such as NOx, CO, CO₂, and particulate matter, enabling operators to monitor and optimize engine performance. The device is compact and rugged, suitable for field use in various industries."
  },
  {
    name: "DJI Matrice 300 RTK Drone",
    photoUrl: "/images/DJI Matrice 300 RTK Drone.png",
    model: "DEV-5",
    state: "Unconfigured",
    description: "The DJI Matrice 300 RTK is a versatile commercial drone designed for industrial applications. It features advanced flight capabilities, high-resolution imaging, and real-time data transmission, making it suitable for tasks such as mapping, inspection, and search and rescue. The Matrice 300 RTK offers a combination of reliability, efficiency, and safety, making it a popular choice for professional users."
  }
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
            key={device.model} 
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