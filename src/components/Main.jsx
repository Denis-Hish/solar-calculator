import React from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import AnimatedBackground from './AnimatebBackground';

const Main = () => {
  return (
    <main>
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
                value=''
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
                value=''
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
      <div className='device-list'>
        <div className='container'>
          <div className='title-table'>
            <h6>Список устройств</h6>
            <Button variant='outlined'>Очистить</Button>
          </div>
          <div className='input-group devices-input-group'>
            <span className='index-number input-group-text'>1</span>
            <TextField
              id='name_device'
              type='text'
              label='Название устройства'
              className='device custom-input-inset form-control'
              value=''
            />
            <TextField
              id='working_hours'
              type='number'
              label='Время работы'
              className='device custom-input-inset form-control'
              value=''
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
              value=''
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
              value=''
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
              value=''
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Ам/ч</InputAdornment>
                ),
              }}
            />
            <Button className='btn-line add' variant='outlined'>
              <PlusLg />
            </Button>
            <Button
              className='btn-line remove'
              variant='outlined'
              color='error'
            >
              <DashLg />
            </Button>
          </div>
        </div>
      </div>
      <AnimatedBackground />
    </main>
  );
};

export default Main;
