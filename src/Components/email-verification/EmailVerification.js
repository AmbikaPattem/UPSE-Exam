import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom';
function EmailVerification() {
    let data;
    const navigate=useNavigate();
    const [emailCode,setEmailCode]=useState([]);
    const emailCodeChange = (e) => {
        setEmailCode(e.target.value)
     }
     
    const verify= async()=>{
        try{
            const response=await fetch(`https://test.e-prathibha.com/apis/verifyEmail`,
            {method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({reg_code: emailCode})});
            const data=await response.json();
            console.log(data);
            if(data.status==200){
                navigate('/');
            }

        }
        catch(error){
            console.log(error);
        }
    }
    
  return (
    <div>
        <div style={{padding:'50px'}}>
        <Form>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={1}>Code</Form.Label>
        <Col sm={4}>
        <Form.Control type="text" id="code" value={emailCode} onChange={emailCodeChange}/>
        </Col>
        </Form.Group>
        
            <Button type="button" onClick={() => verify()}>Verify</Button><br/>
            
        </Form>
        <Link to="/">Login</Link>
        </div>
        
    </div>
  )
}

export default EmailVerification