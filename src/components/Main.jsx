import React, { useState } from 'react';
import Settings from './Settings';
import DeviceList from './DeviceList';

const Main = () => {
  const [totalDevicePower, setTotalDevicePower] = useState({});

  return (
    <main>
      <Settings
        updateTotalDevicePower={setTotalDevicePower}
        totalDevicePower={totalDevicePower}
      />
      <DeviceList updateTotalDevicePower={setTotalDevicePower} />
    </main>
  );
};

export default Main;
