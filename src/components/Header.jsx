import logoImg from '../img/flesh_logo.png';

const Header = () => {
   return (
      <header>
         <div className="container">
            <div className="header-logo">
               <img src={logoImg} alt="Logo" />
            </div>
            <div className="header-title">
               <h1>Solar calculator</h1>
            </div>
            <div className="language-selector">
               UA
               {/* <div className="selected-language">
                  <div className="arrow"></div>
               </div>
               <ul className="language-options">
                  <li data-lang="ua">
                     <img src="img/flag-ukraine.jpg" alt="ua" />
                  </li>
                  <li data-lang="pl">
                     <img src="img/flag-poland.jpg" alt="pl" />
                  </li>
                  <li data-lang="en">
                     <img src="img/flag-english.jpg" alt="en" />
                  </li>
               </ul> */}
            </div>
         </div>
      </header>
   );
};

export default Header;
