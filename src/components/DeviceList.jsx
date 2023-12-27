import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import { Button, TextField, InputAdornment } from '@mui/material';

const DeviceList = ({
  updateTotalDevicePower,
  onSelectVoltChange,
  selectVolt,
}) => {
  const [lines, setLines] = useState(() => {
    const savedLines = getLocalStorage('lines', [{ id: 1 }]);
    return savedLines;
  });

  const [deviceData, setDeviceData] = useState(() => {
    const savedDeviceData = getLocalStorage('deviceData', {});
    return savedDeviceData;
  });

  // const safeDivision = (numerator, denominator) => {
  //   return denominator !== 0 ? numerator / denominator : 0;
  // };

  const addLine = () => {
    const newId = uuidv4();
    setLines([...lines, { id: newId }]);
  };

  const removeLine = (id) => {
    const updatedLines = lines.filter((line) => line.id !== id);
    setLines(updatedLines);
  };

  useEffect(() => {
    setLocalStorage('lines', lines);
  }, [lines]);

  useEffect(() => {
    const savedDeviceData = getLocalStorage('deviceData', {});
    setDeviceData(savedDeviceData);

    const savedSelectVolt = parseFloat(getLocalStorage('selectVolt', ''));
    onSelectVoltChange(savedSelectVolt);
  }, [onSelectVoltChange]);

  const [totalDevicePower, setTotalDevicePower] = useState({});

  const handleDeviceChange = (id, field, value) => {
    setDeviceData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    setLocalStorage('deviceData', deviceData);
  }, [deviceData]);

  useEffect(() => {
    if (selectVolt !== null) {
      const updatedTotalDevicePower = lines.reduce((total, line) => {
        const lineTotalPower =
          deviceData[line.id]?.workingHours *
            deviceData[line.id]?.devicePower || 0;
        return { ...total, [line.id]: lineTotalPower };
      }, {});
      setTotalDevicePower(updatedTotalDevicePower);
      if (onSelectVoltChange) {
        onSelectVoltChange(selectVolt);
      }
    }
  }, [lines, deviceData, selectVolt, onSelectVoltChange]);

  useEffect(() => {
    updateTotalDevicePower(totalDevicePower);
  }, [totalDevicePower, updateTotalDevicePower]);

  return (
    <div className='device-list'>
      <div className='container'>
        <div className='title-table'>
          <h6>Список устройств</h6>
          <Button variant='outlined'>Очистить</Button>
        </div>
        {lines.map((line, index) => (
          <div className='input-group devices-input-group' key={line.id}>
            <span className='index-number input-group-text'>{index + 1}</span>
            <TextField
              id='name_device'
              type='text'
              label='Название устройства'
              className='device custom-input-inset form-control'
              value={deviceData[line.id]?.deviceName || ''}
              onChange={(e) =>
                handleDeviceChange(line.id, 'deviceName', e.target.value)
              }
            />
            <TextField
              id='working_hours'
              type='number'
              label='Время работы'
              className='device custom-input-inset form-control'
              value={deviceData[line.id]?.workingHours || ''}
              onChange={(e) =>
                handleDeviceChange(line.id, 'workingHours', e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>часов</InputAdornment>
                ),
              }}
            />
            <TextField
              id='power_device'
              type='number'
              label='Мощность устройства'
              className='device custom-input-inset form-control'
              value={deviceData[line.id]?.devicePower || ''}
              onChange={(e) =>
                handleDeviceChange(line.id, 'devicePower', e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Вт</InputAdornment>
                ),
              }}
            />
            <TextField
              id='consumption consumption-wt'
              type='number'
              label='Потребление'
              className='device custom-input form-control'
              disabled
              readOnly
              value={
                totalDevicePower[line.id] !== 0
                  ? totalDevicePower[line.id] !== undefined
                    ? totalDevicePower[line.id] % 1 === 0
                      ? totalDevicePower[line.id].toFixed(0)
                      : totalDevicePower[line.id].toFixed(2)
                    : ''
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Вт/ч</InputAdornment>
                ),
              }}
            />
            <TextField
              id='consumption consumption-am'
              type='number'
              label='Потребление'
              className='device custom-input form-control'
              disabled
              readOnly
              value={0}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Ам/ч</InputAdornment>
                ),
              }}
            />
            <Button
              className='btn-line add'
              variant='outlined'
              onClick={() => addLine()}
            >
              <PlusLg />
            </Button>
            <Button
              className='btn-line remove'
              variant='outlined'
              color='error'
              onClick={() => removeLine(line.id)}
            >
              <DashLg />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
