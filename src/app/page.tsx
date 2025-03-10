"use client"

import React, { useState, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toolbar } from '@/components/toolbar'
import { LetterCanvas } from '@/components/letter-canvas'
import { PhotoUploader } from '@/components/photo-uploader'
import { VoiceRecorder } from '@/components/voice-recorder'
import { DoodleDrawer } from '@/components/doodle-drawer'
import { DottedBackground } from '@/components/dotted-background'
// import { SpotifyPlayer } from '@/components/spotify-player'

export interface LetterItem {
  id: string
  type: 'photo' | 'note' | 'voice' | 'spotify' | 'doodle'
  content: string | Blob
  position: { x: number; y: number }
  rotation: number
  scale?: number
  color?: string
  caption?: string
  offsetX?: number
  offsetY?: number
}

export default function DigitalLetterComposer() {
  const [items, setItems] = useState<LetterItem[]>([])
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState(false)
  const [isVoiceRecorderOpen, setIsVoiceRecorderOpen] = useState(false)
  const [isDoodleDrawerOpen, setIsDoodleDrawerOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [currentItem, setCurrentItem] = useState<LetterItem | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const addItem = (item: LetterItem) => {
    setItems((prevItems) => [...prevItems, item])
  }

  const updateItemPosition = (id: string, position: { x: number; y: number }) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, position } : item
      )
    )
  }

  const updateItemContent = (id: string, content: string, field: string = 'content') => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: content } : item
      )
    )
  }

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, item: LetterItem) => {
    const position = 'touches' in e ? e.touches[0] : e
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const offsetX = position.clientX - rect.left
    const offsetY = position.clientY - rect.top
    
    setIsDragging(true)
    setCurrentItem({
      ...item,
      position: {
        x: item.position.x,
        y: item.position.y,
      },
      offsetX,
      offsetY,
    } as LetterItem & { offsetX: number; offsetY: number })
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !currentItem || !canvasRef.current) return
    
    const position = 'touches' in e ? e.touches[0] : e
    const rect = canvasRef.current.getBoundingClientRect()
    const x = position.clientX - rect.left - (currentItem?.offsetX ?? 0)
    const y = position.clientY - rect.top - (currentItem?.offsetY ?? 0)

    updateItemPosition(currentItem.id, { x, y })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setCurrentItem(null)
  }

  const addNote = (color: string) => {
    addItem({
      id: Date.now().toString(),
      type: 'note',
      content: '',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      rotation: (Math.random() - 0.5) * 10,
      color: color // Ensure the color is being set correctly
    })
  }

  const addSpotifyPlayer = (spotifyUrl: string) => {
    addItem({
      id: Date.now().toString(),
      type: 'spotify',
      content: spotifyUrl,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      rotation: (Math.random() - 0.5) * 10
    })
  }

  const addDoodle = (doodleUrl: string) => {
    addItem({
      id: Date.now().toString(),
      type: 'doodle',
      content: doodleUrl,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      rotation: (Math.random() - 0.5) * 10
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen overflow-hidden bg-stone-200 flex flex-col relative">
        <DottedBackground />
        <main 
          className="flex-1 relative overflow-hidden z-20"
          ref={canvasRef}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <LetterCanvas 
            items={items} 
            updateItemPosition={updateItemPosition}
            updateItemContent={updateItemContent}
            deleteItem={deleteItem}
            handleDragStart={handleDragStart}
            isDragging={isDragging}
            currentItem={currentItem}
          />
        </main>
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <Toolbar
            onAddPhoto={() => setIsPhotoUploaderOpen(true)}
            onAddNote={addNote}
            onRecordVoice={() => setIsVoiceRecorderOpen(true)}
            onAddSpotify={addSpotifyPlayer}
            onAddDoodle={() => setIsDoodleDrawerOpen(true)}
          />
        </div>
        {isPhotoUploaderOpen && (
          <PhotoUploader
            onClose={() => setIsPhotoUploaderOpen(false)}
            onPhotoAdd={(photoUrl) => {
              addItem({
                id: Date.now().toString(),
                type: 'photo',
                content: photoUrl,
                position: { x: Math.random() * 200, y: Math.random() * 200 },
                rotation: (Math.random() - 0.5) * 10,
                caption: ''
              })
              setIsPhotoUploaderOpen(false)
            }}
          />
        )}
        {isVoiceRecorderOpen && (
          <VoiceRecorder
            onClose={() => setIsVoiceRecorderOpen(false)}
            onVoiceAdd={(audioBlob) => {
              addItem({
                id: Date.now().toString(),
                type: 'voice',
                content: audioBlob,
                position: { x: Math.random() * 200, y: Math.random() * 200 },
                rotation: (Math.random() - 0.5) * 10
              })
              setIsVoiceRecorderOpen(false)
            }}
          />
        )}
        {isDoodleDrawerOpen && (
          <DoodleDrawer
            onClose={() => setIsDoodleDrawerOpen(false)}
            onDoodleAdd={(doodleUrl) => {
              addDoodle(doodleUrl)
              setIsDoodleDrawerOpen(false)
            }}
          />
        )}
      </div>
    </DndProvider>
  )
}