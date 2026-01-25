
"use client"
import DashboardHeader from '@/app/dashboard/_components/dashboardHeader'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StepProgress from '../_components/StepProgress'
import QACardItem from './_components/QACardItem';

const QuestionAnswers = () => {
  const {courseId} = useParams();
  const [qa , setQA] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  const GetQA = async()=>{
    const result = await axios.post('/api/study-type' , {
      courseId: courseId,
      studyType : 'Question/Answers'
  })
  console.log(result.data)
  setQA(result.data)
  }

  useEffect(() => {
    GetQA();
  }, []);

  return (
    <div>
      <DashboardHeader/>
      <div className='px-5 md:px-32'>
        <h1 className='text-2xl font-bold mt-5 text-center'>Questions with Answers</h1>
        <StepProgress data={qa?.content} stepCount={stepCount} setStepCount={(value)=>setStepCount(value)}/>
          {qa?.content && (
            <QACardItem item={qa?.content[stepCount]} index={stepCount} />
          )}
      </div>
    </div>
  )
}

export default QuestionAnswers