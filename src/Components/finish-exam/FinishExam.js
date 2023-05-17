import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
// import {ExamData} from '../exam/Exam.js';
function FinishExam() {
const isLoggedIn = localStorage.getItem('token');
// const finishExam=useContext(ExamData);
// if(!isLoggedIn) {
//   return (
//     <Navigate to="/" />
//   )
// }
const nav=useNavigate();
const resultData=()=>{
 
   nav('/resultpage');
    
}
  return (
    
    <div style={{textAlign:'center',border:'1px solid gray', height:'100px'}}>
      {
        <h4 >Exam Finished</h4>
        
}
<button onClick={resultData}>Ok</button>
      {/* <button onClick={resultData}><Link to='/'>Ok</Link></button> */}
      {/* <button onClick={() => finishExam}>Finish Exam</button>
      <ExamData.Consumer>
        {value=><div>{finishExam}</div>}
      </ExamData.Consumer> */}
    </div>
  )
}

export default FinishExam