import React from 'react'
import FontAwesomeIcon  from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid'

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Vibes</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Info</h2>
            <div className="business_info">

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faCompass}
                  className="icon"
                />
                <div className="info">
                  <div>Address</div>
                  <div>Hollywood blvd</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faPhone}
                  className="icon"
                />
                <div className="info">
                  <div>Phone #</div>
                  <div>555-555-5555</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faClock}
                  className="icon"
                />
                <div className="info">
                  <div>Hours</div>
                  <div>Mon-Sunday 6am-9pm</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon 
                  icon={faEnvelope}
                  className="icon"
                />
                <div className="info">
                  <div>Email</div>
                  <div>info@Vibes.com</div>
                </div>
              </div>

            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <p>About new products/deals.</p>
           </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;