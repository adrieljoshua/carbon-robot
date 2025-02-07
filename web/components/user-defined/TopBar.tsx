'use client'
import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/images/logo.png";
import Wallet from "../../public/images/barvoos.png"

const TopBar = () => {
    const [walletAddress] = useState("0x1234567890abcdef1234567890abcdef12345678");
    const [walletConnected] = useState(true);

    function shortenAddress(address: string, chars = 4): string {
        return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
    }

    return (
    <header className="flex items-center w-full right-0 justify-between px-6 py-4 border-b-2 top-0 sticky bg-white z-10 border-black">
    <Image src={Logo} alt="Logo" width={90} height={90} className="ml-6" />    
        {walletConnected ? 
            <div className="flex place-items-center gap-2">
            <button className="font-vt323 px-1.5 py-2 rounded-3xl p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
                hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]  active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 
                active:translate-y-0  mr-2 text-black flex items-center">
                    <Image src={Wallet} width={60} height={60} alt="wallet image" className="w-10 h-10"></Image>
                    <span className="mr-2">{shortenAddress(walletAddress)}</span></button>
            <span className="font-syne text-xs">Wallet Connected</span>
            </div> : <div className="">             
            <button className="font-vt323 px-1.5 py-2 rounded-3xl p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
                hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]  active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 
                active:translate-y-0  mr-2 text-black flex items-center">
                    <Image src={Wallet} alt="wallet image" width={40} height={40} quality={100}/>
                    <span className="mr-2">Connect Wallet</span></button>
            </div>}
    </header>)
}

export default TopBar;