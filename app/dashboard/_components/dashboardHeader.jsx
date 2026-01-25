"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
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

const DashboardHeader = () => {
  const router = useRouter();
  return (
    <div className="p-5 shadow-xl flex justify-between">
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
      <UserButton />
    </div>
  );
};

export default DashboardHeader;
