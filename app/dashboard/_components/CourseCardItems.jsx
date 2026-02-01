"use client";
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'sonner';

const CourseCardItems = ({course, isMember, onDelete}) => {
  const { user } = useUser();
  const [loading , setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Perform delete without confirmation (used after confirmation modal)
  const doDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete('/api/courses', { data: { courseId: course?.courseId, createdBy: user?.primaryEmailAddress?.emailAddress } });
      setDeleteLoading(false);
      toast('Course deleted successfully');
      if (onDelete) onDelete();
    } catch (err) {
      console.error('Delete failed', err);
      setDeleteLoading(false);
      toast('Failed to delete course');
    }
  };

  // Called when user confirms
  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);
    await doDelete();
  };

  return (
    <div>
      <div className="border rounded-3xl shadow-xl p-4 dark:bg-slate-900">
        <div className="flex justify-between items-center">
          <Image src={"/knowledge.png"} alt="other" width={50} height={50} />
          <h2 className="px-2 p-1 text-[10px] font-bold rounded-full bg-blue-700 text-white">
            {course?.createdAt?.split(" ")[0]}

          </h2>
        </div>
        <h2 className="mt-3 font-medium text-lg line-clamp-1 dark:text-white">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-white">
          {course?.courseLayout?.courseSummary}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1">
            <Progress value={course?.progressValue ?? 0} className='' />
          </div>
          <div className="w-12 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
            {course?.progressValue ?? 0}%
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Chapters (always available) */}
          <Link href={'/course/'+course?.courseId+'/notes'}>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-gray-100/60 dark:bg-slate-800/60 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{course?.chapterCount ?? (course?.courseLayout?.chapters?.length ?? 0)}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">Chapters</div>
            </div>
          </Link>

          {/* Flashcards */}
          <Link href={'/course/'+course?.courseId+'/flashcards'}>
            <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md transition ${!(course?.flashcardCount > 0) ? 'opacity-60 pointer-events-auto' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`} title={course?.flashcardCount > 0 ? 'View flashcards' : 'No flashcards generated yet'}>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{course?.flashcardCount ?? 0}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">Flashcards</div>
            </div>
          </Link>

          {/* Quizzes */}
          <Link href={'/course/'+course?.courseId+'/quiz'}>
            <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md transition ${!(course?.quizCount > 0) ? 'opacity-60 pointer-events-auto' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`} title={course?.quizCount > 0 ? 'View quizzes' : 'No quizzes generated yet'}>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{course?.quizCount ?? 0}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">Quizzes</div>
            </div>
          </Link>

          {/* Q&A */}
          <Link href={'/course/'+course?.courseId+'/qa'}>
            <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md transition ${!(course?.qaCount > 0) ? 'opacity-60 pointer-events-auto' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`} title={course?.qaCount > 0 ? 'View Q&A' : 'No Q&A generated yet'}>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{course?.qaCount ?? 0}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">Q&amp;A</div>
            </div>
          </Link>
        </div>

        <hr className="my-1.5" />
        <div className="flex justify-end mt-2 gap-2">
          {course?.status == "Generating" ? (
            <h2 className="text-[13px] rounded-full font-bold p-1.5 px-2 bg-gray-400 text-white flex items-center gap-2 dark:bg-gray-700">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </h2>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={'/course/'+course?.courseId}>
                {loading == true ? (
                  <Button className="bg-blue-700 cursor-pointer dark:hover:bg-blue-300 dark:hover:text-black text-white">
                    <MdRefresh className="h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button onClick={()=>setLoading(true)} className="bg-blue-700 cursor-pointer dark:hover:bg-blue-300 dark:hover:text-black text-white">View</Button>
                )}
              </Link>

              <Button
                onClick={() => { if (isMember) setShowConfirm(true); }}
                className={`bg-red-600 text-white ${!isMember ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isMember || deleteLoading}
              >
                {deleteLoading ? <MdRefresh className="h-4 w-4 animate-spin" /> : 'Delete'}
              </Button>

              {/* Confirmation modal */}
              {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/50" onClick={()=>setShowConfirm(false)} />
                  <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-lg shadow-lg p-6 z-10">
                    <h3 className="text-lg font-semibold">Confirm delete</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Are you sure you want to delete this course? This action cannot be undone.</p>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={()=>setShowConfirm(false)}>Cancel</Button>
                      <Button className="bg-red-600 text-white" onClick={handleDeleteConfirmed} disabled={deleteLoading}>
                        {deleteLoading ? <MdRefresh className="h-4 w-4 animate-spin" /> : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItems