import React, { useState } from 'react'

function ExamId() {
  const [questions, setQuestion] = useState([]);
  const examLoad = async(id) => {
    try{
      const response=await fetch(`http://test.e-prathibha.com/apis/start_exam?examId=`+id,
      {
      method:"GET",
      headers: {
          "Content-Type": "application/json",
          "id":localStorage.getItem('id'),
          "tokenu": localStorage.getItem('token'),
          "server_key": '3w99V63pW7tJ7vavGXtCKo8cp'
        }});
      //setData(data);
      const data=await response.json();
      if(data.status === 200) {
        setQuestion(data.data.exam);

      }
      console.log(data);
  }
  catch(error){
      console.log(error);
  }
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
      if(data.status === 200) {
        // setQuestion(data.data.exam);

      }
      console.log(data);
  }
  catch(error){
      console.log(error);
  }
}
  return (
    <div className='text-left'>
        {questions.length === 0 ? 
      <button onClick={() => getFreeExam()}>Load Exam</button>
      : ''}
      <button onClick={() => finishExam()}>Finish Exam</button>
      <div>
        {
          questions.map((item, ind) => {
            return <div key={ind}>
              <b>Question {ind + 1}</b><div className='question-header' dangerouslySetInnerHTML={{__html: item.Question.question.above}}></div> <br/>
              <div><b>Exp:</b></div>
              <div dangerouslySetInnerHTML={{__html: item.Question.explanation}}></div>

              <input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option1}}></span><br/>
              <input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option2}}></span><br/>
              <input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option3}}></span><br/>
              <input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option4}}></span><br/>
              {item.Question.option5 ? 
              <span><input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option5}}></span><br/></span>
              : ''}
              {item.Question.option6 ? 
              <span><input type='radio' name={ind}/><span dangerouslySetInnerHTML={{__html: item.Question.option6}}></span><br/></span>
              : ''}
              <hr/>
              </div>
          })

        }
      </div>
      {questions.length === 0 ? 
        <form>
            Exam 
            {
              examData.map((item, i) => <div key={i} >
                {item.name}
                <ul>
                  {
                    item.exams.map((ch, ind) => {
                      return <li key={ind} onClick={() => examLoad(ch.Exam.id)}>{ch.Exam.name}</li>
                    })
                    
                  }
                  
                </ul>
                </div>
              )
            }
        </form>
        : ''}
    </div>
  )
}

export default ExamId