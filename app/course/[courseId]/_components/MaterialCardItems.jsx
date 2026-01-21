import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const MaterialCardItems = ({ items, studyTypeContent, course }) => {
  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    setLoading(true);
    let chapters = "";
    course?.courseLayout.chapters.forEach((chapter) => {
      chapters = (chapter.title || chapter.chapterTitle) + "," + chapters;
    });

    const result = await axios.post("api/study-type-content", {
      courseId: course?.courseId,
      type: items.name,
      chapters: chapters,
    });
    console.log(result);
    setLoading(false);
  };
  return (
    <div
      className={`border shadow-md p-5 rounded-lg flex flex-col items-center mt-2
      ${studyTypeContent?.[items.type]?.length == null && "grayscale"}
    
    `}
    >
      {studyTypeContent?.[items.type]?.length == null ? (
        <h2 className="p-1 px-2 rounded-full bg-green-700 text-white mb-3  text-sm">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 rounded-full bg-green-700 text-white mb-3  text-sm">
          Ready
        </h2>
      )}

      <Image src={items.icons} alt={items.name} width={60} height={60} />
      <h2 className="font-medium mt-3">{items.name}</h2>
      <p className="text-gray-500 ">{items.description}</p>
      {studyTypeContent?.[items.type]?.length == null ? (
        <Button
          className="mt-3 cursor-pointer bg-blue-700 w-full"
          onClick={GenerateContent}
        >
          {loading && <RefreshCcw className="animate-spin" />}
          Generate
        </Button>
      ) : (
        <Button className="mt-3 cursor-pointer bg-blue-700 w-full">View</Button>
      )}
    </div>
  );
};

export default MaterialCardItems;
