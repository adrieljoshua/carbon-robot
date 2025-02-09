"use client";

import React, { useEffect, useState } from "react";
import Modal from "../user-defined/Modal";
import { Context } from "@/context/Context";
import { useContext } from "react";
import {
  CheckCircleIcon,
  Key,
  Keyboard,
  Pen,
  PlusIcon,
  ScanSearchIcon,
} from "lucide-react";
import { devicesList } from "../../lib/deviceList";
import { Button } from "../ui/button";
import { CompanyProps, Device } from "@/types/types";
import EmissionScanTerminal from "./Terminal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthImage from "../../public/images/nillion-verify.png";
import Nillion from "../../public/images/nillion-b.png";
import Loader from "../../components/user-defined/Loader";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import Starknet from "../../public/images/Starknet.svg";
import { getCompanyData } from "@/utils/contracts/getters";
import { useWallet } from "@/utils/context/WalletContext";
import { felt252ToStr } from "@/utils/contracts/tools";
import { toast } from "@/hooks/use-toast";
import { registerDevice } from "@/utils/contracts/setters";

const YourCompany = () => {
  const router = useRouter();
  const { selectedDeviceData } = useContext(Context);
  const { address, isConnected, connectWallet, walletAccount } = useWallet();
  const [company, setCompany] = useState<CompanyProps>(CompanyDetails);
  const [showCreditHistory, setShowCreditHistory] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<
    CompanyProps["currentActiveDevices"][number] | null
  >(null);
  const [configureDevice, setConfigureDevice] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  // const [authSuccess, setAuthSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [invalidCreds, setInvalidCreds] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const steps = ["Add Device", "Authenticate", "Create Transaction"];
  const [selectedListDevice, setSelectedListDevice] = useState<Device | null>(
    null
  );
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!isConnected || !address) {
        console.log("Wallet not connected or no address");
        return;
      }

      try {
        setDataLoading(true);
        const companyData = await getCompanyData(address);
        console.log("Received company data:", companyData);

        // Convert felt values to strings
        const decodedName = felt252ToStr(companyData.name);
        const decodedLocation = felt252ToStr(companyData.location);

        console.log("Decoded name:", decodedName);
        console.log("Decoded location:", decodedLocation);

        setCompany((prevCompany) => ({
          ...prevCompany,
          address: address,
          name: decodedName,
          location: decodedLocation, // Keep it as a string
          carbonEmissions: Number(companyData.emissions),
          ecoscore: Number(companyData.eco_score),
          carbonCredits: Number(companyData.min_tokens),
        }));
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchCompanyData();
  }, [isConnected, address]);

  useEffect(() => {
    if (selectedDeviceData) {
      const newDevice: Device = {
        ...selectedDeviceData,
        id: crypto.randomUUID(),
        model: "Unknown Model",
        description: "No description available",
        state: "Unconfigured",
      };
      setCompany((prevCompany) => ({
        ...prevCompany,
        currentActiveDevices: [...prevCompany.currentActiveDevices, newDevice],
      }));
    }
  }, [selectedDeviceData]);

  const handleDeviceSelect = (device: Device) => {
    setSelectedListDevice({ ...device, id: crypto.randomUUID() });
    setSelectedDevice(device);
  };

  const addDevice = () => {
    setCurrentStep(1);
  };

  function handleAuthentication() {
    setLoading(true);
    setInvalidCreds(false);

    const validateDevice = async () => {
      try {
        if (!publicKey || !privateKey) {
          toast({
            title: "Missing Credentials",
            description: "Please enter both public key and PIN",
            variant: "destructive",
          });
          return;
        }

        const response = await fetch("/api/validate-device", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_key: publicKey,
            pin: privateKey,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Device validation response:", data);

        if (data.verification === true) {
          setAuthSuccess(true);
          toast({
            title: "Device Validated",
            description:
              "Device credentials verified successfully. Please proceed with registration.",
          });
        } else {
          setInvalidCreds(true);
          toast({
            title: "Validation Failed",
            description: "Invalid credentials. Please check and try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error validating device:", error);
        setInvalidCreds(true);
        toast({
          title: "Validation Error",
          description: "Failed to validate device credentials",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    validateDevice();
  }

  const handleRegistration = async () => {
    try {
      if (!selectedListDevice?.id || !publicKey) {
        throw new Error("Missing device information");
      }

      setLoading(true);
      const tx = await registerDevice(
        selectedListDevice.id.slice(0, 5),
        publicKey
      );
      console.log("Register device transaction:", tx);

      if (!walletAccount) {
        throw new Error("Wallet not connected");
      }

      const response = await walletAccount.execute(tx);
      console.log("Transaction response:", response);

      const configuredDevice = {
        ...selectedListDevice,
        state: "Configured",
      };

      setCompany((prev) => ({
        ...prev,
        currentActiveDevices: [...prev.currentActiveDevices, configuredDevice],
      }));

      setCurrentStep(2);
      setConfigureDevice(false); // Close the modal
      toast({
        title: "Registration Complete",
        description: "Device has been successfully registered on-chain",
      });
    } catch (error) {
      console.error("Error registering device:", error);
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error ? error.message : "Failed to register device",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterCompany = () => {
    router.push("/register-company");
  };

  function startScan(): void {
    setShowTerminal(true);
  }

  function createTransaction(): void {
    setLoading(true);
    setTimeout(() => {
      if (selectedListDevice) {
        const configuredDevice = {
          ...selectedListDevice,
          state: "Configured",
        };
        setCompany((prev) => ({
          ...prev,
          currentActiveDevices: [
            ...prev.currentActiveDevices,
            configuredDevice,
          ],
        }));
        setTransactionCompleted(true);
        setSelectedDevice(null);
      }
      setLoading(false);
    }, 3000);
  }

  if (dataLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Check for wallet connection first
  if (!isConnected) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-xl text-center">
          Please connect your wallet to continue
        </h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-xl text-center">No wallet address found</h1>
      </div>
    );
  }

  return (
    <div className="w-full font-syne min-h-screen p-10 text-black">
      {company.name != company.location ? (
        <>
          <h1 className="text-4xl font-bold mb-2 tracking-wide">
            {company.name}
          </h1>
          <p className="text-sm mb-6 border-b-4 font-mono border-black pb-3">
            <span className="font-bold">Location: </span>
            {company.location || "-"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="text-xl font-semibold">
              Available Carbon Credits:{" "}
              <span className="text-3xl font-bold text-black">
                {company.carbonCredits === null ? "-" : company.carbonCredits}
              </span>
            </div>
            <div className="text-xl font-semibold">
              Carbon Emissions:{" "}
              <span className="text-3xl font-bold text-red-600">
                {company.carbonEmissions === null
                  ? "-"
                  : company.carbonEmissions}
              </span>
            </div>
            <div className="text-xl font-semibold">
              Eco Score:{" "}
              <span className="text-3xl font-bold text-blue-600">
                {company.ecoscore === null ? "-" : company.ecoscore}
              </span>
            </div>
            <div className="text-xl font-semibold">
              Leaderboard Position:{" "}
              <span className="text-3xl font-bold text-black">
                {company.rank === null ? "-" : company.rank}
              </span>
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
                <li
                  key={index}
                  className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800"
                >
                  <span className="font-mono">{entry.date}</span>
                  <span
                    className={
                      entry.amount.includes("+")
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {entry.amount} Credits
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <h1 className="mt-10 text-center">
              No recorded credit transactions.
            </h1>
          )}

          {/* Emission Scan History */}
          <h2 className="text-2xl font-semibold mt-6 border-b-4 border-black pb-2 flex justify-between">
            Emission Scan History
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
                <li
                  key={index}
                  className="flex justify-between w-96 px-2 py-1 border-l-4 border-gray-800"
                >
                  <span className="font-mono">{entry.date}</span>
                  <span
                    className={
                      entry.amount.includes("+")
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {entry.amount} Credits
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <h1 className="mt-10 text-center">No emission scans reported.</h1>
          )}

          <h2 className="text-2xl font-semibold mt-8 border-b-4 border-black pb-2">
            Currently Active Devices
          </h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => setConfigureDevice(true)}
              className="flex cursor-pointer items-center space-x-4 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md"
            >
              <div className="w-full h-full flex items-center p-4 justify-evenly overflow-hidden">
                <PlusIcon size={35} />
                <h3 className="text-lg font-medium text-gray-800">
                  Add Device
                </h3>
              </div>
            </div>

            {company.currentActiveDevices.map((device, index) => (
              <div
                key={index}
                onClick={() => setSelectedDevice(device)}
                className="flex cursor-pointer items-center space-x-4 border transition-all p-4 rounded-lg shadow-md hover:translate-x-1 hover:translate-y-1
                  bg-green-200 border-green-600 hover:bg-green-300"
              >
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                  <Image
                    src={device.photoUrl}
                    alt={device.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  {device.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Modals */}
          {showCreditHistory && (
            <Modal
              title="Full Credit History"
              onClose={() => setShowCreditHistory(false)}
              className="w-[1200px] max-w-5xl"
            >
              <ul className="w-full">
                <li className="grid grid-cols-5 text-center px-4 gap-x-10 font-syne py-2 border-b-2 border-black">
                  <span className="text-gray-400 text-wrap">Hash</span>
                  <span className="">Date</span>
                  <span className="">Amount</span>
                  <span className="">Type</span>
                  <span className="">Other Party</span>
                </li>
                {company.creditHistory.map((entry, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-5 text-center px-4 py-2 gap-x-10 border-b border-gray-300"
                  >
                    <span className="text-gray-400 text-wrap font-mono">
                      {entry.hash}
                    </span>
                    <span className="font-mono">{entry.date}</span>
                    <span
                      className={
                        entry.amount.includes("+")
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {entry.amount}
                    </span>
                    <span className="text-gray-500">{entry.type}</span>
                    <span className="text-gray-500">{entry.otherParty}</span>
                  </li>
                ))}
              </ul>
            </Modal>
          )}

          {configureDevice && (
            <Modal
              title=""
              onClose={() => setConfigureDevice(false)}
              className="w-[500px] h-auto no-scrollbar overflow-y-auto bg-white"
            >
              <div className="max-w-lg mx-auto p-4">
                {/* Step Progress Bar */}
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all",
                          index <= currentStep
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        )}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={cn(
                          "text-sm mt-2 transition-all",
                          index <= currentStep ? "text-black" : "text-gray-400"
                        )}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <Card className="p-6 shadow-lg">
                  <CardContent>
                    {currentStep === 0 ? (
                      <div className="flex flex-col justify-center gap-4 items-center">
                        <h2 className="text-lg mb-1 flex items-center gap-2">
                          SELECT DEVICE
                        </h2>
                        <div className="flex flex-col font-syne items-center w-full">
                          <div className="gap-6 w-full mb-6">
                            {devicesList.map((device) => (
                              <div
                                key={device.model}
                                onClick={() => handleDeviceSelect(device)}
                                className={`flex cursor-pointer justify-between items-center gap-x-9 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg shadow-md mb-4 
                           ${
                             selectedDevice?.model === device.model
                               ? "border-4 border-black"
                               : "border"
                           } 
                            hover:translate-x-1 hover:translate-y-1 transition-all`}
                              >
                                {/* Device Image */}
                                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={device.photoUrl}
                                    width={10}
                                    height={10}
                                    alt={device.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                {/* Device Name */}
                                <h3 className="text-lg text-wrap font-medium text-gray-800">
                                  {device.name}
                                </h3>
                              </div>
                            ))}
                          </div>

                          {/* Selected Device Details */}
                          {selectedDevice && (
                            <div className="w-full mb-6 p-4 bg-gray-50 rounded-lg">
                              <h4 className="text-lg font-semibold mb-2">
                                Selected Device Details:
                              </h4>
                              <p>
                                <span className="font-medium">Name:</span>{" "}
                                {selectedDevice.name}
                              </p>
                              <p>
                                <span className="font-medium">
                                  Device Model:
                                </span>{" "}
                                {selectedDevice.model}
                              </p>
                            </div>
                          )}

                          <Button
                            className="bg-black hover:bg-gray-800 w-full"
                            onClick={() => addDevice()}
                          >
                            ADD DEVICE
                          </Button>
                        </div>
                      </div>
                    ) : currentStep === 1 ? (
                      <div className="flex flex-col justify-center gap-4 items-center">
                        <h2 className="text-lg mb-1 flex items-center gap-2">
                          AUTHENTICATE DEVICE
                        </h2>

                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex gap-x-2">
                            <Key className="w-5 h-5" />
                            <label>Enter Device Public Key</label>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter public key"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            onChange={(e) => setPublicKey(e.target.value)}
                            value={publicKey}
                          />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex gap-x-2">
                            <Keyboard className="w-5 h-5" />
                            <label>Enter Device PIN</label>
                          </div>
                          <input
                            type="password"
                            placeholder="Enter PIN"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            onChange={(e) => setPrivateKey(e.target.value)}
                            value={privateKey}
                          />
                        </div>

                        {invalidCreds && (
                          <p className="text-red-500 text-sm">
                            Invalid credentials. Please check and try again.
                          </p>
                        )}

                        {!authSuccess ? (
                          loading ? (
                            <div className="flex flex-col gap-y-4 mt-6 text-center w-56 items-center justify-center">
                              <Loader />
                              <span>Validating Credentials...</span>
                            </div>
                          ) : (
                            <Button
                              className="bg-black hover:bg-gray-800 w-full"
                              onClick={handleAuthentication}
                              disabled={loading || !publicKey || !privateKey}
                            >
                              VALIDATE DEVICE
                            </Button>
                          )
                        ) : loading ? (
                          <div className="flex flex-col gap-y-4 mt-6 text-center w-56 items-center justify-center">
                            <Loader />
                            <span>Registering Device...</span>
                          </div>
                        ) : (
                          <Button
                            className="bg-green-600 hover:bg-green-700 w-full"
                            onClick={handleRegistration}
                            disabled={loading}
                          >
                            REGISTER ON-CHAIN
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-8">
                        <h2 className="text-lg mb-10 font-archivo font-semibold flex items-center gap-2">
                          CREATE TRANSACTION
                        </h2>
                        <div className="text-green-500 flex gap-x-2">
                          <CheckCircleIcon className="text-green-500" />
                          Authentication Successful
                        </div>
                        {loading ? (
                          <div className="flex flex-col items-center gap-y-4 justify-center">
                            <Loader />
                            <span>Writing Transaction...</span>
                          </div>
                        ) : transactionCompleted ? (
                          <div className="text-green-500 flex gap-x-2">
                            <CheckCircleIcon />
                            <span>Transaction Completed Successfully</span>
                          </div>
                        ) : (
                          <button
                            className="bg-black text-white px-4 py-2 rounded-lg flex gap-x-1 hover:bg-gray-800"
                            onClick={() => createTransaction()}
                          >
                            {" "}
                            <Pen size={20} className="mr-2" />
                            <span>Write On-Chain Transaction</span>
                          </button>
                        )}

                        <div className="flex gap-x-4">
                          <span>Transactions are written on</span>
                          <Image src={Starknet} alt="Starknet" width={100} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Modal>
          )}

          {/* Start Scan Button */}
          {company.currentActiveDevices.some(
            (device) => device.state === "Configured"
          ) && (
            <div className="flex justify-center mt-10">
              <Button
                className="bg-black text-white"
                onClick={() => startScan()}
              >
                <ScanSearchIcon size={20} className="mr-2" />
                <span>START CARBON EMISSION SCAN</span>
              </Button>
            </div>
          )}

          {company.currentActiveDevices.length > 0 &&
            !company.currentActiveDevices.some(
              (device) => device.state === "Configured"
            ) && (
              <div className="flex flex-col items-center mt-10">
                <Button
                  className="bg-black text-white opacity-50 cursor-not-allowed"
                  onClick={() => setShowTerminal(true)}
                  disabled
                >
                  <ScanSearchIcon size={20} className="mr-2" />
                  <span>START CARBON EMISSION SCAN</span>
                </Button>
                <p className="text-sm text-red-500 mt-2">
                  Please configure devices to initiate scan.
                </p>
              </div>
            )}

          {showTerminal && (
            <EmissionScanTerminal onClose={() => setShowTerminal(false)} />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 h-full">
          <h1 className="text-xl mt-20 text-center">
            Your Company has not been registered.
          </h1>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            onClick={() => handleRegisterCompany()}
          >
            <span>REGISTER COMPANY</span>
          </button>
        </div>
      )}
    </div>
  );
};

const CompanyDetails: CompanyProps = {
  address: "",
  name: "",
  location: "",
  ecoscore: null,
  carbonCredits: 0,
  carbonEmissions: null,
  rank: null,
  previousRank: null,
  creditHistory: [
    // { date: "2025-02-01", amount: "+12", type: "Credit Purchase", id: "#TXN123",otherParty: "XYZ Company" },
    // { date: "2024-08-28", amount: "-15", type: "Emission Offset", id: "#TXN456",otherParty: "SmartTech Solutions" },
    // { date: "2024-01-20", amount: "+24", type: "Credit Purchase", id: "#TXN789",otherParty: "EcoTech Innovations" },
    // { date: "2023-06-10", amount: "-5", type: "Emission Offset", id: "#TXN101",otherParty: "GreenTech Inc" },
    // { date: "2022-12-25", amount: "-15", type: "Emission Offset", id: "#TXN113",otherParty: "GreenTech Inc" },
  ],
  currentActiveDevices: [],
  scanHistory: [],
};

export default YourCompany;
