import React, { useState } from 'react';
import { validation } from '../../validation';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Error from '../Error/Error';
import './FormRight.scss';

const FormRight = () => {
  ///////////////////////////////////////////////////////////////////////////
  // Form Data
  const [data, setData] = useState({
    ///////////////////////////////////////////////////////////////////////////
    // Email Data
    email: {
      id: 'email',
      value: '',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      rules: {
        emailVal: true,
        required: true
      },
      isValid: false,
      messages: []
    },

    ///////////////////////////////////////////////////////////////////////////
    // Password Data
    password: {
      id: 'password',
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      rules: {
        minLength: 6,
        required: true,
        passwordCheck: true,
        confirmPas: true,
      },
      isValid: false,
      messages: [],
      messageQuality: []
    },

    ///////////////////////////////////////////////////////////////////////////
    // Confirm Password Data
    confirmPassword: {
      id: 'confirmPassword',
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Confirm Password',
      },
      rules: {
        confirmPas: true,
        required: true,
      },
      isValid: false,
      messages: []
    },

    ///////////////////////////////////////////////////////////////////////////
    // Age Data
    age: {
      id: 'age',
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Age'
      },
      rules: {
        ageVal: true,
        required: false
      },
      isValid: false,
      messages: []
    },
    submitButton: true
  })

  ///////////////////////////////////////////////////////////////////////////
  // All inputs handler
  const changeHandler = (e, id, passwordVal) => {
    const resultData = { ...data };
    resultData[id].value = e.target.value;
    passwordVal = resultData.password.value
    let result = validation(resultData[id].value, resultData[id].rules, passwordVal);
    resultData[id].messages = result.messages;
    resultData[id].isValid = result.isValid;
    resultData.password.messageQuality = result.messageQuality;
    resultData.submitButton = true;
    if(resultData.email.isValid && resultData.password.isValid &&
      resultData.confirmPassword.isValid && resultData.age.isValid){
      resultData.submitButton = false;
    };
    setData(resultData);
  }

  const formChaneHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="form_right">
      <div className="top">Sign up</div>
      <form onSubmit={(e)=>{formChaneHandler(e)}}>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* // Email form group */}
        <div className="form-group">
          <Label elementType="label" for={data.email.id}>Email</Label>
          <Input
            elementType="input"
            changed={(e) => { changeHandler(e, data.email.id) }}
            value={data.email.value}
            id={data.email.id}
            config={{ ...data.email.elementConfig }}
          />

          {/* ////////////////////////////////////////////////////////// */}
          {/* Error Message */}
          {data.email.messages.map((errorMessage, index) => {
            return <Error elementType="error" key={index} className="error"> {errorMessage}  </Error>
          })}
        </div>

        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* // Password form group */}
        <div className="form-group">
          <Label elementType="label" for={data.password.id}>Password</Label>
          {/* ////////////////////////////////////////////////////////// */}
          {/* Quality Error Message */}
          {data.password.messageQuality.map((errorMessage, index) => {
            return <Error elementType="qualityError" key={index}> {errorMessage}  </Error>
          })}
          <Input
            elementType="input"
            changed={(e) => { changeHandler(e, data.password.id) }}
            value={data.password.value}
            id={data.password.id}
            config={{ ...data.password.elementConfig }}
          />
          {/* ////////////////////////////////////////////////////////// */}
          {/* Error Message */}
          {data.password.messages.map((errorMessage, index) => {
            return <Error elementType="error" key={index}> {errorMessage}  </Error>
          })}
        </div>

        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* // Confirm Password form group */}
        <div className="form-group">
          <Label elementType="label" for={data.confirmPassword.id}>Confirm Password</Label>

          <Input
            elementType="input"
            changed={(e) => { changeHandler(e, data.confirmPassword.id) }}
            value={data.confirmPassword.value}
            id={data.confirmPassword.id}
            config={{ ...data.confirmPassword.elementConfig }}
          />
          {/* ////////////////////////////////////////////////////////// */}
          {/* Error Message */}
          {data.confirmPassword.messages.map((errorMessage, index) => {
            return <Error elementType="error" key={index} className="error"> {errorMessage}  </Error>
          })}
        </div>

        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* // Age form group */}
        <div className="form-group">
          <Label elementType="label" for={data.age.id}>Age:</Label>

          <Input
            elementType="input"
            changed={(e) => { changeHandler(e, data.age.id) }}
            value={data.age.value}
            id={data.age.id}
            config={{ ...data.age.elementConfig }}
          />
          {/* ////////////////////////////////////////////////////////// */}
          {/* Error Message */}
          {data.age.messages.map((errorMessage, index) => {
            return <Error elementType="error" key={index} className="error"> {errorMessage}  </Error>
          })}
        </div>

        <Input
          elementType="submit"
          disabled={data.submitButton}
          type="submit"
          value="Sugn up" />
      </form>
    </div>
  );
}

export default FormRight;
