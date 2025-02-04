import OfferCard from "../user-defined/OfferCard";
import Carbon from "../../public/images/carbon-credit.png";
import Cash from "../../public/images/cash.png";
const CreditSale = () => {
    
    return (
        <div className="flex flex-wrap justify-center mb-10 gap-x-4 w-full gap-y-6 mt-10">
            {offers.map((offering,index)=>(
                <OfferCard key={index} orgName={offering.orgName} offer={offering.offer} inExchangeFor={offering.inExchangeFor} isOfferCredits={offering.isOfferCredits} image={offering.isOfferCredits?Carbon:Cash}/>
            ))}
        </div>
    )
};

const offers = [
    {
        orgName: "XYZ Company",
        isOfferCredits: false,
        offer: 15,
        inExchangeFor: 1620,
    },
    {
        orgName: "Edutech Inc.",
        isOfferCredits: true,
        offer: 12,
        inExchangeFor: 1020,
    },
    {
        orgName: "ABC Company",
        isOfferCredits: false,
        offer: 20,
        inExchangeFor: 2500,
    },
    {
        orgName: "Science Foundation",
        isOfferCredits: true,
        offer: 25,
        inExchangeFor: 2020,
    },
    {
        orgName: "XYZ Company",
        isOfferCredits: false,
        offer: 15,
        inExchangeFor: 1620,
    },
    {
        orgName: "Edutech Inc.",
        isOfferCredits: true,
        offer: 12,
        inExchangeFor: 1020,
    },
    {
        orgName: "ABC Company",
        isOfferCredits: false,
        offer: 20,
        inExchangeFor: 2500,
    },
    {
        orgName: "Science Foundation",
        isOfferCredits: true,
        offer: 25,
        inExchangeFor: 2020,
    }

]
export default CreditSale;