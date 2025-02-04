import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Monitor } from 'lucide-react';

const devices = [
  { 
    name: "FLIR A615 Thermal Camera", 
    photoUrl: "/images/FLIR-A615-Thermal-Camera.png" 
  },
  { 
    name: "AeroVironment Quantix Drone", 
    photoUrl: "/images/AeroVironment Quantix Drone.png" 
  },
  { 
    name: "SenseFly eBee X Drone", 
    photoUrl: "/images/SenseFly eBee X Drone.png"
  },
  { 
    name: "Horiba PG-250 Portable Gas Analyzer", 
    photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png" 
  }
];

const DeviceCard = ({ name, photoUrl }) => (
  <div className="flex items-center p-1 bg-white cursor-pointer w-full 
    ">
    <img 
      src={photoUrl} 
      alt={name} 
      className="w-10 h-10 object-contain mr-4"
    />
    <div>
      <h3 className="text-xs font-syne ">{name}</h3>
    </div>
  </div>
);

const DeviceDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="overflow-y-auto 
        shadow-lg p-2 rounded-lg bg-white" 
      >
        <div className="space-y-2">
          {devices.map((device, index) => (
            <DeviceCard 
              key={index}
              name={device.name}
              photoUrl={device.photoUrl}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeviceDropdown;