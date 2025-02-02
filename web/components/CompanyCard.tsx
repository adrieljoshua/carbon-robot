import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "../public/vercel.svg";


interface CompanyCardProps {

    className?: string;

}



const CompanyCard: React.FC<CompanyCardProps> = ({ className }) => {

    return (

        <div className="w-80 rounded-lg p-4 
   border-2 border-black bg-white 
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0" >
      {/* Top Badge */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 px-2 py-1 text-sm font-vt323 border border-black rounded-full">
          1.085 Carbon in Tonnes <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Company Details */}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-syne font-semibold">ABC Company</h2>
        <div className="w-14 h-14 border border-black rounded-full">
        <img src={Image.src} className="ch-10 w-10" alt="vercel" />
        </div>
        
      </div>

      {/* Leaderboard Badge */}
      <div className="mt-2 px-3 py-1 text-sm font-vt323 border border-black rounded-full w-fit">
        #45 on ECO-LEADERBOARD
      </div>

      {/* Divider */}
      <div className="border-t border-black mt-4 mb-2"></div>

      {/* View Company Button */}
      <div className="flex justify-end gap-x-3 items-center cursor-pointer">
        <span className="text-sm font-syne">View Company</span>
        <ArrowRight />
      </div>
    </div>

    );

};

export default CompanyCard;
