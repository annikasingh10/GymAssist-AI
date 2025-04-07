import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Clock, BarChart3 } from "lucide-react"

interface Exercise {
  name: string
  muscleGroups: string[]
  sets: number
  reps: string
  equipment: string
  videoId: string
  description: string
}

interface WorkoutPlanProps {
  plan: {
    title: string
    description: string
    exercises: Exercise[]
    duration: string
    difficulty: string
    warmup: string[]
    cooldown: string[]
  }
  muscleGroups: string[]
}

export function WorkoutPlan({ plan, muscleGroups }: WorkoutPlanProps) {
  // Convert muscle group names to match our database format for comparison
  const formattedMuscleGroups = muscleGroups.map((group) => group.charAt(0).toUpperCase() + group.slice(1))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{plan.title}</h2>
        <p className="text-gray-600 mt-1">{plan.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 flex items-center">
            <Dumbbell className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Exercises</div>
              <div className="font-medium">{plan.exercises.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium">{plan.duration}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Difficulty</div>
              <div className="font-medium">{plan.difficulty}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises">
            <Dumbbell className="mr-2 h-4 w-4" />
            Exercises
          </TabsTrigger>
          <TabsTrigger value="warmup">
            <Clock className="mr-2 h-4 w-4" />
            Warm-up
          </TabsTrigger>
          <TabsTrigger value="cooldown">
            <BarChart3 className="mr-2 h-4 w-4" />
            Cool-down
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="mt-4 space-y-4">
          {plan.exercises.map((exercise, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  {exercise.muscleGroups.map((muscle, i) => (
                    <div
                      key={i}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        formattedMuscleGroups.includes(muscle)
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {muscle}
                    </div>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-3">{exercise.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Sets</div>
                        <div className="text-gray-600">{exercise.sets}</div>
                      </div>
                      <div>
                        <div className="font-medium">Reps</div>
                        <div className="text-gray-600">{exercise.reps}</div>
                      </div>
                      <div>
                        <div className="font-medium">Equipment</div>
                        <div className="text-gray-600">{exercise.equipment}</div>
                      </div>
                    </div>
                  </div>

                  <div className="aspect-video rounded-md overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${exercise.videoId}`}
                      title={exercise.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="warmup" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {plan.warmup.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5">{index + 1}.</div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cooldown" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {plan.cooldown.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5">{index + 1}.</div>
                    <span className="text-gray-700">{item}</span>
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

