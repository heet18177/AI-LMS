"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <div className='relative overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-28'>
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

        <div className='max-w-7xl mx-auto px-6 text-center'>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-sm font-medium text-slate-600">New: AI Course Generator 2.0</span>
            </div>

            <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]'>
                Master any subject with <br/>
                <span className='bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>AI-Powered Personalization</span>
            </h1>
            
            <p className='text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed'>
                Transform your learning experience. Generate courses, flashcards, and quizzes effortlessly with our advanced AI engine.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
                {isSignedIn ? (
                    <Link href={'/dashboard'}>
                        <Button size="lg" className='h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:scale-105'>
                            Go to Dashboard
                            <MoveRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link href={'/sign-up'}>
                            <Button size="lg" className='h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:scale-105'>
                                Get Started Free
                                <MoveRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href={'/sign-in'}>
                             <Button size="lg" variant='outline' className='h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 text-slate-700'>
                                Log In
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default Hero
