"use client";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import WalletConnect from "./WalletConnect";

const TopBar = () => {
  return (
    <header className="flex items-center w-full right-0 justify-between px-6 py-4 border-b-2 top-0 sticky bg-white z-10 border-black">
      <Image src={Logo} alt="Logo" width={90} height={90} className="ml-6" />
      <WalletConnect />
    </header>
  );
};

export default TopBar;
