"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {

  const router = useRouter();

  const [theme , setTheme] = useState('light');

  const handelTheme = ()=>{
    if(theme == 'light'){
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }else{
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }
  return (
    <div className="p-5 shadow-xl flex justify-between dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <AlignJustify className="md:hidden block" />
          </SheetTrigger>
          <SheetContent side="left">
             <SheetHeader>
              <SheetTitle className="hidden"></SheetTitle>   
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} onClick={()=>router.push('/dashboard')} className="cursor-pointer"/>
        <h2 className="font-bold text-2xl">Easy Study</h2>
      
      </div>
      <div className="flex items-center gap-3">
      {theme == 'light' ?   <Button onClick={handelTheme} className="cursor-pointer"><MdOutlineLightMode /></Button> : <Button onClick={handelTheme} className="cursor-pointer"><MdOutlineDarkMode /></Button>}
      <UserButton/>
      </div>
    </div>
  );
};

export default DashboardHeader;
