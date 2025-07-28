"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import BreathingAnimation from "./BreathingAnimation"

interface PomodoroTimerProps {
  onTimerStateChange: (isActive: boolean) => void
  onBreakStateChange: (isBreak: boolean) => void
}

export default function PomodoroTimer({ onTimerStateChange, onBreakStateChange }: PomodoroTimerProps) {
  const { state, updatePomodoroSettings, completePomodoro } = useApp()
  const [minutes, setMinutes] = useState(state.pomodoroSettings.workDuration)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [strictMode, setStrictMode] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBreathing, setShowBreathing] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          // Timer completed
          setIsActive(false)
          completePomodoro()

          // Switch between work and break
          const newSessionCount = sessionCount + 1
          setSessionCount(newSessionCount)

          if (isBreak) {
            setMinutes(state.pomodoroSettings.workDuration)
            setIsBreak(false)
          } else {
            const isLongBreak = newSessionCount % state.pomodoroSettings.longBreakInterval === 0
            setMinutes(isLongBreak ? state.pomodoroSettings.longBreak : state.pomodoroSettings.shortBreak)
            setIsBreak(true)
          }
          setSeconds(0)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, minutes, seconds, isBreak, sessionCount, state.pomodoroSettings, completePomodoro])

  useEffect(() => {
    onTimerStateChange(isActive)
    onBreakStateChange(isBreak)
  }, [isActive, isBreak, onTimerStateChange, onBreakStateChange])

  const startTimer = () => {
    if (!isActive) {
      setShowBreathing(true)
      setTimeout(() => {
        setShowBreathing(false)
        setIsActive(true)
      }, 3000)
    } else {
      setIsActive(false)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(isBreak ? state.pomodoroSettings.shortBreak : state.pomodoroSettings.workDuration)
    setSeconds(0)
  }

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalTime = isBreak
    ? (sessionCount % state.pomodoroSettings.longBreakInterval === 0
        ? state.pomodoroSettings.longBreak
        : state.pomodoroSettings.shortBreak) * 60
    : state.pomodoroSettings.workDuration * 60
  const currentTime = minutes * 60 + seconds
  const progress = ((totalTime - currentTime) / totalTime) * 100

  if (showBreathing) {
    return <BreathingAnimation onComplete={() => setShowBreathing(false)} />
  }

  return (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
          {isBreak ? "🌸 Break Time" : "🎯 Focus Time"}
        </h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {showSettings && (
        <div className="mb-8 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Duration (min)
              </label>
              <input
                type="number"
                value={state.pomodoroSettings.workDuration}
                onChange={(e) => updatePomodoroSettings({ workDuration: Number.parseInt(e.target.value) || 25 })}
                className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break (min)
              </label>
              <input
                type="number"
                value={state.pomodoroSettings.shortBreak}
                onChange={(e) => updatePomodoroSettings({ shortBreak: Number.parseInt(e.target.value) || 5 })}
                className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                max="30"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={strictMode}
                onChange={(e) => setStrictMode(e.target.checked)}
                className="mr-2 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Strict Mode (no pause)</span>
            </label>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 animate-pulse"></div>

          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-white/20 dark:text-gray-700/20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isBreak ? "#10B981" : "#8B5CF6"} />
                <stop offset="50%" stopColor={isBreak ? "#34D399" : "#EC4899"} />
                <stop offset="100%" stopColor={isBreak ? "#6EE7B7" : "#3B82F6"} />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                {formatTime(minutes, seconds)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Session {sessionCount + 1}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={startTimer}
          disabled={strictMode && isActive}
          className={`flex items-center px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
            isActive
              ? strictMode
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white shadow-lg hover:shadow-xl"
              : "bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
          }`}
        >
          {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
          {isActive ? "Pause" : "Start Focus"}
        </button>

        <button
          onClick={resetTimer}
          className="flex items-center px-8 py-4 rounded-2xl font-medium bg-white/20 hover:bg-white/30 text-gray-700 dark:text-gray-300 transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>
    </div>
  )
}
