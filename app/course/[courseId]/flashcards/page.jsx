"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DashboardHeader from "@/app/dashboard/_components/dashboardHeader";

const Flashcards = () => {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api , setApi] = useState(null);

  useEffect(() => {
    GetFlashcards();
  }, []);

  useEffect(() => {
    if(!api){
      return ;
    }
    api.on('select', () => {
      setIsFlipped(false);
    });

  }, [api]);

  const GetFlashcards = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Flashcards",
    });
    console.log("Flashcards data:", result.data);
    setFlashcards(result.data);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
    <DashboardHeader/>
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Flashcards
        </h2>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
          Flashcards: The ultimate study tool to enhance learning
        </p>
      </div>

        <Carousel setApi={setApi} className="relative mx-auto max-w-xl">
        <CarouselContent className="flex items-center">
          {flashcards?.content.map((flashcard, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <FlashcardItem
              flashcard={flashcard}
              handleClick={handleClick}
              isFlipped={isFlipped}
            />
          </CarouselItem>))}
        </CarouselContent>

        <CarouselPrevious className="left-[-3rem] h-10 w-10 rounded-full border bg-white shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800" />
        <CarouselNext className="right-[-3rem] h-10 w-10 rounded-full border bg-white shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800" />
      </Carousel>
    </div>
    </div>
  );
};

export default Flashcards;
