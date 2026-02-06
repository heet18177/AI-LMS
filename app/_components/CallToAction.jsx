"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function CallToAction() {
  const { isSignedIn } = useUser();

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-40"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to transform your learning?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of students and creators who are already using AI LMS to master new skills faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isSignedIn ? (
                    <Link href={'/dashboard'}>
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-lg rounded-full font-bold shadow-lg shadow-white/10">
                            Go to Dashboard
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link href={'/sign-up'}>
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-lg rounded-full font-bold shadow-lg shadow-white/10">
                                Get Started for Free
                            </Button>
                        </Link>
                        <Link href={'/sign-in'}>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white h-14 px-8 text-lg rounded-full font-bold">
                                Log In
                            </Button>
                        </Link>
                    </>
                )}
            </div>
            {!isSignedIn && <p className="mt-8 text-sm text-slate-500">No credit card required • Free tier available</p>}
        </div>
    </section>
  )
}

export default CallToAction
