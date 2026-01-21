"use client"
import DashboardHeader from '@/app/dashboard/_components/dashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseIntro from './_components/CourseIntro'
import StudyMaterialSection from './_components/StudyMaterialSection'
import ChapterList from './_components/ChapterList'

const Course = () => {
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
 

    useEffect(()=>{
        if (courseId) {
            getCourse();
        }
    },[courseId])

    const getCourse = async()=>{
        try {
            setLoading(true);
            console.log('Fetching course with courseId:', courseId);
            const result = await axios.get(`/api/courses?courseId=${courseId}`);
            console.log("getcourse result:", result.data);
            setCourse(result.data.result);
        } catch (err) {
            console.error('Error fetching course:', err);

        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
      <DashboardHeader />
      <div className='mx-10 md:mx:36 lg:mx-60 mt-10'>
        {/* //Course Intro  */}
        <CourseIntro course={course} />
        {/* Study Material Section */}
        <StudyMaterialSection courseId={courseId} course={course}/>
        {/* Chapter List */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course