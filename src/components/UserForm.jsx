import React from 'react'
import styled from 'styled-components'

export default function Form(props) {
  const {formValue, disabled, errors, change, submit} = props

  const onSubmit = (event) =>{
    event.preventDefault();
    submit();
  }
  const onChange = (event) => {
    const {name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse)
  }

  return (
    <StyledFormDiv>
      <h2>Add your infomation:</h2>
      <form onSubmit={onSubmit}>

        <label>Name:{' '}
          <input 
          type="text"
          name="name"
          value={formValue.name}
          onChange={onChange}

          />
        </label>

        <label>Email:{' '}
          <input 
          type="text"
          name="email"
          value={formValue.email}
          onChange={onChange}
          />
        </label>

        <label>Password:{' '}
          <input 
            type="password"
            name="password"
            value={formValue.password}
            onChange={onChange}
            />
        </label>

        <label>Terms of Service:{' '}
          <input 
            type="checkbox"
            name="terms"
            value={formValue.terms}
            onChange={onChange}
            />
        </label>
        {/*  DISABLE THE BUTTON */}
        <button  disabled={disabled}>Submit</button>

        {/* RENDER THE VALIDATION ERRORS HERE */}
        <div>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
      </form>
      
    </StyledFormDiv>
  )
}

const StyledFormDiv = styled.div`

  font-size: ${(props) =>  props.theme.fontSize};
  /* border: 1.5px solid ${(props) =>  props.theme.primaryColor}; */
  color: ${(props) =>  props.theme.thirdColor};
  padding: 2%;
  font-family: sans-serif;
  font-weight: bold;

  label{
    margin: 0 2%;
  }


  button{
    background-color: ${(props) =>  props.theme.thirdColor};
    border-radius: 10px;
    border: none;
    padding: 1%;
    font-weight: bold;
    font-size: ${(props) =>  props.theme.fontSize};
    color: ${(props) =>  props.theme.primaryColor};
  }

`