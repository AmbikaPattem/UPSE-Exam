import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '../login/LoginForm'
import Registration from '../registration/Registration'


import EmailVerification from '../email-verification/EmailVerification'
import Exam from '../exam/Exam'
import FinishExam from '../finish-exam/FinishExam'
import Packages from '../packages/Packages'
import ResultPage from '../resultpage/ResultPage'
import Transactions from '../transactions/Transactions'
//import ExamId from '../exam-id/ExamId'



function Router() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/verifyEmail" element={<EmailVerification/>}/>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/exam" element={<Exam/>}/>
            <Route path="/finish" element={<FinishExam/>}/>
            <Route path="/packages" element={<Packages/>}/>
            <Route path="/resultpage" element={<ResultPage/>}/>
            <Route path="/transactions" element={<Transactions/>}/>
            {/* //<Route path="/exam/:id" element={<ExamId/>}/> */}
        </Routes>
    </div>
  )
}

export default Router