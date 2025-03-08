import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

interface NotePaperProps {
  onAddNote: (color: string) => void
}

const colorOptions = [
  { name: 'White', value: 'bg-white' },
  { name: 'Yellow', value: 'bg-yellow-100' },
  { name: 'Blue', value: 'bg-blue-100' },
  { name: 'Green', value: 'bg-green-100' },
  { name: 'Pink', value: 'bg-pink-100' },
]

const getStackColors = (color: string) => {
  switch (color) {
    case 'bg-white':
      return ['bg-stone-50/80', 'bg-white/90']
    case 'bg-yellow-100':
      return ['bg-yellow-200/70', 'bg-yellow-200/80']
    case 'bg-blue-100':
      return ['bg-blue-200/70', 'bg-blue-200/80']
    case 'bg-green-100':
      return ['bg-green-200/70', 'bg-green-200/80']
    case 'bg-pink-100':
      return ['bg-pink-200/70', 'bg-pink-200/80']
    default:
      return ['bg-stone-50/80', 'bg-white/90']
  }
}

export const NotePaper: React.FC<NotePaperProps> = ({ onAddNote }) => {
  const [color, setColor] = useState(colorOptions[0].value)

  const stackColors = getStackColors(color)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group z-10 -rotate-6 hover:scale-110 transform transition-all duration-300 ease-in-out hover:-translate-y-10 group-hover:rotate-12">
          {/* Paper stack effect */}
          <div className="relative w-32 h-32">
            {/* Bottom papers with shadows */}
            {[3, 2, 1].map((index, i) => (
              <div
                key={index}
                className={`absolute bottom-${index} left-${index} w-full h-full ${stackColors[i]} rounded-sm transform rotate-(${index * 3}) transition-all duration-300 ease-in-out group-hover:rotate-${index * 3} group-hover:translate-x-${index * 3} group-hover:-translate-y-${index * 3}`}
              ></div>
            ))}
            {/* Top paper with paperclip */}
            <div className={`relative w-full h-full ${color} shadow-md rounded-sm transform transition-all duration-300 ease-in-out group-hover:rotate-8 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
              {/* Paper texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-stone-700/5 to-transparent rounded-sm"></div>
              {/* Organic scribbled lines */}
              <div className="absolute inset-0 p-4 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M10 20 Q 20 25, 30 20 T 50 20 T 70 20 T 90 20" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M10 40 Q 25 45, 40 40 T 70 40 T 90 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
            {/* Realistic paperclip */}
            <div className="absolute -top-3 -right-3 w-8 h-12 transform rotate-12 z-10 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1">
              <svg width="100%" height="100%" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6C9 3.23858 11.2386 1 14 1H18C20.7614 1 23 3.23858 23 6V38C23 41.3137 20.3137 44 17 44H15C11.6863 44 9 41.3137 9 38V6Z" stroke="url(#paperclip-gradient)" strokeWidth="3"/>
                <defs>
                  <linearGradient id="paperclip-gradient" x1="16" y1="1" x2="16" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D1D5DB"/>
                    <stop offset="1" stopColor="#9CA3AF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <button
            onClick={() => onAddNote(color)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Add note"
          ></button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 m-8 rounded-2xl bg-white shadow-lg" sideOffset={5}>
        <div className="grid grid-cols-5 gap-2 p-2">
          {colorOptions.map((option) => (
            <Button
              key={option.value}
              className={`w-10 h-10 rounded-full border-2 border-stone-200 ${option.value} hover:brightness-95 transition-colors duration-200`}
              onClick={() => setColor(option.value)}
              aria-label={`Set note color to ${option.name}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

