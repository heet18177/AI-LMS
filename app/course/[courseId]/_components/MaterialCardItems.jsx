import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const MaterialCardItems = ({ items, studyTypeContent, course, refreshData }) => {
  const [loading, setLoading] = useState(false);


  const GenerateContent = async () => {
    console.log("fatch course" ,course);
    toast("Generating content, please wait...");
    setLoading(true);
    let chapters = "";
    course?.courseLayout.chapters.forEach((chapter) => {
      chapters = (chapter.title || chapter.chapterTitle) + "," + chapters;
    });

    const result = await axios.post("/api/study-type-content", {
      courseId: course?.courseId,
      studyType: items.name,
      chapters: chapters,
    });
    console.log(result);
    setLoading(false);
    refreshData(true);
    toast.success("Content generated successfully!");
  };
  return (
    <Link href={'/course/'+course?.courseId+items.path}>
    <div
      className={`border shadow-md p-5 rounded-lg flex flex-col items-center mt-2 dark:bg-slate-900
      ${!studyTypeContent?.[items.type] && "grayscale"}
    
    `}
    >
      {!studyTypeContent?.[items.type] ? (
        <h2 className="p-1 px-2 rounded-full bg-green-700 text-white mb-3  text-sm dark:bg-green-300 dark:text-black">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 rounded-full bg-green-700 text-white mb-3  text-sm dark:bg-green-300 dark:text-black">
          Ready
        </h2>
      )}

      <Image src={items.icons} alt={items.name} width={60} height={60} />
      <h2 className="font-medium mt-3">{items.name}</h2>
      <p className="text-gray-400 text-center">{items.description}</p>
      {!studyTypeContent?.[items.type] ? (
        <Button
          className="mt-3 cursor-pointer bg-blue-700 w-full"
          onClick={GenerateContent}
        >
          {loading && <RefreshCcw className="animate-spin" />}
          Generate
        </Button>
      ) : (
        <Button className="mt-3 cursor-pointer bg-blue-700 w-full dark:bg-blue-300 dark:hover:bg-blue-700 dark:text-black">View</Button>
      )}
    </div>
    </Link>
  );
};

export default MaterialCardItems;
