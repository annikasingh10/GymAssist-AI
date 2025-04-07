import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface ModelStatusProps {
  isLoading: boolean
}

export function ModelStatus({ isLoading }: ModelStatusProps) {
  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>AI Model Status</AlertTitle>
      <AlertDescription>
        {isLoading ? (
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
            <span>Loading image recognition model...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
            <span>Image recognition model ready</span>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}

