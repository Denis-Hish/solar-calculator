import React, { useState } from 'react';
import logoImg from '../img/flesh_logo.png';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
  /* Change language */
  const [language, setLanguage] = useState('UA');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  /* ------------------------------------------- */

  return (
    <header>
      <div className='container'>
        <div className='header-logo'>
          <img src={logoImg} alt='Logo' />
        </div>
        <div className='header-title'>
          <h1>Solar calculator</h1>
        </div>
        <div className='language-selector'>
          <FormControl fullWidth>
            <Select value={language} onChange={handleChange}>
              <MenuItem value={'RU'}>RU</MenuItem>
              <MenuItem value={'UA'}>UA</MenuItem>
              <MenuItem value={'PL'}>PL</MenuItem>
              <MenuItem value={'EN'}>EN</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </header>
  );
};

export default Header;
