import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const QuizCardItem = ({quiz , userSelectedOption, index}) => {
    const [selectedOption , setSelectedOption] = useState(null);

  return (
    <div className='mt-10 p-5'>
        <div>
        <h2 className='text-3xl font-medium text-center'>Question :- {index + 1}</h2>
        <h1 className='text-center font-bold text-2xl mt-8'>{quiz?.question}</h1>
        </div>
        <div className='grid grid-cols-2 gap-5 mt-5 px-50'>
            {quiz?.options.map((option , index)=>(
                <h1 key={index} onClick={()=>{
                    setSelectedOption(option);   
                    userSelectedOption(option);
                }} 
                    className={`w-full border border-blue-500 p-3 rounded-2xl text-lg px-5 cursor-pointer hover:bg-blue-700 hover:text-white hover:text-black ${selectedOption == option ? 'bg-blue-700 text-white hover:bg-blue-700' : ''}`}>{option}</h1>
            ))}
        </div>
    </div>

  )
}

export default QuizCardItem