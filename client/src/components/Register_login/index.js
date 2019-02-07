import React from 'react';
import MyButton from '../utils/button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
     <div className="container">
      <div className="register_login_container">
        <div className="left">
          <h1>New Customers</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ea odit facilis doloremque placeat accusantium veritatis earum? Iste animi quos laboriosam, dicta illo dolores praesentium eaque fugiat minima officiis laudantium?</p>
          <MyButton
            type="default"
            title="Create account"
            linkTo="register"
            addStyles={{
              margin: '10px 0 0 0'
            }}
          />
        </div>

        <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please login</p>
            <Login />
        </div>

      </div>
     </div>
    </div>
  )
};

export default RegisterLogin;