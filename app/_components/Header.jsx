"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

function Header() {
  const { user, isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div className='fixed top-0 w-full z-50 px-4 py-3'>
        <div className='max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl border border-white/20 shadow-sm rounded-full px-6 py-2'>
            <div className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity'>
                <Image src={'/logo.svg'} alt='logo' width={32} height={32}/>
                <h2 className='font-bold text-xl text-slate-800 tracking-tight'>Learnify AI</h2>
            </div>
            
            {/* Desktop Menu */}
            <div className='hidden md:flex items-center gap-4'>
                {isSignedIn ? (
                    <>
                        <Link href={'/dashboard'}>
                            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Dashboard</Button>
                        </Link>
                        <UserButton />
                    </>
                ) : (
                    <div className='flex items-center gap-3'>
                        <Link href={'/sign-in'}>
                            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">Log In</Button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6 shadow-lg shadow-slate-200">Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className='md:hidden'>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-slate-700" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="mb-6">
                            <div className='flex items-center gap-2'>
                                <Image src={'/logo.svg'} alt='logo' width={32} height={32}/>
                                <h2 className='font-bold text-xl text-slate-800'>Learnify AI</h2>
                            </div>
                        </SheetHeader>
                        
                        <div className='flex flex-col gap-4'>
                            {isSignedIn ? (
                                <>
                                    <div className='mb-4 flex items-center gap-2 border p-3 rounded-lg bg-slate-50'>
                                        <UserButton />
                                        <span className='font-medium text-sm'>{user?.fullName}</span>
                                    </div>
                                    <Link href={'/dashboard'} onClick={() => setOpen(false)}>
                                        <Button className="w-full" variant="outline">Dashboard</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={'/sign-in'} onClick={() => setOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start text-lg">Log In</Button>
                                    </Link>
                                    <Link href={'/sign-up'} onClick={() => setOpen(false)}>
                                        <Button className="w-full rounded-full bg-slate-900 text-white">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
  )
}

export default Header
