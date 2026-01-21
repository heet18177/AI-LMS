"use client"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
    const {user} = useUser()
  return (
    <div className="p-5 bg-blue-600 rounded-2xl text-white flex items-center gap-6">
        <Image src={'/laptop.png'} alt={'laptop'} width={100} height={100}/>
        <div>
            <h2 className="text-3xl font-bold">Hello , {user?.fullName}</h2>
            <p>Welcome back , Its time to ge back and start learn new course</p>
        </div>
    </div>
  );
};

export default WelcomeBanner;
