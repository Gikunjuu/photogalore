import React from 'react'
import { Polaroid } from './polaroid'
import { NotePaper } from './note-paper'
import { Microphone } from './microphone'
import { CD } from './cd'
import { Pencil } from './pencil'

interface ToolbarProps {
  onAddPhoto: () => void
  onAddNote: (color: string) => void
  onRecordVoice: () => void
  onAddSpotify: (url: string) => void
  onAddDoodle: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddPhoto, onAddNote, onRecordVoice, onAddSpotify, onAddDoodle }) => {
  return (
    <div className="pt-20 mb-4 mx-auto w-full max-w-4xl overflow-hidden">
        <div className="bg-white rounded-2xl h-40 px-4 sm:px-12 relative flex justify-between items-end">
          <Polaroid onClick={onAddPhoto} />
          <NotePaper onAddNote={onAddNote} />
          <Microphone onClick={onRecordVoice} />
          <CD onAddSpotify={onAddSpotify} />
          <Pencil onClick={onAddDoodle} />
        </div>
    </div>
  )
}

