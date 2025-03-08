import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Upload } from 'lucide-react'

interface PhotoUploaderProps {
  onClose: () => void
  onPhotoAdd: (photoUrl: string) => void
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onClose, onPhotoAdd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onPhotoAdd(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()

      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)

      const photoUrl = canvas.toDataURL('image/jpeg')
      onPhotoAdd(photoUrl)

      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a photo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="light"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col gap-2 h-auto py-4 rounded-xl"
            >
              <Upload className="h-8 w-8 text-stone-400" />
              <span className="text-sm">Choose file</span>
            </Button>
            <Button 
              variant="light"
              onClick={handleCameraCapture}
              className="flex flex-col gap-2 h-auto py-6 rounded-xl"
            >
              <Camera className="h-8 w-8 text-stone-400" />
              <span className="text-sm t">Take photo</span>
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

