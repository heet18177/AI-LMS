"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItems from "./CourseCardItems";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { CourseCountContext } from "../../_context/CourseCountContext";
import { FaSearch } from "react-icons/fa";

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading , setLoading] = useState(false)
  const [isMember, setIsMember] = useState(false);
  const {courseCount , setCourseCount} = useContext(CourseCountContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    user && getCourseList();
  }, [user]);

  const getCourseList = async () => {

    try {
      setLoading(true)
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress.emailAddress,
      });
      console.log("API Response:", result.data);
      setCourseList(result.data.result);
      setIsMember(result.data.isMember);
      setLoading(false)
      setCourseCount(result.data.result.length);

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filteredCourseList = courseList.filter(course =>
    course.courseLayout.courseTitle.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 text-center md:flex-row justify-between">
        <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold dark:text-white">Your Study Material</h2>
        <div className="flex items-center gap-2 relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search" 
            className="border border-gray-300 rounded-md p-1.5 w-60"
            onChange={(event)=>setSearchInput(event.target.value)}
          />
          <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"/>
        </div>
        </div>
        
        <Button variant="outline" className="cursor-pointer text-blue-700 dark:text-white dark:border-blue-700" onClick={getCourseList}>
          <RefreshCcw />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {loading == false ? filteredCourseList?.map((course, index) => (
          <CourseCardItems course={course} key={index} isMember={isMember} onDelete={getCourseList} />
        )) : 
        [1,2,3,4,5,6].map((items , index)=>(
          <div key={index} className="h-56 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-700">

          </div>
        ))
        }
      </div>
    </div>
  );
};
export default CourseList;
