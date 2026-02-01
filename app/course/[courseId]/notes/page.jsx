"use client";

import DashboardHeader from "@/app/dashboard/_components/dashboardHeader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Viewnotes = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notes when courseId changes
  useEffect(() => {
    if (courseId) {
      getNotes();
    }
  }, [courseId]);

  const getNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
      });

      setNotes(result.data?.notes || []);
      setStepCount(0); // reset step
    } catch (err) {
      console.error(err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <DashboardHeader />
        <p className="p-6">Loading notes...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <DashboardHeader />
        <p className="p-6 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader />

      {/* Progress Bar */}
      <div className="flex gap-3 items-center px-5 mt-5">
        <Button
          variant="outline"
          disabled={stepCount === 0}
          onClick={() => setStepCount((prev) => prev - 1)}
        >
          Previous
        </Button>

        {notes.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= stepCount ? "bg-blue-700" : "bg-gray-300"
            }`}
          />
        ))}

        <Button
          className="bg-blue-700"
          disabled={stepCount >= notes.length - 1}
          onClick={() => setStepCount((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* Notes Content */}
      <div className="px-6 mt-8">
        {notes.length > 0 && notes[stepCount] && (
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-li:my-2 prose-img:rounded-lg prose-img:shadow-md px-5 md:px-20 lg:px-32">
            <div
              className="notes-content"
              dangerouslySetInnerHTML={{ __html: notes[stepCount].notes }}
            />
          </div>
        )}

        {/* End of Notes */}
        {stepCount === notes.length - 1 && notes.length > 0 && (
          <div className="mt-8 text-center ">
            <h2 className="mb-4 text-xl font-semibold">End of notes</h2>
            <Button onClick={() => router.back()} className="mb-5">Go back to course</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewnotes;
