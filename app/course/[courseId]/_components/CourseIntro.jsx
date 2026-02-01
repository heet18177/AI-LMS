import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const CourseIntro = ({course}) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center border p-8 shadow-xl rounded-lg dark:bg-slate-900">
      <Image
        src={"/knowledge.png"}
        alt="Course Knowledge"
        width={70}
        height={70}
      />
      <div className="w-full">
        <h2 className="font-bold text-xl md:text-2xl">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p>{course?.courseLayout?.courseSummary}</p>
        <Progress className="w-full mt-2" value={50} />
        <h2 className="mt-2 text-lg">Total chapters :- {course?.courseLayout?.chapters?.length}</h2>
      </div>
    </div>
  );
};

export default CourseIntro;
