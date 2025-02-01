import Link from "next/link";
import Cursor from "../public/images/cursor.png"
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
      <p className=" text-gray-400 wrap">Smart Automation for Carbon Credit Management</p>
      </div>
      <Link href="/landing-page">
      <button className="px-6 py-2 mt-12 font-archivo cursor- text-black font-bold text-lg border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">        GET STARTED
      </button>

      </Link>
    </div>
  );
}
