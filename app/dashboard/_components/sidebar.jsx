"use client"

import { LayoutDashboard , Shield , UserCircle} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";
import Link from "next/link";


const Sidebar = () => {

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
        <Link href={'/create'}>
        <Button className="w-55 bg-blue-700 hover:bg-blue-800 cursor-pointer text-md">
          + Create New
        </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-60">
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <div
              key={index}
              className={`flex items-center p-3 gap-4 mx-4 hover:bg-slate-200 cursor-pointer px-10 rounded-xl ${
                path == menu.path && "bg-slate-200"
              }`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          ))}
        </div>

        {/* Credit section */}
        <div className="border p-5 bg-slate-100 rounded-xl mx-4">
          <h2 className="text-lg mb-2">Available Credits : 5</h2>
          <Progress value={30} />
          <h2 className="text-sm">1 out of 5 credit used</h2>

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
