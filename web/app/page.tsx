import Link from "next/link";
import Button from "../components/user-defined/NeoButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" 
    style={{
      backgroundImage: "url('/images/bg.jpg'),linear-gradient(to bottom, #000000, #000000)" ,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="text-center font-tactical mt-16">
      <h1 className="text-7xl font-extrabold mb-4">Carbon-Robot</h1>
      <p className=" text-gray-400 font-syne font-semibold wrap mb-12">Smart Automation for Carbon Credit Management</p>
      </div>
      <Link href="/dashboard">
      <Button name="GET STARTED"/>

      </Link>
    </div>
  );
}
