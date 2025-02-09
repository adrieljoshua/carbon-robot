import React, { useState } from "react";
import Image from "next/image";
import { useWallet } from "@/utils/context/WalletContext";

function WalletConnect() {
  const { connectWallet, disconnectWallet, isConnected, address } = useWallet();
  const [showLogout, setShowLogout] = useState(false);

  const handleWalletClick = () => {
    if (isConnected) {
      setShowLogout(!showLogout);
    } else {
      connectWallet();
    }
  };

  const handleLogout = () => {
    disconnectWallet();
    setShowLogout(false);
  };

  // Function to shorten the address for display
  const shortenAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const buttonBaseStyle =
    "font-syne px-4 py-2 rounded-3xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 text-black flex items-center gap-3";

  return (
    <div className="relative">
      <button
        onClick={handleWalletClick}
        className={`${buttonBaseStyle} ${
          isConnected ? "hover:bg-gray-50" : "hover:bg-gray-50"
        }`}
      >
        {isConnected && (
          <Image
            src="/images/barvoos.png"
            width={40}
            height={40}
            alt="wallet icon"
            className="object-contain"
          />
        )}
        <div className="flex flex-col items-start">
          <span className={`${isConnected ? "text-green-500 font-bold" : ""}`}>
            {isConnected ? "Connected" : "Connect Wallet"}
          </span>
          {isConnected && address && (
            <span className="text-sm text-gray-600 font-medium">
              {shortenAddress(address)}
            </span>
          )}
        </div>
      </button>

      {showLogout && isConnected && (
        <div className="absolute right-0 mt-2 w-full z-50">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(address);
                setShowLogout(false);
              }}
              className="w-full font-syne px-4 py-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-blue-50 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-black"
            >
              Copy Address
            </button>
            <button
              onClick={handleLogout}
              className="w-full font-syne px-4 py-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-red-50 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-black"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
