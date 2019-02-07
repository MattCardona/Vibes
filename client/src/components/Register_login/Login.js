import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Forms/FormField';

class Login extends Component {
  constructor(props){
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
  submitForm(e) {

  }
  updateForm(element) {

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

        </form>
      </div>
    )
  }
};

export default connect()(Login);