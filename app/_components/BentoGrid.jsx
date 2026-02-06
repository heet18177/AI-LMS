import React from 'react'
import { BrainCircuit, BookOpen, Layers, Zap, GraduationCap, Video } from 'lucide-react'

function BentoGrid() {
  const features = [
    {
      title: "AI Course Generator",
      desc: "Turn any topic into a complete course in seconds.",
      icon: <BrainCircuit className="h-8 w-8 text-white" />,
      className: "md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
      textColor: "text-blue-100"
    },
    {
      title: "Smart Flashcards",
      desc: "Auto-generated cards for active recall.",
      icon: <Layers className="h-8 w-8 text-blue-600" />,
      className: "md:col-span-1 bg-white border border-slate-200",
      textColor: "text-slate-500"
    },
    {
        title: "Video Lessons",
        desc: "Curated youtube videos for each chapter.",
        icon: <Video className="h-8 w-8 text-purple-600" />,
        className: "md:col-span-1 bg-white border border-slate-200",
        textColor: "text-slate-500"
    },
    {
      title: "Interactive Quizzes",
      desc: "Test your knowledge with AI-generated questions.",
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      className: "md:col-span-1 bg-white border border-slate-200",
      textColor: "text-slate-500"
    },
    {
      title: "Learning Paths",
      desc: "Structured roadmap for your learning journey.",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      className: "md:col-span-1 bg-white border border-slate-200",
      textColor: "text-slate-500"
    },
  ]

  return (
    <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-4">
                Everything you need to <span className="text-blue-600">master anything.</span>
            </h2>
            <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
                Our platform provides a comprehensive suite of AI-powered tools designed to enhance your learning efficiency and retention.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, i) => (
                    <div 
                        key={i} 
                        className={`p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.className} flex flex-col justify-between h-full`}
                    >
                        <div className="mb-4 p-3 rounded-2xl bg-white/10 w-fit backdrop-blur-sm">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold mb-2 ${feature.className.includes('text-white') ? 'text-white' : 'text-slate-800'}`}>
                                {feature.title}
                            </h3>
                            <p className={`text-lg leading-relaxed ${feature.textColor}`}>
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default BentoGrid
