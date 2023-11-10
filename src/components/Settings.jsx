import React, { useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../localStorage';

function Settings() {
  const [is12V, setIs12V] = useState(() => {
    const savedToggleState = getLocalStorage('toggleState', false);
    return savedToggleState;
  });

  const handleChange = () => {
    setIs12V(!is12V);
  };

  const [daylightHours, setDaylightHours] = useState('');

  const handleDaylight = (e) => {
    const newValue = e.target.value;
    setDaylightHours(newValue);
    console.log('Введенное значение в поле:', newValue);
  };

  useEffect(() => {
    const savedToggleState = getLocalStorage('toggleState', false);
    setIs12V(savedToggleState);
    setLocalStorage('toggleState', savedToggleState);
  }, []);

  useEffect(() => {
    setLocalStorage('toggleState', is12V);
  }, [is12V]);

  return (
    <div className='settings'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='select-volt'>
              <label className='label'>
                <div className='toggle'>
                  <input
                    className='toggle-state'
                    type='checkbox'
                    name='check'
                    value='check'
                    checked={is12V}
                    onChange={handleChange}
                  />
                  <div className='indicator'></div>
                </div>
                <div className='label-text'>{!is12V ? '12V' : '24V'}</div>
              </label>
            </div>
            <div className='input-group length-daylight-input-group'>
              <input
                className='length-daylight form-control'
                type='number'
                placeholder='Световой день (часов)'
                value={daylightHours}
                onChange={handleDaylight}
              />
            </div>
          </div>
          <div className='col'>
            <h6>У тебя есть:</h6>
            <p>
              Потребление <span>800</span> Вт/ч
            </p>
            <p>
              Потребление <span>0</span> Ам/ч
            </p>
          </div>
          <div className='col'>
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
