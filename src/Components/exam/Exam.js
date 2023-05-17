import React, { useEffect, useState } from 'react'

import { Outlet, useNavigate } from "react-router-dom";
import './exam.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import axios from 'axios';

import {Link} from 'react-router-dom';
// import FinishExam from '../finish-exam/FinishExam';
// export const ExamData=React.createContext();
function Exam() {
  const nav=useNavigate();
  //  if(!localStorage.getItem('token')){
  //  nav('/');
  // }
  const [selected_option,setSelected_option]=useState('');
    const [examData, setExamData] = useState([]);
    const [showExamNames, setShowExamNames] = useState(false);
    const [questions, setQuestion] = useState([]);
    const [questionObj, setQuestionObj] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const getFreeExam= async()=>{
        try{
            const response=await fetch(`http://test.e-prathibha.com/apis/test_free_exam`,
            {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "id":localStorage.getItem('id'),
                "tokenu": localStorage.getItem('token'),
                "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
              },
              body: JSON.stringify({"email":localStorage.getItem('email'),"name":localStorage.getItem('name'),"phone":localStorage.getItem('phone'),"photo":localStorage.getItem('photo'),"password":localStorage.getItem('password'),"confirmpassword":localStorage.getItem('confirmPassword')})});
            //setData(data);
            const data=await response.json();
            if(data.status === 200) {
              let exams = [];
              data.data.exams.forEach((item) => {
                for(let obj in item) {
                  if(Array.isArray(item[obj])) {
                    exams.push({name: obj, exams: item[obj]});
                  }
                }
              })
              setExamData(exams);
            }
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }
    
    const examLoad = async(id) => {
      try{
        // const response=await fetch(`http://test.e-prathibha.com/apis/start_exam?examId=`+id,
        const response=await fetch(`http://test.e-prathibha.com/apis/start_exam?examId=24`,
        {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
        params : JSON.stringify({"examId":24})
      });
        //setData(data);
        const data=await response.json();
        if(data.status === 200) {
          localStorage.setItem('examResultId',data.data.exam[0].ExamStat.exam_result_id);
          
          setQuestion(data.data.exam);
          setQuestionObj(data.data.exam[0]);
          console.log(questionObj);

          
        }
        console.log(data);
        console.log(localStorage.getItem('examResultId'));
    }
    catch(error){
        console.log(error);
    }
    }
    // const bookmark = () => {
    //   setQuestionIndex(questionIndex + 1);
    //   setQuestionObj(questions[questionIndex])
    //   console.log(questionObj);
      
    // }
    const bookmark = async() => {
      setQuestionIndex(questionIndex + 1);
      setQuestionObj(questions[questionIndex])
      console.log(questionObj);
      setSelected_option('');
      try{
        const response=await fetch(`http://test.e-prathibha.com/apis/bookmark_ques`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "id":localStorage.getItem('id'),
          "tokenu": localStorage.getItem('token'),
          "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
        },
        body: JSON.stringify({examId:'24',qId:questionObj.Question.id})
      }
        )
       
        const data=response;
        console.log(questionObj.Question.id)
        console.log(data);
      }
      catch(error){
        console.log(error);   
      }
    }
    const save = async() => {
      

      try
      {
        const response=await fetch(`http://test.e-prathibha.com/apis/save_ques`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
          body: JSON.stringify({"data":{"Exam":{"lang":"1","option_selected":selected_option}},"examId":questionObj.Exam.id,"qId":questionIndex+1})
        }
          )
         
          const data=response;
          console.log(data)
          setQuestionIndex(questionIndex + 1);
      console.log(questionIndex);
      setQuestionObj(questions[questionIndex]);
      console.log(questionObj);
      setSelected_option('');
      }
      catch(error){}
      
    }
    const selectedOptions=(a)=>{
      setSelected_option(a);
    }
    const finishExam = async(id) => {
      try{
        const response=await fetch(`http://test.e-prathibha.com/apis/finishExam`,
        {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "id":localStorage.getItem('id'),
            "tokenu": localStorage.getItem('token'),
            "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
          },
          body:  JSON.stringify({"examId":24, "qno":1})
        });
        //setData(data);
        const data=await response.json();
        if(data.status == 200) {
          // setQuestion(data.data.exam);
          
          nav('/finish');

        }
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
    }
    
  return (
    <div>
    <div style={{paddingLeft:'1000px',border:'1px solid black',backgroundColor:'blue',height:'50px',paddingTop:'5px'}}>
        <Link to="/packages" style={{color:'white'}}>Packages</Link>&nbsp;&nbsp;
        <Link to='/transactions' style={{color:'white'}}>Transactions</Link> 
    </div>
    <br/>
    <div className='scroll'>
    <div className='text-left'>
      {questions.length === 0 ? 
      <button onClick={() => getFreeExam()}>Load Exam</button>
      : ''}
      {/* <button onClick={() => finishExam()}>Finish Exam</button> */}
      <br/>
      <div>
        {
          questionObj ?
            <div style={{border:'1px solid black'}}>
              <b>Question </b><hr/><div className='question-header' dangerouslySetInnerHTML={{__html: questionObj.Question.question.above}}></div>
              <hr/>
              <div><b>Options</b></div>
              <div dangerouslySetInnerHTML={{__html: questionObj.Question.explanation}} ></div>
              <input type='radio' name='exam' value='1' checked={selected_option==1} onChange={()=>selectedOptions(1)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option1}}></label><br/>
              <input type='radio' name='exam' value='2' checked={selected_option==2} onChange={()=>selectedOptions(2)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option2}}></label><br/>
              <input type='radio' name='exam' value='3' checked={selected_option==3} onChange={()=>selectedOptions(3)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option3}}></label><br/>
              <input type='radio' name='exam' value='4' checked={selected_option==4} onChange={()=>selectedOptions(4)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option4}}></label><br/>
              
              {questionObj.Question.option5 ? 
              <span><input type='radio' name='exam' value='5' checked={selected_option==5} onChange={()=>selectedOptions(5)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option5}}></label><br/></span>
              : ''}
              {questionObj.Question.option6 ? 
              <span><input type='radio' name='exam' value='6' checked={selected_option==6} onChange={()=>selectedOptions(6)}/><label dangerouslySetInnerHTML={{__html: questionObj.Question.option6}}></label><br/></span>
              : ''}
              <hr/>
              <div style={{marginBottom:'7px'}}>
              <button onClick={() => save()}>Save and Next</button>
              <button onClick={() => bookmark()}>Bookmark</button>
              </div>
              </div>
: ''
        }
      </div>
      {questions.length === 0 ? 
        <Row xs={1} md={3} className="g-4">
            {/* Exam  */}
            {
              examData.map((item, i) => <Col key={i} >
                {item.name}
                <Card border="primary" style={{ width: '18rem' }} bg='light' text='dark'>
                <ol>
                  {
                    item.exams.map((ch, ind) => {
                      return <div className='link'><li key={ind} onClick={() => examLoad(ch.Exam.id)}>{ch.Exam.name}</li></div>
                    })
                    
                  }
                  
                </ol>
                </Card>
                </Col>
              )
            }
        </Row>
        : ''}
    </div>

<div style={{textAlign:'left'}}>
  {
questionObj?
  <button onClick={() => finishExam()} >Finish Exam</button>
  :("")
}
  </div>

</div>

</div>
)
}

export default Exam
{/* <ExamData.Provider value={finishExam}>
  <FinishExam />
</ExamData.Provider> */}