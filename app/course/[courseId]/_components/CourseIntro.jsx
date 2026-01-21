import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const CourseIntro = ({course}) => {
  return (
    <div className="flex gap-5 items-center border p-8 shadow-xl rounded-lg">
      <Image
        src={"/knowledge.png"}
        alt="Course Knowledge"
        width={70}
        height={70}
      />
      <div>
        <h2 className="font-bold text-2xl">
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
