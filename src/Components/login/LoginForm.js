import React, { useEffect, useState } from 'react'

import { Outlet } from "react-router-dom";
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import Registration from '../registration/Registration';

function LoginForm() {
  localStorage.removeItem('token');
  const navigate = useNavigate();
    const [data,setData]=useState([]);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const emailChange = (e) => {
        setEmailValue(e.target.value)
     }
     const passwordChange = (e) => {
        setPasswordValue(e.target.value)
     }
     
    const getData= async()=>{
        try{
            
              const response=await fetch(`https://test.e-prathibha.com/apis/login`,
            {method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: emailValue, password: passwordValue})});
            //setData(data);
            const data=await response.json();
            if(data.data.Token) {
              localStorage.setItem('token', data.data.Token);
              localStorage.setItem('id', data.data.Id);
              navigate('/exam');
            }
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }
    
    const handleRegistrationClick = () => {
        //setShowRegistration(true);
      };
      

  return (
    <div style={{padding:'20px', margin:'15px'}}>
        <form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={1}>
             Email
            </Form.Label>
            <Col sm={4}>
            <Form.Control type="email" id="email" value={emailValue} onChange={emailChange} autoComplete='off'/>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={1}>
             Password
            </Form.Label>
            <Col sm={4}>
            <Form.Control type="password" id="password" value={passwordValue} onChange={passwordChange} autoComplete='off'/><br/>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 4, offset: 2 }}>
            <Button type="button" onClick={() => getData()}>Login</Button>
            </Col>
            </Form.Group>
            
            <Link to="/register" >Registration</Link> 
            {/* &nbsp; &nbsp; &nbsp; */}
            {/* <Link to="/emailVerification">Email Verification</Link> */}
        </form>
    </div>
  )
}

export default LoginForm