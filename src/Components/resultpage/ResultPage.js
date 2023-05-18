import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ResultPage() {
  const nav=useNavigate();
    const [result,setResult]=useState([]);
    const [resultdata,setResultdata]=useState(false);
    const [myResultdata,setMyResultdata]=useState(false);
    const [examresultdata,setExamResultData]=useState([]);
    //let examId;
    const myResult=async()=>
    {
      
        try{
            const response=await fetch(`https://test.e-prathibha.com/apis/my_result`,
            {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "id":localStorage.getItem('id'),
                "tokenu": localStorage.getItem('token'),
                "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
              },
              body:  JSON.stringify({"id":localStorage.getItem('id')})
            });
            //setData(data);
            const data=await response.json();
            console.log(data);
            setResult(data.data)

           // console.log(result[0].Result.id);
           // examId=result[0].Result.id
            setMyResultdata(true);
            let resultData=[];
            // data.data.forEach((item)=>{
            //     for(let obj in item){
            // //         //if(Array.isArray(item[obj])) 
            // if(obj.Result){
            //             resultData.push({name: obj, resultData: item[obj]});
            //           }
            //     }
            // })
            //setResult(resultData);
            //console.log(result);
        }
        catch(error){
            console.log(error);
        }
    }
    const examResult=async()=>
    {
      try{
        const examresult=localStorage.getItem('examResultId')
        const response=await fetch(`https://test.e-prathibha.com/apis/exam_result`,
        {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
          body:  JSON.stringify({"id":examresult})
        });
        const resp= await response.json();
        console.log(resp);
        setExamResultData(resp.data.examDetails.Result)
        console.log(examresultdata);
        setResultdata(true)
      }
        catch(error){
          console.log(error);
        }
    }
    
    const homePage=()=>{
      setMyResultdata(false);
      setResultdata(false);
      //nav('/');
    }
    useEffect(()=>{examResult();},[])
  return (
    <div>
      <div style={{textAlign:'right'}}>
        <button onClick={myResult}>MyResult</button>&nbsp;
      <Link to='/exam'>Home Page</Link>
      </div>
      {/* <div style={{paddingLeft:'5px', textAlign:'right'}}>
        
        
        </div><br/> */}
        {/* <button onClick={examResult}>ExamResult</button> */}
        <div onLoad={()=>examResult} style={{paddingLeft:'5px', textAlign:'center'}}> <h5>Result</h5></div>
        
        
        
      {/* <div> */}
        {
          myResultdata==true?
          <div style={{border:'1px solid black'}}>
            {
          result.map((item,ind)=>{
            return <div key={ind}>
              <p><span><b> {ind+1}.</b></span>Exam Status:<span>{item.Result.result}</span></p>
              <p>Percentage:<span>{item.Result.percent}</span></p><hr/>
              </div>
              
          })
        }
        </div>
          :""
        }
        {/* </div> */}
        <div>
          <div>{
            (resultdata==true)?
            <div style={{paddingLeft:'5px', textAlign:'center', border:'1px solid black'}}>
            <p>Result:{examresultdata.result}</p>
            <p>Marks:{examresultdata.obtained_marks}</p>
            <p>Percentage:{examresultdata.percent}</p>
            </div>
            :""
          }
          </div>
          {/* <div>
          ExamStatus:<span dangerouslySetInnerHTML={{__html:examresultdata.result}}></span>
          <p> Marks: <span dangerouslySetInnerHTML={{__html:examresultdata.obtained_marks}}></span></p>
          <p> percentage:<span dangerouslySetInnerHTML={{__html:examresultdata.obtained_marks}}></span></p>
          </div> */}
        
        </div>

        <div>
          
          {
            (myResultdata==true || resultdata==true)?
            <div style={{padding:'15px', textAlign:'center'}}>
          <button onClick={homePage}>Ok</button>
          
        </div>
          :""
        }
        </div>
    </div>
  )
}

export default ResultPage