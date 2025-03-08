import React from 'react'

interface PencilProps {
  onClick: () => void
}

export const Pencil: React.FC<PencilProps> = ({ onClick }) => {
  return (
    <div className="group z-10 transform translate-y-10 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-110 hover:-translate-y-2 hover:rotate-6">
      <div className="w-8 h-48 transition-all duration-300 ease-in-out flex-col items-center">
        {/* Pencil tip */}
        <div className="w-full h-8 bg-[#E5C4A5] clip-path-pencil-tip relative border-x border-b border-orange-600/20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-inner"></div>
        </div>
        {/* Main pencil body with shadow */}
        <div className="w-full h-40 bg-orange-500 rounded-b-sm relative shadow-[2px_2px_4px_rgba(0,0,0,0.1)] border border-orange-600/20">
          {/* Subtle side facets */}
          <div className="absolute inset-y-0 left-[2px] w-[2px] bg-orange-400"></div>
          <div className="absolute inset-y-0 right-[2px] w-[2px] bg-orange-600"></div>
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Add doodle"
      ></button>
      <style jsx>{`
        .clip-path-pencil-tip {
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  )
}

