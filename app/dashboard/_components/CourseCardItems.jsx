import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseCardItems = ({course}) => {
  return (
    <div>
      <div className="border rounded-3xl shadow-xl p-4">
        <div className="flex justify-between items-center">
          <Image src={"/knowledge.png"} alt="other" width={50} height={50} />
          <h2 className="px-2 p-1 text-[10px] font-bold rounded-full bg-blue-700 text-white">
            16 Nov , 2025
          </h2>
        </div>
        <h2 className="mt-3 font-medium text-lg line-clamp-1">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {course?.courseLayout?.courseSummary}
        </p>

        <div className="mt-2">
          <Progress value={20} />
        </div>
        <div className="flex justify-end mt-2">
          {course?.status == "Generating" ? (
            <h2 className="text-[13px] rounded-full font-bold p-1.5 px-2 bg-gray-400 text-white flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </h2>
          ) : (
            <Link href={'/course/'+course?.courseId}>
              <Button className="bg-blue-700 cursor-pointer">View</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItems