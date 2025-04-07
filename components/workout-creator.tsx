"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dumbbell } from "lucide-react"

interface WorkoutCreatorProps {
  onCreateWorkout: (muscleGroups: string[]) => void
  isLoading: boolean
}

export function WorkoutCreator({ onCreateWorkout, isLoading }: WorkoutCreatorProps) {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])

  const muscleGroups = [
    { id: "abs", label: "Abs", icon: "💪" },
    { id: "glutes", label: "Glutes", icon: "🍑" },
    { id: "hamstrings", label: "Hamstrings", icon: "🦵" },
    { id: "quadriceps", label: "Quadriceps", icon: "🦵" },
    { id: "calves", label: "Calves", icon: "🦵" },
    { id: "chest", label: "Chest", icon: "💪" },
    { id: "back", label: "Back", icon: "💪" },
    { id: "shoulders", label: "Shoulders", icon: "💪" },
    { id: "biceps", label: "Biceps", icon: "💪" },
    { id: "triceps", label: "Triceps", icon: "💪" },
    { id: "cardio", label: "Cardio", icon: "🏃" },
  ]

  const handleToggleMuscle = (muscle: string) => {
    setSelectedMuscles((prev) => (prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]))
  }

  const handleCreateWorkout = () => {
    if (selectedMuscles.length > 0) {
      onCreateWorkout(selectedMuscles)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Your Custom Workout</h2>
        <p className="text-gray-600">Select the muscle groups you want to target in today's workout.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {muscleGroups.map((muscle) => (
          <Card
            key={muscle.id}
            className={`cursor-pointer transition-all ${
              selectedMuscles.includes(muscle.label) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
            }`}
            onClick={() => handleToggleMuscle(muscle.label)}
          >
            <CardContent className="p-4 flex items-center space-x-2">
              <Checkbox
                id={muscle.id}
                checked={selectedMuscles.includes(muscle.label)}
                onCheckedChange={() => handleToggleMuscle(muscle.label)}
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label htmlFor={muscle.id} className="flex-1 cursor-pointer flex items-center">
                <span className="mr-2">{muscle.icon}</span>
                {muscle.label}
              </Label>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleCreateWorkout}
          disabled={selectedMuscles.length === 0 || isLoading}
          className="px-8"
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Workout...
            </>
          ) : (
            <>
              <Dumbbell className="mr-2 h-5 w-5" />
              Create My Workout
            </>
          )}
        </Button>
      </div>

      {selectedMuscles.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">Please select at least one muscle group</p>
      )}
    </div>
  )
}

