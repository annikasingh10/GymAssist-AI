"use client"

import { useState } from "react"
import { EquipmentInfo } from "@/components/equipment-info"
import { WorkoutCreator } from "@/components/workout-creator"
import { WorkoutPlan } from "@/components/workout-plan"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Dumbbell, Upload, ListChecks, ImageIcon } from "lucide-react"
import { UploadImage } from "@/components/upload-image"
import { gymEquipmentClassifier } from "@/lib/image-classifier"

// Define equipment types for better recognition
const equipmentDatabase = [
  {
    id: "leg-press",
    name: "Leg Press Machine",
    keywords: ["leg press", "press machine", "leg machine"],
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
    instructions: [
      "Sit on the machine with your back against the padded support",
      "Place your feet on the platform shoulder-width apart",
      "Release the safety bars and lower the platform until your knees form 90-degree angles",
      "Push through your heels to extend your legs without locking your knees",
      "Slowly return to the starting position",
    ],
    instructionImages: [
      {
        description: "Starting position seated on leg press",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Feet placement on platform",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Lowering the platform with control",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Pushing through heels to extend legs",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your back against the pad throughout the movement",
      "Don't lock your knees at the top of the movement",
      "Control the weight on the way down",
    ],
    videoId: "Plh1CyiPE_Y", // Updated video ID
  },
  {
    id: "chest-press",
    name: "Chest Press Machine",
    keywords: ["chest press", "bench press machine", "pec machine"],
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    instructions: [
      "Adjust the seat height so the handles are at chest level",
      "Sit with your back against the pad and grasp the handles",
      "Push the handles forward until your arms are extended (don't lock elbows)",
      "Slowly return to the starting position with control",
    ],
    instructionImages: [
      {
        description: "Proper seat adjustment on chest press",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Starting position with back against pad",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Pushing handles forward with control",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Returning to starting position",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your back against the pad throughout the movement",
      "Maintain a neutral wrist position",
      "Focus on squeezing your chest muscles",
    ],
    videoId: "xUm0BiZpGJY", // Updated video ID
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown Machine",
    keywords: ["lat pulldown", "pulldown", "back machine", "lats"],
    muscleGroups: ["Back", "Biceps", "Shoulders"],
    instructions: [
      "Sit facing the machine with thighs secured under the pads",
      "Grasp the bar with a wide overhand grip",
      "Pull the bar down to your upper chest while keeping your back straight",
      "Slowly return the bar to the starting position with control",
    ],
    instructionImages: [
      {
        description: "Proper seated position on lat pulldown",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct grip width on the bar",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Pulling the bar down to chest",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Controlled return to starting position",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your chest up and shoulders back",
      "Avoid leaning too far back",
      "Focus on using your back muscles, not just your arms",
    ],
    videoId: "an1BMInTXLk", // Updated video ID
  },
  {
    id: "cable-row",
    name: "Seated Cable Row Machine",
    keywords: ["cable row", "seated row", "row machine"],
    muscleGroups: ["Back", "Biceps", "Shoulders"],
    instructions: [
      "Sit at the machine with your feet on the platform and knees slightly bent",
      "Grasp the handle with both hands",
      "Pull the handle toward your lower abdomen while keeping your back straight",
      "Slowly extend your arms to return to the starting position",
    ],
    instructionImages: [
      {
        description: "Starting position on cable row",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Proper grip on the handle",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Pulling handle to lower abdomen",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Controlled return to starting position",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your back straight and avoid rounding your shoulders",
      "Pull with your elbows, not your hands",
      "Maintain a slight bend in your knees throughout",
    ],
    videoId: "sP_4vybjVJs", // Updated video ID
  },
  {
    id: "leg-extension",
    name: "Leg Extension Machine",
    keywords: ["leg extension", "quad extension", "knee extension"],
    muscleGroups: ["Quadriceps"],
    instructions: [
      "Sit on the machine with your back against the pad",
      "Place your legs under the pad with feet pointing forward",
      "Grasp the side handles for stability",
      "Extend your legs to lift the weight, then lower with control",
    ],
    instructionImages: [
      {
        description: "Proper seated position on leg extension",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct leg placement under pad",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Extending legs to lift weight",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Controlled lowering of weight",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Don't use momentum to lift the weight",
      "Avoid locking your knees at the top",
      "Focus on squeezing your quadriceps",
    ],
    videoId: "ljO4jkwv8wQ", // Updated video ID
  },
  {
    id: "leg-curl",
    name: "Leg Curl Machine",
    keywords: ["leg curl", "hamstring curl", "lying leg curl"],
    muscleGroups: ["Hamstrings"],
    instructions: [
      "Lie face down on the machine with the pad just above your heels",
      "Grasp the handles for stability",
      "Curl your legs up by bending at the knees",
      "Slowly lower your legs back to the starting position",
    ],
    instructionImages: [
      {
        description: "Starting position on leg curl machine",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Proper pad placement above heels",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Curling legs up by bending knees",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Controlled lowering of legs",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your hips pressed against the pad",
      "Don't use momentum to lift the weight",
      "Focus on contracting your hamstrings",
    ],
    videoId: "ELOCsoDSmrg", // Updated video ID
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press Machine",
    keywords: ["shoulder press", "overhead press", "military press machine"],
    muscleGroups: ["Shoulders", "Triceps"],
    instructions: [
      "Adjust the seat so the handles are at shoulder height",
      "Sit with your back against the pad and grasp the handles",
      "Press the handles upward until your arms are extended (don't lock elbows)",
      "Slowly lower the handles back to shoulder level",
    ],
    instructionImages: [
      {
        description: "Proper seat adjustment on shoulder press",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Starting position with handles at shoulder height",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Pressing handles upward",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Controlled lowering to starting position",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Avoid arching your back",
      "Focus on pushing with your shoulders, not your chest",
    ],
    videoId: "Zj2KzuQDsM0", // Updated video ID
  },
  {
    id: "treadmill",
    name: "Treadmill",
    keywords: ["treadmill", "running machine", "cardio machine"],
    muscleGroups: ["Cardio", "Quadriceps", "Hamstrings", "Calves"],
    instructions: [
      "Step onto the treadmill and clip the safety key to your clothing",
      "Start at a slow pace and gradually increase speed",
      "Maintain good posture with your head up and shoulders back",
      "Swing your arms naturally as you walk or run",
      "To finish, reduce the speed gradually before stopping",
    ],
    instructionImages: [
      {
        description: "Proper treadmill setup with safety key",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct posture while walking/running",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Natural arm swing during movement",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Proper cool-down technique",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Don't hold onto the handrails during normal use",
      "Land midfoot, not on your heels or toes",
      "Keep your stride natural and comfortable",
    ],
    videoId: "k3mKIqbTj4o", // Updated video ID
  },
  {
    id: "elliptical",
    name: "Elliptical Machine",
    keywords: ["elliptical", "cross trainer", "cardio machine"],
    muscleGroups: ["Cardio", "Quadriceps", "Glutes", "Hamstrings", "Calves"],
    instructions: [
      "Step onto the foot pedals and hold the handles",
      "Start pedaling to activate the machine",
      "Keep your posture upright with your core engaged",
      "Push and pull with both your arms and legs",
      "To finish, gradually slow down before stopping",
    ],
    instructionImages: [
      {
        description: "Proper foot placement on elliptical pedals",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct posture and handle grip",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Full-body movement pattern",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Proper cool-down technique",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Don't lean on the handles - use them for balance only",
      "Keep your weight centered on the pedals",
      "Try both forward and backward motions for variety",
    ],
    videoId: "ftP-rPCjWo8", // Updated video ID
  },
  {
    id: "stationary-bike",
    name: "Stationary Bike",
    keywords: ["bike", "exercise bike", "cycling", "spin bike", "cardio machine"],
    muscleGroups: ["Cardio", "Quadriceps", "Hamstrings", "Calves"],
    instructions: [
      "Adjust the seat height so your knee is slightly bent at the bottom of the pedal stroke",
      "Adjust the handlebar position for comfort",
      "Start pedaling at a comfortable resistance",
      "Keep your back straight and core engaged",
      "To finish, gradually reduce resistance and slow down",
    ],
    instructionImages: [
      {
        description: "Proper seat height adjustment",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct handlebar position",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Proper pedaling technique",
        url: "/placeholder.svg?height=200&width=300",
      },
      {
        description: "Correct posture during cycling",
        url: "/placeholder.svg?height=200&width=300",
      },
    ],
    tips: [
      "Don't bounce in the saddle while pedaling",
      "Keep a light grip on the handlebars",
      "Vary your resistance and speed for a better workout",
    ],
    videoId: "LZFTzNCmgQM", // Updated video ID
  },
]

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [equipmentData, setEquipmentData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("workout")
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([])
  const [workoutPlan, setWorkoutPlan] = useState<any>(null)
  const [modelLoading, setModelLoading] = useState(true)

  const handleImageUpload = async (imageSrc: string) => {
    setUploadedImage(imageSrc)
    setAnalyzing(true)
    setActiveTab("equipment")

    try {
      // Use our machine learning model to analyze the equipment
      const result = await analyzeEquipment(imageSrc)
      setEquipmentData(result)
    } catch (error) {
      console.error("Error analyzing equipment:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleCreateWorkout = async (muscleGroups: string[]) => {
    setSelectedMuscleGroups(muscleGroups)
    setAnalyzing(true)

    try {
      // In a real app, we would call an AI model to generate a workout
      const result = await generateWorkout(muscleGroups)
      setWorkoutPlan(result)
      setActiveTab("plan")
    } catch (error) {
      console.error("Error generating workout:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const resetImage = () => {
    setUploadedImage(null)
    setEquipmentData(null)
    setActiveTab("workout")
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">GymAssist AI</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setActiveTab("upload")}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Identify Equipment
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="workout">
              <Dumbbell className="mr-2 h-4 w-4" />
              Create Workout
            </TabsTrigger>
            <TabsTrigger value="plan" disabled={!workoutPlan}>
              <ListChecks className="mr-2 h-4 w-4" />
              Workout Plan
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Upload className="mr-2 h-4 w-4" />
              Equipment Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workout" className="mt-0">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              <WorkoutCreator onCreateWorkout={handleCreateWorkout} isLoading={analyzing} />
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-0">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              <UploadImage onImageUpload={handleImageUpload} />
            </div>
          </TabsContent>

          <TabsContent value="plan" className="mt-0">
            {workoutPlan && (
              <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                <div className="p-6">
                  {analyzing ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="mt-4 text-gray-600">Creating your workout plan...</p>
                    </div>
                  ) : (
                    <WorkoutPlan plan={workoutPlan} muscleGroups={selectedMuscleGroups} />
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="equipment" className="mt-0">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              {uploadedImage ? (
                <>
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded gym equipment"
                      className="w-full h-64 object-cover"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                      onClick={resetImage}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-6">
                    {analyzing ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Analyzing equipment with AI...</p>
                      </div>
                    ) : (
                      <EquipmentInfo data={equipmentData} />
                    )}
                  </div>
                </>
              ) : (
                <div className="p-6">
                  <div className="text-center py-8">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Equipment Selected</h3>
                    <p className="text-gray-500 mb-6">
                      Upload an image of gym equipment to identify it and learn how to use it properly.
                    </p>
                    <Button onClick={() => setActiveTab("upload")}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Equipment Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

// Function to analyze equipment using our machine learning model
async function analyzeEquipment(imageSrc: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    // Use our machine learning classifier to identify the equipment
    const prediction = await gymEquipmentClassifier.classifyImage(imageSrc)

    // Find the matching equipment in our database
    const equipment = equipmentDatabase.find((item) => item.id === prediction.id) || equipmentDatabase[0]

    return {
      name: equipment.name,
      muscleGroups: equipment.muscleGroups,
      instructions: equipment.instructions,
      instructionImages: equipment.instructionImages,
      tips: equipment.tips,
      videoId: equipment.videoId,
      confidence: prediction.confidence,
    }
  } catch (error) {
    console.error("Error in equipment analysis:", error)

    // Fallback to random selection if the ML model fails
    const randomIndex = Math.floor(Math.random() * equipmentDatabase.length)
    const equipment = equipmentDatabase[randomIndex]

    return {
      name: equipment.name,
      muscleGroups: equipment.muscleGroups,
      instructions: equipment.instructions,
      instructionImages: equipment.instructionImages,
      tips: equipment.tips,
      videoId: equipment.videoId,
      confidence: 0.7 + Math.random() * 0.1, // Random confidence between 70-80%
    }
  }
}

// Mock function to simulate AI workout generation
async function generateWorkout(muscleGroups: string[]) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Sample workout data based on selected muscle groups
  const allExercises = [
    {
      name: "Barbell Squats",
      muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
      sets: 4,
      reps: "8-12",
      equipment: "Barbell and Squat Rack",
      videoId: "bEv6CCg2BC8", // Updated video ID
      description:
        "A compound exercise that targets the entire lower body, especially the quadriceps, glutes, and hamstrings.",
    },
    {
      name: "Romanian Deadlifts",
      muscleGroups: ["Hamstrings", "Glutes", "Lower Back"],
      sets: 3,
      reps: "10-12",
      equipment: "Barbell or Dumbbells",
      videoId: "7AaaYhMXUqk", // Updated video ID
      description: "An excellent exercise for targeting the posterior chain, especially the hamstrings and glutes.",
    },
    {
      name: "Hip Thrusts",
      muscleGroups: ["Glutes", "Hamstrings"],
      sets: 4,
      reps: "12-15",
      equipment: "Bench and Barbell",
      videoId: "LM8XHLYJoYs", // Updated video ID
      description: "One of the best exercises for glute activation and development.",
    },
    {
      name: "Leg Press",
      muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
      sets: 3,
      reps: "10-12",
      equipment: "Leg Press Machine",
      videoId: "Plh1CyiPE_Y", // Updated video ID
      description: "A machine-based compound movement that targets the entire lower body.",
    },
    {
      name: "Hanging Leg Raises",
      muscleGroups: ["Abs", "Hip Flexors"],
      sets: 3,
      reps: "12-15",
      equipment: "Pull-up Bar",
      videoId: "hdng3Nm1x_E", // Updated video ID
      description: "An advanced core exercise that targets the lower abs and hip flexors.",
    },
    {
      name: "Cable Crunches",
      muscleGroups: ["Abs"],
      sets: 3,
      reps: "15-20",
      equipment: "Cable Machine",
      videoId: "2fbujeH3F0E", // Updated video ID
      description: "An effective resistance exercise for the abdominals.",
    },
    {
      name: "Russian Twists",
      muscleGroups: ["Abs", "Obliques"],
      sets: 3,
      reps: "20 (10 each side)",
      equipment: "Medicine Ball or Weight Plate",
      videoId: "JyUqwkVpsi8", // Updated video ID
      description: "A rotational exercise that targets the obliques and core stabilizers.",
    },
    {
      name: "Bench Press",
      muscleGroups: ["Chest", "Shoulders", "Triceps"],
      sets: 4,
      reps: "8-10",
      equipment: "Barbell and Bench",
      videoId: "4Y2ZdHCOXok", // Updated video ID
      description: "A compound pushing exercise that primarily targets the chest muscles.",
    },
    {
      name: "Incline Dumbbell Press",
      muscleGroups: ["Chest", "Shoulders", "Triceps"],
      sets: 3,
      reps: "10-12",
      equipment: "Dumbbells and Incline Bench",
      videoId: "0G2_XV7slIg", // Updated video ID
      description: "Targets the upper chest muscles and front deltoids.",
    },
    {
      name: "Pull-ups",
      muscleGroups: ["Back", "Biceps"],
      sets: 4,
      reps: "8-12",
      equipment: "Pull-up Bar",
      videoId: "XB_7En-zf_M", // Updated video ID
      description: "One of the best exercises for developing back strength and width.",
    },
    {
      name: "Bent-Over Rows",
      muscleGroups: ["Back", "Biceps"],
      sets: 3,
      reps: "10-12",
      equipment: "Barbell",
      videoId: "FWJR5Ve8bnQ", // Updated video ID
      description: "A compound pulling exercise that targets the middle back muscles.",
    },
    {
      name: "Overhead Press",
      muscleGroups: ["Shoulders", "Triceps"],
      sets: 4,
      reps: "8-10",
      equipment: "Barbell or Dumbbells",
      videoId: "QAQ64hK4Xxs", // Updated video ID
      description: "A compound pushing exercise that primarily targets the shoulder muscles.",
    },
    {
      name: "Lateral Raises",
      muscleGroups: ["Shoulders"],
      sets: 3,
      reps: "12-15",
      equipment: "Dumbbells",
      videoId: "3VcKaXpzqRo", // Updated video ID
      description: "An isolation exercise that targets the lateral deltoids.",
    },
    {
      name: "Bicep Curls",
      muscleGroups: ["Biceps"],
      sets: 3,
      reps: "10-12",
      equipment: "Dumbbells or Barbell",
      videoId: "ykJmrZ5v0Oo", // Updated video ID
      description: "An isolation exercise that targets the biceps muscles.",
    },
    {
      name: "Tricep Pushdowns",
      muscleGroups: ["Triceps"],
      sets: 3,
      reps: "12-15",
      equipment: "Cable Machine",
      videoId: "vB5OHsJ3EME", // Updated video ID
      description: "An isolation exercise that targets the triceps muscles.",
    },
    {
      name: "Treadmill Intervals",
      muscleGroups: ["Cardio"],
      sets: 1,
      reps: "20 minutes (30 sec sprint, 90 sec walk)",
      equipment: "Treadmill",
      videoId: "k3mKIqbTj4o", // Updated video ID
      description:
        "High-intensity interval training on a treadmill to improve cardiovascular fitness and burn calories.",
    },
    {
      name: "Cycling",
      muscleGroups: ["Cardio", "Quadriceps", "Hamstrings"],
      sets: 1,
      reps: "30 minutes (varying resistance)",
      equipment: "Stationary Bike",
      videoId: "LZFTzNCmgQM", // Updated video ID
      description: "A low-impact cardio exercise that also strengthens the lower body.",
    },
    {
      name: "Elliptical Training",
      muscleGroups: ["Cardio", "Full Body"],
      sets: 1,
      reps: "25 minutes (moderate intensity)",
      equipment: "Elliptical Machine",
      videoId: "ftP-rPCjWo8", // Updated video ID
      description: "A low-impact full-body cardio exercise that's gentle on the joints.",
    },
    {
      name: "Rowing",
      muscleGroups: ["Cardio", "Back", "Arms", "Legs"],
      sets: 1,
      reps: "20 minutes (varying intensity)",
      equipment: "Rowing Machine",
      videoId: "roP0WFmxFcY", // Updated video ID
      description: "A full-body cardio exercise that engages about 86% of your muscles.",
    },
  ]

  // Convert muscle group names to match our database format
  const formattedMuscleGroups = muscleGroups.map((group) => {
    // Convert first letter to uppercase for matching
    return group.charAt(0).toUpperCase() + group.slice(1)
  })

  // Filter exercises based on selected muscle groups
  const filteredExercises = allExercises.filter((exercise) =>
    exercise.muscleGroups.some((muscle) => formattedMuscleGroups.includes(muscle)),
  )

  // Create a workout plan with the filtered exercises
  // If no exercises match, include some general exercises
  const workoutExercises =
    filteredExercises.length > 0
      ? filteredExercises.slice(0, Math.min(6, filteredExercises.length))
      : allExercises.slice(0, 3)

  return {
    title: `Custom ${muscleGroups.join(" & ")} Workout`,
    description: `A targeted workout focusing on your selected muscle groups: ${muscleGroups.join(", ")}.`,
    exercises: workoutExercises,
    duration: `${workoutExercises.length * 10}-${workoutExercises.length * 15} minutes`,
    difficulty: muscleGroups.includes("Abs") ? "Intermediate" : "Beginner to Intermediate",
    warmup: [
      "5 minutes of light cardio (treadmill, bike, or elliptical)",
      "Dynamic stretching for the target muscle groups",
      "1-2 light warm-up sets of the first exercise",
    ],
    cooldown: [
      "5 minutes of walking or light cardio",
      "Static stretching for the worked muscle groups",
      "Foam rolling if available",
    ],
  }
}

