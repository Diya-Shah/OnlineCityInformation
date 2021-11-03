import React, { useDebugValue } from 'react'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Assets/navbar.css';

const Navbar = () => {
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="nav">
  <div className="container-fluid">

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <img src="/images/logo.png" height="90px" width="90px" id="img" />
      <ul className="navbar-nav ml-auto ml-2 ml-lg-0" id="ul">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/signin">SignIn</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/contact">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/">LogOut</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar