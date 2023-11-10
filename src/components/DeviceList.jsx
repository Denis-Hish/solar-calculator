import React, { useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { PlusLg, DashLg } from 'react-bootstrap-icons';

const DeviceList = () => {
  const [lines, setLines] = useState([{ id: 1 }]);

  const addLine = () => {
    const newId = lines.length + 1;
    setLines([...lines, { id: newId }]);
  };

  const removeLine = (id) => {
    const updatedLines = lines.filter((line) => line.id !== id);
    setLines(updatedLines);
  };

  const calculateTotalPower = (hours, power) => {
    return hours * power;
  };

  const updateTotalPower = (id, workingHours, power) => {
    const updatedLines = lines.map((line) => {
      if (line.id === id) {
        const totalPower = workingHours * power;
        return { ...line, workingHours, power, totalPower };
      }
      return line;
    });
    setLines(updatedLines);
  };

  return (
    <div className='device-list'>
      <div className='container'>
        <div className='title-table'>
          <h6>Список устройств</h6>
          <button type='button' className='btn btn-outline-primary'>
            Очистить
          </button>
        </div>
        {lines.map((line) => (
          <div className='input-group devices-input-group' key={line.id}>
            <span className='index-number input-group-text'>{line.id}</span>
            <input
              type='text'
              placeholder='Название устройства'
              className='device form-control'
            />
            <input
              type='number'
              placeholder='Время работы (часов)'
              className='device form-control'
              onChange={(e) =>
                updateTotalPower(line.id, e.target.value, line.power)
              }
            />
            <input
              type='number'
              placeholder='Мощность устройства (Вт/ч)'
              className='device form-control'
              onChange={(e) =>
                updateTotalPower(line.id, line.workingHours, e.target.value)
              }
            />
            <input
              type='text'
              className='device form-control'
              disabled
              readOnly
              value={`${
                line.totalPower || 'Общая мощность устройства (Вт/ч)'
              } Вт/ч`}
            />
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={() => addLine()}
            >
              <PlusLg />
            </button>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={() => removeLine(line.id)}
            >
              <DashLg />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
