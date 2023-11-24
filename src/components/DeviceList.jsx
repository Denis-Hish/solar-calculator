import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import { Button, ButtonGroup, TextField, InputAdornment } from '@mui/material';

const DeviceList = ({ updateTotalDevicePower, voltageValue }) => {
   console.log(voltageValue);

   const [totalPower, setTotalPower] = useState(0);

   const [lines, setLines] = useState(() => {
      const savedLines = getLocalStorage('lines', [{ id: 1 }]);
      return savedLines;
   });

   const addLine = () => {
      const newId = uuidv4();
      setLines([...lines, { id: newId }]);
   };

   const removeLine = id => {
      const updatedLines = lines.filter(line => line.id !== id);
      setLines(updatedLines);
   };

   const updateTotalPower = (id, workingHours, power) => {
      const updatedLines = lines.map(line => {
         if (line.id === id) {
            const totalPower = workingHours * deviceData[id]?.devicePower || 0;
            return { ...line, workingHours, power, totalPower };
         }
         return line;
      });
      setLines(updatedLines);
   };

   useEffect(() => {
      setLocalStorage('lines', lines);
   }, [lines]);

   // State для сохранения значений полей ввода
   const [deviceData, setDeviceData] = useState(() => {
      const savedDeviceData = getLocalStorage('deviceData', {});
      return savedDeviceData;
   });

   const [totalDevicePower, setTotalDevicePower] = useState({});

   // Обработчики изменения значений полей ввода для конкретной строки
   const handleDeviceChange = (id, field, value) => {
      setDeviceData(prevData => ({
         ...prevData,
         [id]: {
            ...prevData[id],
            [field]: value,
         },
      }));
   };

   // Использование useEffect для сохранения и восстановления значений полей ввода
   useEffect(() => {
      setLocalStorage('deviceData', deviceData);
   }, [deviceData]);

   useEffect(() => {
      const updatedTotalDevicePower = lines.reduce((total, line) => {
         const lineTotalPower =
            deviceData[line.id]?.workingHours *
               deviceData[line.id]?.devicePower || 0;
         return { ...total, [line.id]: lineTotalPower };
      }, {});
      setTotalDevicePower(updatedTotalDevicePower);
   }, [lines, deviceData]);

   useEffect(() => {
      updateTotalDevicePower(totalDevicePower);
   }, [totalDevicePower, updateTotalDevicePower]);

   return (
      <div className="device-list">
         <div className="container">
            <div className="title-table">
               <h6>Список устройств</h6>
               <Button variant="outlined">Очистить</Button>
            </div>
            {lines.map((line, index) => (
               <div className="input-group devices-input-group" key={line.id}>
                  <span className="index-number input-group-text">
                     {index + 1}
                  </span>
                  <TextField
                     type="text"
                     label="Название устройства"
                     className="device form-control"
                     value={deviceData[line.id]?.deviceName || ''}
                     onChange={e =>
                        handleDeviceChange(
                           line.id,
                           'deviceName',
                           e.target.value
                        )
                     }
                  />
                  <TextField
                     type="number"
                     label="Время работы"
                     className="device form-control"
                     value={deviceData[line.id]?.workingHours || ''}
                     onChange={e =>
                        handleDeviceChange(
                           line.id,
                           'workingHours',
                           e.target.value
                        )
                     }
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">часов</InputAdornment>
                        ),
                     }}
                  />
                  <TextField
                     type="number"
                     label="Мощность устройства"
                     className="device form-control"
                     value={deviceData[line.id]?.devicePower || ''}
                     onChange={e =>
                        handleDeviceChange(
                           line.id,
                           'devicePower',
                           e.target.value
                        )
                     }
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">Вт/ч</InputAdornment>
                        ),
                     }}
                  />
                  <TextField
                     type="number"
                     label="Потребление"
                     className="device form-control"
                     disabled
                     readOnly
                     value={totalDevicePower[line.id] || ''}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">Вт/ч</InputAdornment>
                        ),
                     }}
                  />
                  <TextField
                     type="number"
                     label="Потребление"
                     className="device form-control"
                     disabled
                     readOnly
                     value={
                        totalDevicePower[line.id]
                           ? (totalDevicePower[line.id] / voltageValue).toFixed(
                                2
                             )
                           : ''
                     }
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">Ам/ч</InputAdornment>
                        ),
                     }}
                  />
                  <Button
                     className="btn-line add"
                     variant="outlined"
                     onClick={() => addLine()}
                  >
                     <PlusLg />
                  </Button>
                  <Button
                     className="btn-line remove"
                     variant="outlined"
                     color="error"
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
