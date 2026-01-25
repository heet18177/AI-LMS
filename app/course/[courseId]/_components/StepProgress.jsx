import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

function StepProgress({ stepCount, setStepCount, data = [] }) {
  return (
    <div className="flex items-center gap-4 mt-6">
      
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={stepCount === 0}
        onClick={() => setStepCount(stepCount - 1)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {/* Progress Bars */}
      <div className="flex flex-1 gap-2">
        {data.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300
              ${index <= stepCount ? 'bg-blue-600' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>

      {/* Next Button */}
      <Button
        size="sm"
        className="bg-blue-600 hover:bg-blue-700"
        disabled={stepCount === data.length - 1}
        onClick={() => setStepCount(stepCount + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

export default StepProgress
