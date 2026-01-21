"use client"
import Image from "next/image";
import React, { useState } from "react";

const SelectOption = ({ selectStudyType }) => {
  const [selectOption, setSelectOption] = useState();
  const options = [
    {
      name: "exam",
      icon: "/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "practice",
      icon: "/practice.png",
    },
    {
      name: "Coding prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];
  return (
    <div>
      <h2 className="text-center text-lg font-semibold mb-4">
        For Which you want to create your personal study material?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {options.map((option, index) => (
          <div
            key={index}
            className={`p-4 flex flex-col rounded-lg border items-center justify-center gap-2 hover:border-blue-700 cursor-pointer ${
              option.name === selectOption ? "border-blue-700" : ""
            }`}
            onClick={() => {
              setSelectOption(option.name);
              selectStudyType(option.name);
            }}
          >
            <Image src={option.icon} alt={option.name} width={50} height={50} />
            <h2 className="text-sm">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
