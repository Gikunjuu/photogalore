import React from 'react'

interface MicrophoneProps {
  onClick: () => void
}

export const Microphone: React.FC<MicrophoneProps> = ({ onClick }) => {
  return (
    <div className="group z-10 transform translate-y-10  transition-all duration-300 ease-in-out drop-shadow-lg hover:drop-shadow-2xl hover:-translate-y-1 hover:scale-105 hover:rotate-6">
      <div className="w-20 h-48 flex flex-col items-center transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:rotate-6">
        {/* Microphone Head */}
        <div className="w-20 h-20 relative z-10 border border-gray-600/40 transition-all duration-300 ease-in-out drop-shadow-lg hover:drop-shadow-2xl rounded-full">
          {/* Outer frame */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-300 to-gray-400">
            {/* Mesh pattern container */}
            <div className="absolute inset-[2px] rounded-full overflow-hidden">
              {/* Complex mesh pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_1px,_#silver_1px)] bg-[length:4px_4px]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_46%,_#9CA3AF_47%,_#9CA3AF_53%,_transparent_54%)] bg-[length:4px_4px]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(-45deg,_transparent_46%,_#9CA3AF_47%,_#9CA3AF_53%,_transparent_54%)] bg-[length:4px_4px]"></div>
            </div>
          </div>
          {/* Center band */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"></div>
        </div>
        {/* Microphone Body */}
        <div className="w-16 h-32 relative -mt-4">
          {/* Main body with 3D gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-32 overflow-hidden">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b z-20 from-[#1A1A1A] via-[#2C2C2C] to-[#1A1A1A] clip-path-microphone">
              {/* Left highlight */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/10 to-transparent" />
              {/* Right shadow */}
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/20 to-transparent" />
              {/* Vertical highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />
            </div>
            {/* Bottom cap */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] z-10 h-4 bg-gradient-to-b from-[#2C2C2C] to-[#1A1A1A] rounded-b-full" />
          </div>
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Record voice"
      ></button>
      <style jsx>{`
        .clip-path-microphone {
          clip-path: polygon(0 0, 100% 0, 85% 90%, 15% 90%);
        }
      `}</style>
    </div>
  )
}

