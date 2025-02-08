import React from 'react';
import { Card, CardContent } from '../ui/card';
const Verify = () => {
    return (
        <div className="w-full font-syne min-h-screen p-10 text-black">
          <h1 className="text-4xl font-bold mb-2 border-b-4 border-spacing-4 pb-3 border-black tracking-wide">
            Verify Emission Report
          </h1>
          <div className='flex flex-col gap-6 justify-center items-center'>
            <Card className='mt-6 w-[800px] shadow-lg p-4'> 
              
              <CardContent className='flex flex-col justify-between w-full items-center'>
                <div className='flex flex-col w-full gap-2'>
                <label htmlFor="">Enter Report Transaction Hash</label>
                <input
                  type="text"
                  placeholder="eg. 0x12345...56789"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  
                />
                </div>
                
              </CardContent>
            </Card>
          </div>
        </div>
    )
}

export default Verify;