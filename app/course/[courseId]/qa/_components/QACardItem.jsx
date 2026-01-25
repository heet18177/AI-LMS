import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const QACardItem = ({ item, index }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className='mt-10 p-5 border rounded-xl shadow-md bg-white'>
            <div className='flex flex-col items-center'>
                <h2 className='text-3xl font-medium text-center text-primary'>Question :- {index + 1}</h2>
                <h1 className='text-center font-bold text-2xl mt-8'>{item?.question}</h1>
                
                <div className='mt-10 w-full flex flex-col items-center transition-all'>
                    {showAnswer && (
                        <div className='p-6 border border-green-200 bg-green-50 rounded-lg w-full text-center animate-in fade-in slide-in-from-bottom-5 duration-500'>
                            <h3 className='text-green-700 font-semibold mb-2'>Answer:</h3>
                            <p className='text-lg leading-relaxed text-gray-800'>{item?.answer}</p>
                        </div>
                    )}
                    
                    <Button 
                        className='mt-6 bg-primary text-white hover:bg-primary/90 transition-all'
                        onClick={() => setShowAnswer(!showAnswer)}
                    >
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default QACardItem
