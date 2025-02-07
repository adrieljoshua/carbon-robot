import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";


interface OfferCardProps {
    orgName: string;
    offer: number;
    inExchangeFor: number;
    isOfferCredits: boolean;
    image?: StaticImageData;
}

const OfferCard: React.FC<OfferCardProps> = ({ orgName, offer, inExchangeFor, image }) => {
    //TODO: Filter Cards
    return(
     <div className="w-80 rounded-lg p-4
      border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] 
      active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0"> 
        {/* Company Details */}
        <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl font-syne font-semibold">{orgName}</h2>
            {/* Render the logo */}
            {image && (
                <div className="w-24 h-24  border-black rounded-full flex items-center justify-center overflow-hidden">
                    <Image src={image.src} alt=""/>
                </div>
            )}
        </div>
      {/* Carbon Credits */}
      <div className="flex items-center">
        <div className={`flex items-center gap-1 px-2 py-1 text-lg text-black font-syne `}>
          Offer: <span className="">{offer} Credits</span>
        </div>
      </div>
      <div className={`mt-2 px-3 py-1 flex items-center gap-x-3 text-lg 3 max-w-fit`}>
        In Exchange For: <span>${inExchangeFor}</span>
      </div>
      {/* Divider */}
      <div className="border-t border-black mt-4 mb-2"></div>
      <div className="flex justify-end gap-x-3 items-center cursor-pointer">
        <span className="text-sm font-syne">Accept Offer</span>
        <ArrowRight />
      </div>
    </div>
    );
}

export default OfferCard;