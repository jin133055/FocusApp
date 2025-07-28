"use client"

import { useEffect, useState } from "react"

interface PetCompanionProps {
  isTimerActive: boolean
  isBreakTime: boolean
  level: number
  streak: number
}

export default function PetCompanion({ isTimerActive, isBreakTime, level, streak }: PetCompanionProps) {
  const [petState, setPetState] = useState<"sleeping" | "focused" | "celebrating" | "idle">("idle")
  const [eyesBlink, setEyesBlink] = useState(false)

  useEffect(() => {
    if (isTimerActive) {
      if (isBreakTime) {
        setPetState("celebrating")
      } else {
        setPetState("focused")
      }
    } else {
      setPetState(streak > 0 ? "idle" : "sleeping")
    }
  }, [isTimerActive, isBreakTime, streak])

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        if (petState !== "sleeping") {
          setEyesBlink(true)
          setTimeout(() => setEyesBlink(false), 150)
        }
      },
      3000 + Math.random() * 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [petState])

  const getPetAnimation = () => {
    switch (petState) {
      case "sleeping":
        return "animate-pulse"
      case "focused":
        return "animate-bounce"
      case "celebrating":
        return "animate-wiggle"
      default:
        return ""
    }
  }

  const getPetMessage = () => {
    switch (petState) {
      case "sleeping":
        return "Zzz... Ready when you are!"
      case "focused":
        return "Let's focus together! 📚✨"
      case "celebrating":
        return "Great work! Time to recharge! 🎉"
      default:
        return "Hello! Ready to be productive?"
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        {/* Pet Container */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/20 min-w-[250px]">
          {/* Pet SVG */}
          <div className="text-center mb-4">
            <div className={`relative inline-block ${getPetAnimation()}`}>
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                {/* Pet Body */}
                <ellipse cx="60" cy="80" rx="35" ry="25" fill="#FFB366" className="drop-shadow-lg" />

                {/* Pet Head */}
                <circle cx="60" cy="45" r="30" fill="#FFB366" className="drop-shadow-lg" />

                {/* Ears */}
                <ellipse cx="45" cy="25" rx="8" ry="15" fill="#FF9A42" transform="rotate(-20 45 25)" />
                <ellipse cx="75" cy="25" rx="8" ry="15" fill="#FF9A42" transform="rotate(20 75 25)" />

                {/* Eyes */}
                <circle cx="50" cy="40" r="4" fill={eyesBlink ? "#FFB366" : "#2D3748"} />
                <circle cx="70" cy="40" r="4" fill={eyesBlink ? "#FFB366" : "#2D3748"} />

                {/* Eye highlights */}
                {!eyesBlink && (
                  <>
                    <circle cx="51" cy="38" r="1.5" fill="white" />
                    <circle cx="71" cy="38" r="1.5" fill="white" />
                  </>
                )}

                {/* Nose */}
                <ellipse cx="60" cy="48" rx="2" ry="1.5" fill="#FF6B35" />

                {/* Mouth */}
                <path d="M 55 52 Q 60 56 65 52" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Arms/Paws */}
                <circle cx="35" cy="65" r="8" fill="#FFB366" />
                <circle cx="85" cy="65" r="8" fill="#FFB366" />

                {/* Tail */}
                <ellipse cx="25" cy="75" rx="6" ry="12" fill="#FF9A42" transform="rotate(-30 25 75)" />

                {/* Special effects based on state */}
                {petState === "focused" && (
                  <>
                    <circle cx="40" cy="20" r="2" fill="#4299E1" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="80" cy="25" r="1.5" fill="#4299E1" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {petState === "celebrating" && (
                  <>
                    <text x="30" y="15" fontSize="12" fill="#F6E05E">
                      ⭐
                    </text>
                    <text x="90" y="20" fontSize="10" fill="#F687B3">
                      💖
                    </text>
                    <text x="75" y="10" fontSize="8" fill="#68D391">
                      ✨
                    </text>
                  </>
                )}

                {petState === "sleeping" && (
                  <>
                    <text x="85" y="25" fontSize="14" fill="#A0AEC0" opacity="0.8">
                      💤
                    </text>
                    <text x="90" y="15" fontSize="10" fill="#A0AEC0" opacity="0.6">
                      💤
                    </text>
                  </>
                )}
              </svg>

              {/* Level indicator */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {level}
              </div>
            </div>
          </div>

          {/* Pet Message */}
          <div className="text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">{getPetMessage()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {streak > 0 ? `${streak} day streak! 🔥` : "Start your journey!"}
            </p>
          </div>
        </div>

        {/* Speech bubble tail */}
        <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90 dark:border-t-gray-800/90"></div>
      </div>
    </div>
  )
}
