import React from 'react'
import ReactCardFlip from 'react-card-flip'

const FlashcardItem = ({isFlipped, handleClick , flashcard}) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className='p-4 bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
         <h2 className="text-center">{flashcard?.front}</h2>
        </div>

        <div className='p-4 bg-white text-blue-700 flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-2xl dark:bg-white dark:text-blue-700' onClick={handleClick}>
         <h2>{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
  )
}

export default FlashcardItem