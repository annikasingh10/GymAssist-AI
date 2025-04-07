import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, List, Lightbulb, Image } from "lucide-react"

interface InstructionImage {
  description: string
  url: string
}

interface EquipmentInfoProps {
  data: {
    name: string
    muscleGroups: string[]
    instructions: string[]
    instructionImages: InstructionImage[]
    tips: string[]
    videoId: string
    confidence: number
  } | null
}

export function EquipmentInfo({ data }: EquipmentInfoProps) {
  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No equipment data available</p>
        <p className="text-sm text-gray-400">Upload an image to identify gym equipment and get usage instructions.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <div className="flex items-center mt-1">
          <div className="text-sm text-gray-500">AI Confidence: {Math.round(data.confidence * 100)}%</div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Dumbbell className="mr-2 h-5 w-5" />
            Target Muscle Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mt-1">
            {data.muscleGroups.map((muscle, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {muscle}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${data.videoId}`}
          title={`How to use ${data.name}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="instructions">
            <List className="mr-2 h-4 w-4" />
            Instructions
          </TabsTrigger>
          <TabsTrigger value="steps">
            <Image className="mr-2 h-4 w-4" />
            Step-by-Step
          </TabsTrigger>
          <TabsTrigger value="tips">
            <Lightbulb className="mr-2 h-4 w-4" />
            Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <ol className="space-y-2 list-decimal list-inside">
                {data.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.instructionImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video w-full bg-gray-100">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Step {index + 1}:</span> {image.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Note: These are placeholder images. In a production app, these would be actual photos of the equipment in
            use.
          </p>
        </TabsContent>

        <TabsContent value="tips" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {data.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

