"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon } from "lucide-react"

interface UploadImageProps {
  onImageUpload: (imageSrc: string) => void
}

export function UploadImage({ onImageUpload }: UploadImageProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    // Trigger the file input click when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Gym Equipment Image</h2>
      <p className="text-gray-600 mb-6">
        Upload an image of gym equipment to identify it and learn how to use it properly.
      </p>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gray-500" />
          </div>

          <p className="text-gray-700 mb-2">{dragActive ? "Drop the image here" : "Drag & drop an image here"}</p>
          <p className="text-gray-500 text-sm mb-4">or</p>

          <Button onClick={handleButtonClick}>
            <Upload className="mr-2 h-4 w-4" />
            Select Image
          </Button>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} ref={fileInputRef} />

          <p className="text-xs text-gray-500 mt-4">Supported formats: JPG, PNG, GIF</p>
        </div>
      </div>
    </div>
  )
}

