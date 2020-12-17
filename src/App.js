import './App.css';
import Form from './components/UserForm';
import User from './components/User'
import React, { useState, useEffect } from "react";
import formSchema from './components/formSchema';
import axios from 'axios';
import * as yup from "yup";
import styled from 'styled-components'

//////////////// INITIAL STATES ///////////////
const initialUsers = [];

const initialFormValues= {
  name: "",
  email: "",
  password: "",
  terms: false,
};
const initialErrors = {
  name: "",
  email: "",
  password: "",
};

const initialDisabled = true;

function App() {

  ///// STATES //////
  const [savedUsers,setSavedUsers] = useState(initialUsers); //array

  const [formValues, setFormValues] = useState(initialFormValues); //object

  const [formErrors, setFormErrors]= useState(initialErrors); //object

  const [disabled, setDisabled]= useState(initialDisabled); //boolean

 /////// AXIOS POST /////////
  const postnewUser = (newUser)=>{
    axios
    .post('https://reqres.in/api/users',newUser)
    .then((res)=>{
      setSavedUsers([res.data,...savedUsers])
      setFormValues(initialFormValues)
    })
    .catch((err)=>{
      console.log("404!")
    })
  } 

  const submit = (event) => {

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: JSON.stringify(formValues.terms),
    };
    //adding the data to state
    postnewUser(newUser);
  }

  
 /////// VALIDATIONS SCHEMA
  // yup.reach will allow us to "reach" into the schema and test only one part.

  const inputChange = (name,value) =>{

    yup
    .reach(formSchema,name)
    .validate(value)
    .then((res)=>{
      setFormErrors({
        ...formErrors,[name]: "",
      })
    })

    .catch((err)=>{
      setFormErrors({
        ...formErrors,
        // validation error from schema
        [name]: err.errors[0],
      })
    })

    setFormValues({
      ...formValues,
      [name]: value
    })

  }

  useEffect(()=>{
    formSchema.isValid(formValues).then((valid)=>{
      setDisabled(!valid);
    });
  },[formValues])



  return (
    <div className="App">
      

        
        <Title>
          Advanced Form:
        </Title>

        <Form
          formValue={formValues}
          change={inputChange}
          disabled={disabled}
          errors={formErrors}
          submit={submit}
        />

        <div>
          {savedUsers.map((user)=>{
            return <User key={user.id} details={user} />
          })}
        </div>
      
    </div>
  );
}

export default App;


const Title = styled.h1 `
  color: ${(props) =>  props.theme.primaryColor};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4rem;
  text-shadow: 1px 1px 5px #f9813a;
`