import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">

          <div className="left">
            <div className="logo">
              Vibes
          </div>
          </div>

          <div className="right">
            <div className="top">
              <Link to="/register_login">Login</Link>
            </div>
            <div className="bottom">
              Home Guitars
          </div>
          </div>

        </div>
      </header>
    )
  }
};

export default Header;