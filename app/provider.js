"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
// import { db } from "../configs/db";
// import { USER_TABLE } from "../configs/schema";
// import { eq } from "drizzle-orm";
import axios from "axios";

const provider = ({ children }) => {
  const { user } = useUser();
  console.log("user", user);
  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    // const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email , user?.primaryEmailAddress?.emailAddress))
    // console.log(result);
    // if(result.length === 0){
    //     await db.insert(USER_TABLE).values({
    //         email: user?.primaryEmailAddress?.emailAddress,
    //         name: user?.fullName,
    //     })
    //     console.log("User created successfully");
    // }

    const resp = await axios.post("/api/create-user", { user: user });
    console.log(resp.data);
  };
  return <div>{children}</div>;
};

export default provider;
