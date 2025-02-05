import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScanSearchIcon, Minus, X } from "lucide-react";

const EmissionScanTerminal = ({ onClose }) => {
  const [logs, setLogs] = useState(["Initializing scan..."]);
  const [minimized, setMinimized] = useState(false);

  function startScan() {
    const newLogs = [
      "Connecting to devices...",
      "Gathering emission data...",
      "Analyzing carbon footprint...",
      "Generating report...",
      "Scan completed successfully!",
    ];

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, log]);
      }, index * 1000);
    });
  }

  return (
    
      <div className={`fixed bottom-10 right-10 bg-black text-green-400 border border-gray-600 rounded-lg shadow-lg w-96 ${minimized ? "h-10" : "h-64"}`}>
        <div className="flex justify-between items-center p-2 bg-gray-900 text-white cursor-pointer">
          <span>Emission Scan Report</span>
          <div className="flex space-x-2">
            <button onClick={() => setMinimized(!minimized)}>
              <Minus size={16} />
            </button>
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>
        {!minimized && (
          <div className="p-2 text-sm h-52 overflow-y-auto font-mono">
            {logs.map((log, index) => (
              <div key={index}>{"> " + log}</div>
            ))}
          </div>
        )}
      </div>
  );
};

export default EmissionScanTerminal;