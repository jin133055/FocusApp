"use client"

import { useEffect, useState } from "react"

interface StudyPetProps {
  isTimerActive: boolean
  isBreakTime: boolean
}

export default function StudyPet({ isTimerActive, isBreakTime }: StudyPetProps) {
  const [petMood, setPetMood] = useState<"sleeping" | "focused" | "happy" | "excited">("sleeping")
  const [eyesBlink, setEyesBlink] = useState(false)

  useEffect(() => {
    if (isTimerActive) {
      if (isBreakTime) {
        setPetMood("happy")
      } else {
        setPetMood("focused")
      }
    } else {
      setPetMood("sleeping")
    }
  }, [isTimerActive, isBreakTime])

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        if (petMood !== "sleeping") {
          setEyesBlink(true)
          setTimeout(() => setEyesBlink(false), 150)
        }
      },
      3000 + Math.random() * 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [petMood])

  const getPetExpression = () => {
    switch (petMood) {
      case "sleeping":
        return {
          eyes: "😴",
          mouth: "😴",
          body: "🟤",
          animation: "animate-pulse",
          message: "Zzz... Wake me when it's study time!",
        }
      case "focused":
        return {
          eyes: eyesBlink ? "😑" : "👀",
          mouth: "😐",
          body: "🟫",
          animation: "animate-bounce",
          message: "Let's focus together! 📚",
        }
      case "happy":
        return {
          eyes: eyesBlink ? "😊" : "😄",
          mouth: "😊",
          body: "🟨",
          animation: "animate-wiggle",
          message: "Break time! You're doing great! 🎉",
        }
      default:
        return {
          eyes: "👀",
          mouth: "😊",
          body: "🟫",
          animation: "",
          message: "Ready to study!",
        }
    }
  }

  const pet = getPetExpression()

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {/* Pet Container */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 min-w-[200px]">
          {/* Pet Character */}
          <div className="text-center mb-4">
            <div className={`relative inline-block ${pet.animation}`}>
              {/* Pet Body */}
              <div className="relative">
                <div className="w-16 h-20 bg-gradient-to-b from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full mx-auto mb-2 shadow-lg">
                  {/* Pet Face */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    {/* Eyes */}
                    <div className="flex space-x-2 mb-1">
                      <span className="text-lg">{pet.eyes.charAt(0)}</span>
                      <span className="text-lg">{pet.eyes.charAt(0)}</span>
                    </div>
                    {/* Nose */}
                    <div className="text-center">
                      <span className="text-xs">👃</span>
                    </div>
                    {/* Mouth */}
                    <div className="text-center mt-1">
                      <span className="text-sm">{pet.mouth}</span>
                    </div>
                  </div>

                  {/* Pet Ears */}
                  <div className="absolute -top-2 left-2 w-3 h-4 bg-amber-500 dark:bg-amber-600 rounded-full transform -rotate-12"></div>
                  <div className="absolute -top-2 right-2 w-3 h-4 bg-amber-500 dark:bg-amber-600 rounded-full transform rotate-12"></div>

                  {/* Pet Arms */}
                  <div className="absolute top-8 -left-2 w-4 h-6 bg-amber-500 dark:bg-amber-600 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-8 -right-2 w-4 h-6 bg-amber-500 dark:bg-amber-600 rounded-full transform rotate-12"></div>
                </div>

                {/* Pet Legs */}
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-4 bg-amber-500 dark:bg-amber-600 rounded-full"></div>
                  <div className="w-3 h-4 bg-amber-500 dark:bg-amber-600 rounded-full"></div>
                </div>

                {/* Pet Tail */}
                <div className="absolute top-6 -right-4 w-2 h-8 bg-amber-500 dark:bg-amber-600 rounded-full transform rotate-45 origin-bottom"></div>
              </div>

              {/* Special Effects */}
              {petMood === "focused" && (
                <div className="absolute -top-2 -right-2">
                  <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></div>
                </div>
              )}

              {petMood === "happy" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    <span className="text-yellow-400 animate-bounce">⭐</span>
                    <span className="text-pink-400 animate-bounce" style={{ animationDelay: "0.1s" }}>
                      💖
                    </span>
                    <span className="text-green-400 animate-bounce" style={{ animationDelay: "0.2s" }}>
                      ✨
                    </span>
                  </div>
                </div>
              )}

              {petMood === "sleeping" && (
                <div className="absolute -top-6 right-0">
                  <div className="flex flex-col space-y-1">
                    <span className="text-blue-300 animate-float">💤</span>
                    <span className="text-blue-400 animate-float" style={{ animationDelay: "0.5s" }}>
                      💤
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pet Message */}
          <div className="text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{pet.message}</p>
          </div>

          {/* Pet Name */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Studdy the Focus Buddy</p>
          </div>
        </div>

        {/* Speech Bubble Tail */}
        <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90 dark:border-t-gray-800/90"></div>
      </div>
    </div>
  )
}
