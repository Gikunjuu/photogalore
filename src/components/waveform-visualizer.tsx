"use client"

import React, { useRef, useEffect } from 'react'

interface WaveformVisualizerProps {
  audioContext: AudioContext | null
  sourceNode: MediaStreamAudioSourceNode | AudioBufferSourceNode | null
  isRecording: boolean
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ audioContext, sourceNode, isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !audioContext || !sourceNode) return

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) return

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    sourceNode.connect(analyser)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height
      
      analyser.getByteFrequencyData(dataArray)

      canvasCtx.fillStyle = 'rgb(255, 255, 255)'
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

      const barWidth = (WIDTH / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * HEIGHT

        canvasCtx.fillStyle = `rgb(${dataArray[i]}, 50, 50)`
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      if (isRecording) {
        requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      sourceNode.disconnect(analyser)
    }
  }, [audioContext, sourceNode, isRecording])

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-24 bg-gray-100 rounded-md"
      width={300}
      height={100}
    />
  )
}

