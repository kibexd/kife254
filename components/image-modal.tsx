"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  image: {
    src: string
    alt: string
    title: string
    description: string
    category?: string
  }
}

export function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background">
        <div className="relative aspect-video w-full">
          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <DialogHeader className="p-6">
          <div className="flex items-center gap-2 mb-2">
            {image.category && (
              <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                {image.category}
              </span>
            )}
          </div>
          <DialogTitle className="text-xl">{image.title}</DialogTitle>
          <DialogDescription>{image.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
