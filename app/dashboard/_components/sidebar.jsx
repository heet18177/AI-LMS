"use client"

import { LayoutDashboard , Shield , UserCircle} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { CourseCountContext } from "../../_context/CourseCountContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const Sidebar = () => {

  const { user } = useUser();
  const router = useRouter();
  const {courseCount , setCourseCount} = useContext(CourseCountContext);

  useEffect(()=>{
    user&&GetCourseList();
  },[user])

  const GetCourseList=async()=>{
    const res=await axios.post('/api/courses',{
      createdBy:user?.primaryEmailAddress?.emailAddress
    })
    setCourseCount(res.data.result?.length);
  }

  const courseLimit = async()=>{
    const res = await axios.post('/api/courses', {
      createdBy: user?.primaryEmailAddress?.emailAddress
    });
    setCourseCount(res.data.result.length);

    if(res.data.result.length >= 5 && !res.data.isMember){
      router.push('/dashboard/upgrade');
      toast.error("You have reached the maximum limit of 5 courses");
      return;
    }
    router.push('/create');
  }

  const path = usePathname();
  const menuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon:UserCircle,
      path: "/dashboard/profile",
    },
  ];
  return (
    <div className="h-screen shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 p-5">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">Easy Study</h2>
      </div>

      <div className="mt-9 flex justify-center">
        <div onClick={courseLimit} className="w-full sm:w-auto">
        <Button className="w-55 bg-blue-700 hover:bg-blue-800 cursor-pointer text-md">
          + Create New
        </Button>
        </div>
      </div>

      <div className="flex flex-col gap-60">
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
             <div
              className={`flex items-center p-3 gap-4 mx-4 hover:bg-slate-200 cursor-pointer px-10 rounded-xl ${
                path == menu.path && "bg-slate-200"
              }`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
            </Link>
          ))}
        </div>

        {/* Credit section */}
        <div className="border p-5 bg-slate-100 rounded-xl mx-4">
          <h2 className="text-lg mb-2">Available Credits : {5-courseCount}</h2>
          <Progress value={courseCount/5*100} />
          <h2 className="text-sm">{courseCount} out of 5 credit used</h2>

          <Link
            href={"/dashboard/upgrade"}
            className="text-xs mt-3 text-blue-700"
          >
            Upgrade to create more
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default Sidebar;
