"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import MaterialCardItems from './MaterialCardItems'
import axios from 'axios';
import Link from 'next/link';

export const StudyMaterialSection = ({courseId , course}) => {
    const [studyTypeContent , setStudyTypeConent] = useState([])
    const MaterialList = [
      {
        name: "Notes/Chapters",
        description: "Read notes to prepare your course",
        icons: "/notes.png",
        path: "/notes",
        type : 'notes'
      },
      {
        name: "Flashcards",
        description: "Flashcards helps to remember the concepts",
        icons: "/flashcard.png",
        path: "/flashcards",
        type : 'flashcard'
      },
      {
        name: "Quiz",
        description: "Great way to test your knowledge",
        icons: "/quiz.png",
        path: "/quiz",
        type : 'quiz'
      },
      {
        name: "Question/Answers",
        description: "Helps to practice your learning",
        icons: "/qa.png",
        path: "/qa",
        type : 'qa'
      },
    ];

    useEffect(()=>{
      GetStudyMaterial();
    }, [])

    const GetStudyMaterial = async()=>{
      try{
        const result = await axios.post('/api/study-type' , {
          courseId : courseId,
          studyType : 'ALL'
        });
        console.log('Study material API result:', result.data);
      
        setStudyTypeConent(result.data);
      } catch(err) {
        console.error('Failed to fetch study material:', err);
      }
    }
  return (
    <div className="mt-5">
      <h2 className="font-semibold text-2xl">Study materials</h2>
      <div className="grid grid-2 md:grid-cols-4 gap-5 mt-2">
        {MaterialList.map((items, index) => (
          <Link key={index} href={'/course/'+courseId+items.path}>
            <MaterialCardItems
              items={items}
              key={index}
              studyTypeContent={studyTypeContent}
              course = {course}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection
