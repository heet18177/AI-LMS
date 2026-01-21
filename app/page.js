import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Hello guys</h1>
      <UserButton/>
    </div>
  );
}
