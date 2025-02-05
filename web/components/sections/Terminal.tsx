import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ScanSearchIcon, Minus, X } from "lucide-react";

const EmissionScanTerminal = ({ onClose }) => {
  const [logs, setLogs] = useState(["Initializing scan..."]);
  const [minimized, setMinimized] = useState(false);
  const [scanStarted, setScanStarted] = useState(false);  // Flag to track scan initiation

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
        setLogs((prevLogs) => {
          const updatedLogs = [...prevLogs, log];
          // Keep only the latest 10 logs
          return updatedLogs.slice(-10);
        });
      }, index * 3000); // 3-second interval for each log
    });
  }

  // Auto-scroll the log container to the bottom when new logs are added
  useEffect(() => {
    const logContainer = document.getElementById("log-container");
    if (logContainer) {
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }, [logs]);

  // Start the scan automatically when component mounts (only once)
  useEffect(() => {
    if (!scanStarted) {
      setScanStarted(true); // Set the flag to true after the scan starts
      startScan();  // Call the startScan function
    }
  }, [scanStarted]);  // Only run the effect when scanStarted changes

  return (
    <div  className={`fixed bottom-10 right-10 bg-black text-green-400 border border-gray-600 rounded-xl shadow-2xl w-96 ${minimized ? "h-10" : "h-64"}`}>
      <div className="flex justify-between items-center p-2 rounded-xl bg-gray-900 text-white cursor-pointer">
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
        <div id="log-container" className="px-2 py-3 text-sm h-52 no-scrollbar overflow-y-auto font-mono">
          {logs.map((log, index) => (
            <div key={index}>{"> " + log}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmissionScanTerminal;
