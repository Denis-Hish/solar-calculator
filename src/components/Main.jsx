import React, { useState } from 'react';
import Settings from './Settings';
import DeviceList from './DeviceList';

const Main = () => {
   const [totalDevicePower, setTotalDevicePower] = useState({});
   const voltageValue = !totalDevicePower.is12V ? 12 : 24;

   return (
      <main>
         <Settings
            updateTotalDevicePower={setTotalDevicePower}
            totalDevicePower={totalDevicePower}
         />
         <DeviceList
            updateTotalDevicePower={setTotalDevicePower}
            voltageValue={voltageValue}
         />
      </main>
   );
};

export default Main;
