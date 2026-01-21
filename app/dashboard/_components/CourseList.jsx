"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCardItems from "./CourseCardItems";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading , setLoading] = useState(false)

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
      setLoading(false)

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Your Study Material</h2>
        <Button variant="outline" className="cursor-pointer text-blue-700" onClick={getCourseList}>
          <RefreshCcw />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {loading == false ? courseList?.map((course, index) => (
          <CourseCardItems course={course} key={index} />
        )) : 
        [1,2,3,4,5,6].map((items , index)=>(
          <div key={index} className="h-56 rounded-lg bg-gray-200 animate-pulse">

          </div>
        ))
        }
      </div>
    </div>
  );
};
export default CourseList;
