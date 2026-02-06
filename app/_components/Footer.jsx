import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='py-12 bg-slate-50 border-t border-slate-200'>
        <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10'>
            <div className='col-span-1 md:col-span-1'>
                 <div className='flex items-center gap-2 mb-4'>
                    <Image src={'/logo.svg'} alt='logo' width={32} height={32}/>
                    <h2 className='font-bold text-xl text-slate-800'>Learnify AI</h2>
                </div>
                <p className='text-slate-500 text-sm leading-relaxed'>
                    Empowering the next generation of learners with AI-driven tools.
                </p>
            </div>
            
            <div>
                <h3 className='font-bold text-slate-800 mb-4'>Product</h3>
                <ul className='space-y-3 text-sm text-slate-500'>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Features</li>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Pricing</li>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Testimonials</li>
                </ul>
            </div>

             <div>
                <h3 className='font-bold text-slate-800 mb-4'>Resources</h3>
                <ul className='space-y-3 text-sm text-slate-500'>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Blog</li>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Community</li>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Help Center</li>
                </ul>
            </div>

            <div>
                <h3 className='font-bold text-slate-800 mb-4'>Legal</h3>
                <ul className='space-y-3 text-sm text-slate-500'>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Privacy Policy</li>
                    <li className='hover:text-blue-600 cursor-pointer transition-colors'>Terms of Service</li>
                </ul>
            </div>
        </div>
        <div className='border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-400'>
            © {new Date().getFullYear()} Learnify AI. Crafted with ❤️.
        </div>
    </footer>
  )
}

export default Footer
