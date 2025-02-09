import React, { useState, useEffect } from "react";
import { Minus, X, Activity } from "lucide-react";

interface EmissionScanTerminalProps {
  onClose: () => void;
}

type LogType = "info" | "data" | "alert" | "success" | "error";

interface LogEntry {
  text: string;
  type?: LogType;
}

interface ScanData {
  coordinates: string;
  lidarReading: number;
  co2Concentration: number;
}

const EmissionScanTerminal: React.FC<EmissionScanTerminalProps> = ({
  onClose,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [minimized, setMinimized] = useState(false);
  const [scanStarted, setScanStarted] = useState(false);

  const addLog = (text: string, type: LogType = "info") => {
    setLogs((prev) => [...prev, { text, type }]);
  };

  async function startScan() {
    addLog("Initializing connection to device...", "info");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NILLION_URL}/api/scan`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      addLog("Connection established", "success");
      addLog("Starting scan sequence...", "info");

      if (Array.isArray(data)) {
        for (const scan of data) {
          addLog("----------------------------------------", "info");
          addLog(`COORDINATES: ${scan.coordinates}`, "data");
          addLog(`LIDAR Reading: ${scan.lidarReading}m`, "data");
          addLog(`CO₂ Concentration: ${scan.co2Concentration} ppm`, "data");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      addLog("Scan sequence completed", "success");
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        addLog("Error: Network connection failed", "error");
        addLog(
          `Backend URL ${process.env.NEXT_PUBLIC_NILLION_URL} not reachable`,
          "error"
        );
      } else if (error instanceof DOMException && error.name === "AbortError") {
        addLog("Error: Connection timed out", "error");
      } else {
        addLog(
          `Error: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`,
          "error"
        );
      }
      addLog("Please check your network connection and try again", "info");
    }
  }

  useEffect(() => {
    const logContainer = document.getElementById("log-container");
    if (logContainer) {
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (!scanStarted) {
      setScanStarted(true);
      startScan();
    }
  }, [scanStarted]);

  const getLogStyle = (type?: LogType) => {
    switch (type) {
      case "info":
        return "text-gray-400";
      case "data":
        return "text-cyan-400";
      case "alert":
        return "text-yellow-400";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-green-400";
    }
  };

  return (
    <div
      className={`fixed bottom-10 right-10 bg-black text-green-400 border border-gray-600 rounded-xl shadow-2xl w-[500px] ${
        minimized ? "h-10" : "h-[500px]"
      }`}
    >
      <div className="flex justify-between items-center p-2 rounded-t-xl bg-gray-900 text-white">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-green-500 animate-pulse" />
          <span className="font-mono">Carbon Emission Scan Terminal</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setMinimized(!minimized)}
            className="hover:bg-gray-700 p-1 rounded"
          >
            <Minus size={16} />
          </button>
          <button onClick={onClose} className="hover:bg-gray-700 p-1 rounded">
            <X size={16} />
          </button>
        </div>
      </div>
      {!minimized && (
        <div
          id="log-container"
          className="px-4 py-3 text-sm h-[452px] overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {logs.map((log, index) => (
            <div key={index} className={`${getLogStyle(log.type)} py-0.5`}>
              {log.type === "data" ? "└─ " : "> "}
              {log.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmissionScanTerminal;
