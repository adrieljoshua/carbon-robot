import { ArrowRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { IconType } from "react-icons"; // To type the icon properly

interface CompanyCardProps {
  company: {
    name: string;
    carbonCredits: number;
    leaderboardRank: number;
    prevLeaderboardRank: number;
  };
  logo: IconType;  // This is the prop for the logo icon
}


const CompanyCard: React.FC<CompanyCardProps> = ({ company, logo: Logo, onViewCompany }) => {
  const isLeaderboardImproved = company.leaderboardRank < company.prevLeaderboardRank;

  return (
    <div className="w-80 rounded-lg p-4
      border-2 border-black bg-white 
      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
      hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] 
      active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0">
      
      {/* Carbon Credits */}
      <div className="flex items-center">
        <div className={`flex items-center gap-1 px-2 py-1 text-sm text-black font-vt323 border border-black rounded-full`}>
          {company.carbonCredits} Credits
        </div>
      </div>

      {/* Company Details */}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-syne font-semibold">{company.name}</h2>
        {/* Render the logo */}
        <div className="w-14 h-14 border border-black rounded-full flex items-center justify-center overflow-hidden">
          <Logo size={32} className="text-black" />
        </div>
      </div>

      {/* Leaderboard Rank */}
      <div className={`mt-2 px-3 py-1 flex items-center gap-x-3 text-sm font-vt323 border border-black rounded-full max-w-fit ${isLeaderboardImproved ? "text-green-600" : "text-red-600"}`}>
        #{company.leaderboardRank} on ECO-LEADERBOARD
        {isLeaderboardImproved ? <ArrowUpRight size={14} className="text-green-600" /> : <ArrowDownRight size={14} className="text-red-600" />}
      </div>

      {/* Divider */}
      <div className="border-t border-black mt-4 mb-2"></div>

      {/* View Company Button */}
      <div className="flex justify-end gap-x-3 items-center cursor-pointer" onClick={onViewCompany}>
        <span className="text-sm font-syne">View Company</span>
        <ArrowRight />
      </div>
    </div>
  );
};

export default CompanyCard;
