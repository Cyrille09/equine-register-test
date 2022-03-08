import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="eqLogoMain">
      <Link to="/">
        <img src="/images/logo/logo.png" alt="no" className="eqLogo" />
      </Link>
    </div>
  );
}

export default Logo;
