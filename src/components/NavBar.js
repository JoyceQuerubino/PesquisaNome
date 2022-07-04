import React from 'react';
import { BsLinkedin, BsGithub, BsWhatsapp } from 'react-icons/bs';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark bg-color">
      <a className="navbar-brand" href="/">
        <h3 className="mx-4" id="logo">
          Origin<span>OfName</span>
        </h3>
      </a>
      <div className="navbar-brand icons">
        <a
          className="mx-2"
          href="https://github.com/cleosilva"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          <BsGithub size={25} color="FFF" />
        </a>
        <a
          className="mx-2"
          href="https://www.linkedin.com/in/cleo-silva/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin size={25} color="FFF" />
        </a>
        <a
          className="mx-2"
          href="https://api.whatsapp.com/send?phone=5512981420014&text=Entre%20em%20contato%20Cleo"
          target="_blank"
          rel="noreferrer"
        >
          <BsWhatsapp size={25} color="FFF" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
