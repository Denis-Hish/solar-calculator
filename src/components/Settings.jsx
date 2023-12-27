import React, { useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { TextField, InputAdornment } from '@mui/material';

function Settings({
  updateTotalDevicePower,
  totalDevicePower,
  onSelectVoltChange,
}) {
  const [error, setError] = useState(false);
  const [daylightHours, setDaylightHours] = useState(() => {
    const savedDaylightHours = getLocalStorage('daylightHours', '');
    return savedDaylightHours;
  });

  const [selectVolt, setSelectVolt] = useState(() => {
    const savedSelectVolt = getLocalStorage('selectVolt', '');
    return savedSelectVolt !== '' ? parseFloat(savedSelectVolt) : null;
  });

  const handleSelectVoltChange = (e) => {
    const newValue = e.target.value;
    setSelectVolt(newValue);
    if (onSelectVoltChange) {
      onSelectVoltChange(newValue);
    }
  };

  const handleDaylight = (e) => {
    const newValue = e.target.value;
    setDaylightHours(newValue);
    setError(newValue > 24);
  };

  // const calculateTotalDevicePowerWt = () => {
  //   if (!totalDevicePower) return 0;
  //   return Object.values(totalDevicePower).reduce(
  //     (acc, value) => acc + value,
  //     0
  //   );
  // };

  useEffect(() => {
    setLocalStorage('selectVolt', selectVolt);
    const savedSelectVolt = getLocalStorage('selectVolt', '');
    setSelectVolt(savedSelectVolt !== '' ? parseFloat(savedSelectVolt) : null);

    setLocalStorage('daylightHours', daylightHours);
    const savedDaylightHours = getLocalStorage('daylightHours', '');
    setDaylightHours(savedDaylightHours);

    updateTotalDevicePower(totalDevicePower);
  }, [selectVolt, daylightHours, totalDevicePower, updateTotalDevicePower]);

  return (
    <div className='settings'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <TextField
              className='select-volt custom-input-inset'
              label='Напряжение'
              variant='outlined'
              type='number'
              autoComplete='off'
              value={selectVolt}
              onChange={handleSelectVoltChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>вольт</InputAdornment>
                ),
              }}
            />

            <TextField
              className='length-daylight custom-input-inset'
              label='Световой день'
              variant='outlined'
              type='number'
              autoComplete='off'
              value={daylightHours}
              onChange={handleDaylight}
              error={error}
              helperText={
                error ? 'Световой день не может быть больше 24 часов' : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>часов</InputAdornment>
                ),
              }}
            />
          </div>
          <div className='col'>
            <h6>У тебя есть:</h6>
            <p>
              Потребление <span>000</span> Вт/ч
            </p>
            <p>
              Потребление <span>000</span> Ам/ч
            </p>
          </div>
          <div className='col'>
            <h6>Тебе нужно:</h6>
            <p>
              Мощность панелей <span>000</span> Вт
            </p>
            <p>
              Получение энергии <span>000</span> Вт/ч
            </p>
            <p>
              Зарядит аккумуляторы на <span>000</span> Ам/ч
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
