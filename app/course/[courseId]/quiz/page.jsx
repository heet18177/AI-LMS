"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress'
import DashboardHeader from '@/app/dashboard/_components/dashboardHeader'
import QuizCardItem from './_components/QuizCardItem'   

const Quiz = () => {
    const {courseId} = useParams();
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showAnser , setShowAnser] = useState(null);
    const [quizData, setQuizData] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [quiz , setQuiz] = useState([]);

    useEffect(() => {
        GetQuiz();
    }, []);

    useEffect(() => {
        setCorrectAnswer(null);
        setShowAnser(null);
    }, [stepCount]);

    const GetQuiz = async()=>{
        const result = await axios.post('/api/study-type' , {
            courseId: courseId,
            studyType : 'Quiz'
        });
        console.log(result.data)
        setQuizData(result.data);
        setQuiz(result.data?.content || [])
    }

    const checkAnswer = (userAnswer, currentQuestion) => {
        // Normalize everything to lowercase string for comparison
        const userAns = userAnswer?.toString().trim().toLowerCase();
        const correctAns = currentQuestion?.correct_answer?.toString().trim().toLowerCase();
        const correctAnsContent = currentQuestion?.answer?.toString().trim().toLowerCase();

        // Check if the user answer matches the correct answer key OR the correct answer content
        // Also handling if userAnswer is a key, check if the value at that key matches correctAns
        let isCorrect = false;

        if (userAns === correctAns || userAns === correctAnsContent) {
            isCorrect = true;
        } 
        // If user provided a key (e.g. 'a'), check if the content at that key matches correct answer content
        else if (currentQuestion?.options && currentQuestion.options[userAnswer]) {
             const optionContent = currentQuestion.options[userAnswer]?.toString().trim().toLowerCase();
             if (optionContent === correctAns || optionContent === correctAnsContent) {
                 isCorrect = true;
             }
        }

        if (isCorrect) {
            setCorrectAnswer(true);
            setShowAnser(true);
        } else {
            setCorrectAnswer(false);
            setShowAnser(true);
        }
    }

   return quiz&&(
    <div>
      <DashboardHeader/>
     <div className='px-5 md:px-32'>
        <h1 className='text-2xl font-bold mt-5'>Quiz</h1>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(value)=>setStepCount(value)}/>
     </div>

     <div>
      {/* {quiz.map((item , index)=>( */}
        <QuizCardItem quiz={quiz[stepCount]} userSelectedOption={(option)=>checkAnswer(option , quiz[stepCount])} index={stepCount}/>
      {/* ))} */}
     </div>

     <div className='px-5 md:px-48'>
      {correctAnswer === true &&  (
        <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
            <h1 className='text-green-700'>Correct</h1>
            <p className='dark:text-black'>Your answer is correct</p>
        </div>
      )}
       {correctAnswer === false &&  (
        <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
            <h1 className='text-red-700'>Incorrect</h1>
            <p className='dark:text-black'>Your answer is incorrect, <span className=' text-green-700'>correct answer is {quiz[stepCount]?.correct_answer || quiz[stepCount]?.answer}</span></p>
        </div>
       )}
     </div>
    </div>
   )
}

export default Quiz
