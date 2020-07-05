import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Forms/FormField';
import { update, generateData, isFormValid } from '../utils/Forms/formActions';

import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.state = {
      formError: false,
      formSuccess: '',
      formdata: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email_input',
            type: 'email',
            placeholder: 'Enter your email'
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        }
      }
    }
  }
  submitForm = async (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");
    if (!formIsValid) {
      this.setState(({ formError: true }));
    } else {
      let data = await this.props.loginUser(dataToSubmit);
      if (data.loginSuccess) {
        // console.log("Success we have takeoff");
        this.props.history.push("/user/dashboard");
      }
    }
  }
  updateForm(element) {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState(() => ({
      formError: false,
      formdata: newFormdata
    }));
  }
  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>

          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />
          {this.state.formError ?
            <div className="error_label">
              Please check your data
            </div>
            :
            null
          }
          <button onClick={this.submitForm}>Login</button>
        </form>
      </div>
    )
  }
};

export default connect(undefined, { loginUser })(withRouter(Login));