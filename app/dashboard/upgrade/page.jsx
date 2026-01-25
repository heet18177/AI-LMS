"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

function Upgrade() {
  const {user} = useUser();
  const searchParams = useSearchParams();

  useEffect(()=>{
    if(searchParams.get('session_id')){
      VerifyPayment();
    }
  },[searchParams])

  const VerifyPayment = async() => {
    try {
      const result = await axios.get('/api/payment/checkout?session_id='+searchParams.get('session_id'));
      
      if(result.data.success) {
        toast('Plan Upgraded Successfully!');
        window.location.reload(); // To refresh context
      }
    } catch(e) {
      toast('Payment Verification Failed. Please contact support.');
    }
  }
  const plans = [
    {
      name: 'Free',
      price: 0,
      desc: 'Perfect for small study sessions',
      features: [
        '5 AI Courses Generation',
        'Limited Flashcards',
        'Basic & Limited Quiz Access',
        'Limited Question Bank Access',
        'Email Support',
      ]
    },
    {
      name: 'Monthly',
      price: 12.99,
      desc: 'For serious students and creators',
      features: [
        'Unlimited AI Courses',
        'Unlimited Flashcards',
        'Unlimited & Advanced Quizzes',
        'Unlimited Question Bank Access',
        'Priority Email Support',
      ]
    }
  ]

 const onCheckoutClick=async(plan)=>{
    if(plan.price==0){
        // Handle free plan logic if needed, or just return
        return;
    }
    const result = await axios.post('/api/payment/checkout',{
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
    })
    
    if(result.data?.url) {
       window.location.assign(result.data.url);
    }
 }

  return (
    <div className='p-10'>
      <h2 className='font-medium text-3xl text-center'>Upgrade Your Plan</h2>
      <p className='text-gray-500 text-center mt-2'>Select the best plan for your learning journey</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 max-w-4xl mx-auto'>
        {plans.map((plan, index) => (
          <div key={index} className='border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all'>
            <h2 className='font-bold text-2xl'>{plan.name}</h2>
            <div className='mt-4'>
              <span className='text-4xl font-bold'>${plan.price}</span>
              <span className='text-gray-500'>/month</span>
            </div>
            <p className='text-gray-400 mt-3 text-sm'>{plan.desc}</p>

            <ul className='mt-8 space-y-4'>
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className='flex items-center gap-3 text-gray-600'>
                  <Check className='h-5 w-5 text-green-500' />
                  {feature}
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full mt-10 ${plan.price === 0 ? 'variant-outline' : 'bg-blue-600'}`}
              onClick={() => onCheckoutClick(plan)}
            >
              {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Upgrade