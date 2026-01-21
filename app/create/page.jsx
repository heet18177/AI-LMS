"use client";
import { v4 as uuidv4 } from "uuid";
import SelectOption from "./_components/SelectOption";
import TopicInput from "./_components/TopicInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Create = () => {
  const { user } = useUser();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [loading , setLoading] = useState(false);

  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };

  // this function will call the api to generate course outline
  const generateCoureseOutline = async () => {
    try {
      const courseId = uuidv4();
      setLoading(true);
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
      });
      setLoading(false)
      router.replace('/dashboard')
      toast("Your course content is generating , click refresh button");
      console.log("Success:", result.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };
  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-blue-700">
        Start Building Your Personal Study Materials...
      </h2>
      <p className="text-gray-500 text-lg">
        Fill all details in order to generate study material for your next
        project
      </p>

      <div className="mt-10">
        {step == 0 ? (
          <SelectOption
            selectStudyType={(value) => handleUserInput("courseType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-20">
        {step != 0 ? (
          <button
            className="w-35 hover:bg-gray-100 cursor-pointer text-lg font-semibold px-3 rounded-md border py-1"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </button>
        ) : (
          "---"
        )}

        {step === 0 ? (
          <button
            className="w-35 bg-blue-700 hover:bg-blue-800 cursor-pointer text-lg font-semibold text-white px-3 rounded-md py-1"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="w-35 bg-blue-700 hover:bg-blue-800 cursor-pointer text-lg font-semibold text-white px-3 rounded-md py-1"
            onClick={generateCoureseOutline} disabled={loading}
          >
            {loading ? <Loader className="animate-spin flex justify-center items-center"/> : "Generate"}
          
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
