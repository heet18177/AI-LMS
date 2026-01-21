"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-xl flex justify-between">
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">Easy Study</h2>
      </div>
      <UserButton />
    </div>
  );
};

export default DashboardHeader;
