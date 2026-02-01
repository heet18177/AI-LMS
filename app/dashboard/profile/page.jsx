"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'
import { Crown, Mail, User } from 'lucide-react';

function Profile() {
    const { user } = useUser();

    return (
        <div className='p-5 md:p-10'>
            <h2 className='font-bold text-3xl mb-10'>My Profile</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/* Profile Card */}
                <div className='bg-white shadow-md rounded-xl p-8 flex flex-col justify-center items-center border dark:bg-slate-900'>
                    {user?.imageUrl ? (
                        <Image 
                            src={user?.imageUrl} 
                            alt='profile' 
                            width={100} 
                            height={100} 
                            className='rounded-full border-4 border-blue-100 mb-4 object-cover'
                        />
                    ) : (
                        <div className='w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center mb-4 '>
                            <User className='h-12 w-12 text-gray-500' />
                        </div>
                    )}
                    
                    <h2 className='text-2xl font-bold text-center dark:text-white'>{user?.fullName}</h2>
                    <h2 className='text-gray-500 text-sm flex items-center gap-2 mt-2 text-center dark:text-white'>
                        <Mail className='h-4 w-4    '/>
                        {user?.primaryEmailAddress?.emailAddress}
                    </h2>
                </div>

                {/* Additional Info / Stats */}
                <div className='col-span-1 md:col-span-2 bg-white shadow-md rounded-xl p-8 border dark:bg-slate-900'>
                    <h2 className='font-bold text-xl mb-6 text-center dark:text-white'>Account Details</h2>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='p-4 bg-slate-50 rounded-lg dark:bg-slate-900 dark:border dark:border-white'>
                            <h2 className='text-gray-500 text-sm mb-2 dark:text-white'>Member Since</h2>
                            <h2 className='font-semibold text-lg dark:text-white'>
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </h2>
                        </div>
                        
                        <div className='p-4 bg-slate-50 rounded-lg dark:bg-slate-900 dark:border dark:border-white'>
                            <h2 className='text-gray-500 text-sm mb-2 dark:text-white'>Last Sign In</h2>
                            <h2 className='font-semibold text-lg dark:text-white'>
                                {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'N/A'}
                            </h2>
                        </div>
                    </div>

                    <div className='mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col md:flex-row items-center gap-4 dark:bg-slate-900'>
                        <div className='p-3 bg-blue-100 rounded-full dark:bg-blue-900'>
                            <Crown className='h-6 w-6 text-blue-600 dark:text-white'/>
                        </div>
                        <div>
                            <h2 className='font-bold text-blue-700 dark:text-white'>Upgrade Plan</h2>
                            <p className='text-blue-600 text-sm text-center md:text-left dark:text-white'>Unlock premium features and unlimited courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
