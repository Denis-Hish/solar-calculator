import React, { useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { TextField, InputAdornment } from '@mui/material';

function Settings({ updateTotalDevicePower, totalDevicePower }) {
   const [is12V, setIs12V] = useState(() => {
      const savedToggleState = getLocalStorage('toggleState', false);
      return savedToggleState;
   });

   const [error, setError] = useState(false);

   const handleChange = () => {
      setIs12V(!is12V);
   };

   const [daylightHours, setDaylightHours] = useState(() => {
      const savedDaylightHours = getLocalStorage('daylightHours', '');
      return savedDaylightHours;
   });

   const handleDaylight = e => {
      const newValue = e.target.value;
      setDaylightHours(newValue);
      setError(newValue > 24);
   };

   const calculateTotalDevicePower = () => {
      if (!totalDevicePower) return 0;
      return Object.values(totalDevicePower).reduce(
         (acc, value) => acc + value,
         0
      );
   };

   useEffect(() => {
      setLocalStorage('toggleState', is12V);
   }, [is12V]);

   useEffect(() => {
      setLocalStorage('daylightHours', daylightHours);
   }, [daylightHours]);

   useEffect(() => {
      const savedToggleState = getLocalStorage('toggleState', false);
      setIs12V(savedToggleState);

      const savedDaylightHours = getLocalStorage('daylightHours', '');
      setDaylightHours(savedDaylightHours);
   }, []);

   useEffect(() => {
      updateTotalDevicePower(totalDevicePower);
   }, [totalDevicePower, updateTotalDevicePower]);

   const voltageValue = !is12V ? 12 : 24;

   return (
      <div className="settings">
         <div className="container">
            <div className="row">
               <div className="col">
                  <div className="select-volt">
                     <label className="label">
                        <div className="toggle">
                           <input
                              className="toggle-state"
                              type="checkbox"
                              name="check"
                              value="check"
                              checked={is12V}
                              onChange={handleChange}
                           />
                           <div className="indicator"></div>
                        </div>
                        <div className="label-text">
                           {!is12V ? '12V' : '24V'}
                        </div>
                     </label>
                  </div>

                  <TextField
                     className="length-daylight"
                     label="Световой день"
                     variant="outlined"
                     type="number"
                     autoComplete="off"
                     value={daylightHours}
                     onChange={handleDaylight}
                     error={error}
                     helperText={
                        error
                           ? 'Световой день не может быть больше 24 часов'
                           : ''
                     }
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">часов</InputAdornment>
                        ),
                     }}
                  />
               </div>
               <div className="col">
                  <h6>У тебя есть:</h6>
                  <p>
                     Потребление <span>{calculateTotalDevicePower()}</span> Вт/ч
                  </p>
                  <p>
                     Потребление{' '}
                     <span>
                        {(calculateTotalDevicePower() / voltageValue).toFixed(
                           2
                        )}
                     </span>{' '}
                     Ам/ч
                  </p>
               </div>
               <div className="col">
                  <h6>Тебе нужно:</h6>
                  <p>
                     Мощность панелей <span>400</span> Вт
                  </p>
                  <p>
                     Получение энергии <span>1600</span> Вт/ч
                  </p>
                  <p>
                     Зарядит аккумуляторы на <span>150</span> Ам/ч
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Settings;
