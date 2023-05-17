import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
function Packages() {
  const nav=useNavigate()
  const [data, setData] = useState("");
  const [option, setOption] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  // useEffect(()=>{
  //     getPackageData();
  // },{})
  const getPackageData = async () => {
    try {
      const response = await fetch(
        `http://test.e-prathibha.com/apis/packageDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("id"),
            tokenu: localStorage.getItem("token"),
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          },
        }
      );
      const data = await response.json();
      //1.here we get the package details
      console.log(data);
      setData(data);
      setOption(data.data.amount); //this will give the amount(499) by default when the page loads
    } catch (error) {
      console.log(error);
    }
  };
  // const premiumAmount = async(e) => {
  //   setOption(e.target.value);
  // };
  const premiumAmount = (e) => {
    setOption(e.target.value);
  };
  //3.data from backend has cost and orders details
  const payment = (input) => {
    let options = {
      key: "rzp_test_Z7YQ4OJrmZdJQa",
      key_secret: "WVvuH1vqCWPuU9qYD7G8YLNt",
      amount: input.amount,
      currency: "INR",
      name: input.name,
      description: input.description,
      //4.this function returns the transaction details
      handler: function (response) {
        console.log(response);
        paymentResponse({
          order_id: input.order_id,
          transaction_id: response.razorpay_payment_id,
        });
      },
      prefill: {
        name: "Ambika",
        email: "ambikapattem@gmail.com",
        contact: "7995352932",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: input.theme.color,
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        //passing key in dynamic way
        packagearr: { [data.data.id]: "1" },
        packagetype: "RAZORPAY",
        year: option == "499.00" ? "" : 1,
      };
      const response = await fetch(
        `http://test.e-prathibha.com/apis/test_paymentGateway`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("id"),
            tokenu: localStorage.getItem("token"),
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          },
          body: JSON.stringify(payload),
        }
      );
      const resp = await response.json();
      //2.here we get the data from backend like orderId,amount...
      console.log(resp);
      payment(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const paymentResponse = async (a) => {
    try {
      const response = await fetch(`http://test.e-prathibha.com/apis/success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          tokenu: localStorage.getItem("token"),
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
        },
        body: JSON.stringify({
          orderId: a.order_id,
          razorpay_payment_id: a.transaction_id,
        }),
      });
      const sucessResponse = await response.json();
      //5. here we get the success status of transaction
      console.log(sucessResponse);
      setOrderMessage(sucessResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const backToLoginPage=()=>{
    nav('/exam');
  }
  return (
    <div style={{textAlign:'center'}}>
      {!orderMessage ? (
        <div>
          <Button variant="info" onClick={() => getPackageData()}>Packages</Button><br/>
          {data && data.data ? (
            <div>
              {
                <div style={{marginTop:'25px',backgroundColor:'#e0dce566'}}>
                  <h3>{data.data.name}</h3>
                  <h4>{option}</h4>
                  <select onChange={premiumAmount}>
                    <option value={data.data.amount}>6 months</option>
                    <option value={data.data.amount_year}>1 Year</option>
                  </select>
 
                  <div style={{margin:'5px'}}>
                    <Button variant="success" onClick={handleSubmit}>Pay</Button>
                  </div>
                </div>
              }
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
       <div style={{backgroundColor:'#e0dce566',color:'blue',height:'50px'}}> {orderMessage}</div>
       <Button variant="success" onClick={backToLoginPage}>Ok</Button>
       </div>
      )}
      {/* <Link to='/transactions'>Transactions</Link> */}
    </div>
  );
}

export default Packages;
