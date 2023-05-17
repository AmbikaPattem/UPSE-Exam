import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './transaction.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
function Transactions() {
    const nav=useNavigate();
    let paymentId;
    const [transaction,setTransaction]=useState([]);
    const [viewTransaction,setViewTransaction]=useState([])
    const transactions=async()=>
    {
        try
        {
            const response=await fetch(`http://test.e-prathibha.com/apis/transactions`,
        {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
         
        });
        const data=await response.json();
        console.log(data);
        setTransaction(data.data);
       // paymentId=data.data[0].Payment.id;

       //console.log(paymentId);
        console.log(transaction);
        //console.log(transaction[0].Payment.id)
        }
        catch(error)
        {
            console.log(error);
        }
    }
    const viewTransactions=async(paymentId)=>
    {
      //let paymentId=transaction[0].Payment.id;
        try
        {
            const response=await fetch(`http://test.e-prathibha.com/apis/view_transaction`,
        {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
          body: JSON.stringify({"payment_id":paymentId})
        });
        const res=await response.json();
        console.log(res);
        setViewTransaction(res)
        console.log(viewTransaction)
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    const homePage=()=>{
      nav('/');
    }
  return (
    <div>
        <div style={{textAlign:'center',margin:'25px'}}>
        <Button variant="primary" onClick={transactions}>Transactions</Button>
        </div>
        <div className="main" >
        <div className="transaction">
        {
          transaction.length===0?"":
          <div>
            
            
            <Table striped bordered hover>
                <thead>
                  <tr>
                  <th>Transaction_Id</th>
                  <th>Amount</th>
                  {/* <th>status</th> */}
                  <th>date</th>
                  <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                transaction.map((item,i)=>
            {

              return <tr key={i}>
                    <td>{item.Payment.transaction_id}</td>
                    <td>{item.Payment.amount}</td>
                    {/* <td>{item.Payment.status}</td> */}
                    <td>{item.Payment.date}</td>
                    <td>{<Button variant="info" onClick={()=>viewTransactions(item.Payment.id)}>ViewTransactions</Button>}</td>
                  </tr>
                })
              }
                </tbody>
              </Table>
               
            
          
         </div> 
         
        }
        </div>
        <hr/>
        <div className="viewtransaction">
        {
          viewTransaction.length===0?"":
          <Card style={{ width: '25rem'}} bg="light" text="dark">
            {
              <Card.Body>
              <p >Transaction_Id :{viewTransaction.data.Payment.transaction_id}</p>
              <p >Amount :{viewTransaction.data.Payment.amount}</p>
              <p >Status :{viewTransaction.data.Payment.status}</p>
              <p >Date :{viewTransaction.data.Payment.date}</p>
              </Card.Body>
            }
          </Card>
        }
        </div>
        </div>
        <div style={{textAlign:'center'}}>
        <Button variant="success" onClick={homePage}>Ok</Button>
        </div>
    </div>
  )
}

export default Transactions
{/* <div>
            <p>Transaction_Id:{viewTransaction.data.Payment.transaction_id}</p>
            <p>Status:{viewTransaction.data.Payment.status}</p>
        </div> */}