import React, { useState } from 'react';
import Settings from './Settings';
import DeviceList from './DeviceList';

const Main = () => {
  const [totalDevicePower, setTotalDevicePower] = useState({});
  const [selectVolt, setSelectVolt] = useState('');

  return (
    <main>
      <Settings
        updateTotalDevicePower={setTotalDevicePower}
        totalDevicePower={totalDevicePower}
        onSelectVoltChange={(value) => setSelectVolt(value)}
      />
      <DeviceList
        updateTotalDevicePower={setTotalDevicePower}
        onSelectVoltChange={(value) => setSelectVolt(value)}
        selectVolt={selectVolt}
      />
    </main>
  );
};

export default Main;
