"use client"

import { useEffect, useState } from "react"

interface BreathingAnimationProps {
  onComplete: () => void
}

export default function BreathingAnimation({ onComplete }: BreathingAnimationProps) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        onComplete()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, onComplete])

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((current) => {
        switch (current) {
          case "inhale":
            return "hold"
          case "hold":
            return "exhale"
          case "exhale":
            return "inhale"
          default:
            return "inhale"
        }
      })
    }, 2000)

    return () => clearInterval(phaseTimer)
  }, [])

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in..."
      case "hold":
        return "Hold..."
      case "exhale":
        return "Breathe out..."
    }
  }

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return "scale-150"
      case "hold":
        return "scale-150"
      case "exhale":
        return "scale-100"
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 dark:border-gray-700/30 text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Prepare Your Mind</h2>

      <div className="relative w-48 h-48 mx-auto mb-8">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 transition-transform duration-2000 ease-in-out ${getCircleScale()}`}
        ></div>
        <div
          className={`absolute inset-4 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-50 transition-transform duration-2000 ease-in-out ${getCircleScale()}`}
        ></div>
        <div
          className={`absolute inset-8 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-70 transition-transform duration-2000 ease-in-out ${getCircleScale()}`}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{getInstructions()}</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{countdown}</div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400">Take a moment to center yourself before focusing</p>
    </div>
  )
}
