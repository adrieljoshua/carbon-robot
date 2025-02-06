import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CheckCircle, Monitor } from 'lucide-react';
import { devicesList } from './DeviceList';
import Modal from './Modal';

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
  const [deviceSelected, setDeviceSelected] = useState(null);
  return (
    (
      <div className="flex flex-col font-syne items-center">
        <div className="gap-0 w-full mb-2">
          {devicesList.map((device) => (
            <div 
              key={device.model} 
              onClick={() => setDeviceSelected(device)}
              className={`flex cursor-pointer justify-between items-center gap-x-2 border hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-lg mb-4 
                hover:translate-x-1 hover:translate-y-1 transition-all border-2 border-black bg-white 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 
      hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0`}
            >
              {/* Device Image */}
              <div className="w-12 h-12 flex items-center justify-center  overflow-hidden">
                <img src={device.photoUrl} alt={device.name} className="w-full h-full object-contain" />
              </div>
  
              {/* Device Name */}
              <h3 className="text-sm text-wrap font-medium text-gray-800">{device.name}</h3>
            </div>
          ))}
          {/* Device Details Modal */}
          {deviceSelected && (
            <Modal 
              title="Device Details" 
              onClose={() => setDeviceSelected(null)} 
              className="w-[600px] no-scrollbar overflow-y-auto"
            >
              <div className="flex flex-col items-center no-scrollbar overflow-y-auto">
                <img 
                  src={deviceSelected.photoUrl} 
                  alt={deviceSelected.name} 
                  className="w-64 h-64 object-contain border-2 border-gray-200 mb-4" 
                />
                <div className="w-full space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Device Name:</span>
                    <span>{deviceSelected.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Device Model:</span>
                    <span>{deviceSelected.model}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Device Description:</span>
                    <span>{deviceSelected.description}</span>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div> 
      </div>
    )
  );
};

export default DeviceDropdown;