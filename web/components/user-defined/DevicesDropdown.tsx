import React, { useState } from 'react';
import { devicesList } from './DeviceList';
import Modal from './Modal';
import Image from 'next/image';
import { Device } from '@/types/types';

interface DeviceDropdownProps {
  onClose: () => void;
}

const DeviceDropdown: React.FC<DeviceDropdownProps> = () => {  const [deviceSelected, setDeviceSelected] = useState<Device | null>(null);
  return (
    (
      <div className="flex flex-col font-syne items-center">
        <div className="gap-0 w-full mb-2">
          {devicesList.map((device) => (
            <div 
              key={device.model} 
              onClick={() => setDeviceSelected(device)}
              className={`flex cursor-pointer justify-between items-center gap-x-2  p-4 rounded-lg mb-4 
                 transition-all border border-black bg-white 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  duration-200 
      hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0`}
            >
              {/* Device Image */}
              <div className="w-12 h-12 flex items-center justify-center  overflow-hidden">
                <Image src={device.photoUrl} width={50} height={50} alt={device.name} className="" />
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
                <Image 
                  width={256}
                  height={256}
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