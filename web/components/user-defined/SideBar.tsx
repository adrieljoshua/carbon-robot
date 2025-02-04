'use client'
import { Button } from "../ui/button";
import DevicesDropdown from "@/components/user-defined/DevicesDropdown";
import { useRouter } from "next/navigation";

const SideBar = () => {
    const router = useRouter();
    const handleRegisterCompany = () => {
        router.push("/register-company");
    }

    return(    
    <>  
        <aside className="hidden min-h-screen z-9 md:flex w-64 p-4 border-black items-center bg-white border-r-2 flex-col gap-y-6">
            <Button className=" text-white text-sm font-syne w-full" onClick={handleRegisterCompany}>Register Company</Button>
            <div className="flex items-center font-syne gap-x-2"><span>View Devices</span><DevicesDropdown /></div>
        </aside>
    </>
    )
}


export default SideBar;