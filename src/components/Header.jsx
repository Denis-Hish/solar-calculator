import logoImg from '../img/flesh_logo.png';

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='header-logo'>
          <img src={logoImg} alt='Logo' />
        </div>
        <div className='header-title'>
          <h1>Solar calculator</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
