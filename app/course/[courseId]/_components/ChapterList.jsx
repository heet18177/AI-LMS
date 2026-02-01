import React from 'react'

const ChapterList = ({course}) => {
    const CHAPTERS = course?.courseLayout?.chapters
  return (
    <div>
        <h2 className='text-2xl font-semibold mt-6'>Chapter List</h2>
        <p className='text-gray-800 mb-3 dark:text-white'>I generated {CHAPTERS?.length} chapters for you in this course.</p>

        <div>
            {CHAPTERS?.map((items,index)=>(
                <div key={index}>
                    <div className='flex flex-col gap-2 mt-3 border-2 p-3 rounded-lg shadow-md dark:bg-slate-900'>
                        <h2 className='text-xl font-medium'>{index + 1}. {items?.chapterTitle}</h2>
                        <p className='text-gray-400'>{items?.chapterSummary}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default ChapterList
