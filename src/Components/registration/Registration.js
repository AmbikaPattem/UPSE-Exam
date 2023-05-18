import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Registration() {
    const [formData,setFormData]=useState({
        email:'',
        name:'',
        phone:'',
        photo:'',
        password:'',
        confirmPassword:''
    
    })
    const navigate=useNavigate();
    const emailChange=(e)=>{
        console.log(e);
        let data = {};
        if(e.target.id === 'email') {
            data['email'] = e.target.value;
        } else if(e.target.id === 'name') {
            data['name'] = e.target.value;
        } else if(e.target.id === 'phone') {
            data['phone'] = e.target.value;
        } else if(e.target.id === 'password') {
            data['password'] = e.target.value;
        } else if(e.target.id === 'confirmPassword') {
            data['confirmPassword'] = e.target.value;
        } 
        setFormData({...formData, ...data}); 
        console.log(formData);
    }
    const getRegisterData= async()=>{
        try{
            const response=await fetch(`https://test.e-prathibha.com/apis/register`,
            {method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData)});
              localStorage.setItem('email',formData.email);
              localStorage.setItem('name',formData.name);
              localStorage.setItem('phone',formData.phone);
              localStorage.setItem('photo',formData.photo);
              localStorage.setItem('password',formData.password);
              localStorage.setItem('confirmpassword',formData.confirmPassword);
            
            //setData(data);
            const data=await response.json();
            console.log(data);
            if(data.status==200)
            {
                
                navigate('/verifyEmail')
            }
        }
        catch(error){
            console.log(error);
            
        }
    }
  return (
    <div>
        {
            <div style={{textAlign:'center'}}>
            <h4>Registration Form</h4>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={4}>
                <Form.Control type="email" placeholder="Email" id="email" onChange={emailChange} autoComplete='off' />
                </Col>
                </Form.Group>
                {/* <label>Email:</label>
                <input type="email"  id="email" onChange={emailChange} autoComplete='off'/><br/> */}
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={4}>
                <Form.Control type="text" placeholder="name" id="name" onChange={emailChange} autoComplete='off' />
                </Col>
                </Form.Group>
                {/* <label>name:</label>
                <input type="text" id="name" onChange={emailChange} autoComplete='off'/><br/> */}
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Phone
                </Form.Label>
                <Col sm={4}>
                <Form.Control type="tel" id="phone" onChange={emailChange} autoComplete='off' />
                </Col>
                </Form.Group>
                {/* <label>phone:</label>
                <input type="tel" id="phone" onChange={emailChange} autoComplete='off'/><br/> */}
                <Form.Group as={Row} controlId="formFile" className="mb-3">
                <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={4}>
                <Form.Control type="file" id="photo" onChange={emailChange} autoComplete='off'/>
                </Col>
                </Form.Group>
                {/* <label>Photo(optional):</label>
                <input type="file" id="photo" onChange={emailChange} autoComplete='off'/><br/> */}
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>Password</Form.Label>
                <Col sm={4}>
                <Form.Control type="password" id="password" onChange={emailChange} autoComplete='off'/>
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>ConfirmPassword</Form.Label>
                <Col sm={4}>
                <Form.Control type="password" id="confirmPassword" onChange={emailChange} autoComplete='off'/>
                </Col>
                </Form.Group>
                {/* <label>Password:</label>
                <input type="password" id="password" onChange={emailChange} autoComplete='off'/><br/>
                <label>ConfirmPassword:</label>
                <input type="password" id="confirmPassword" onChange={emailChange} autoComplete='off'/><br/> */}
                <Button type='button' onClick={getRegisterData}>Register</Button><br/>
                
            </Form>   
                <Link to="/">Login</Link> &nbsp; &nbsp; &nbsp;
                <Link to="/emailVerification">Email Verification</Link>
            </div>
        }
    </div>
  )
}

export default Registration