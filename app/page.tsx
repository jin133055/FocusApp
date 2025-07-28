"use client"

import { useState, useEffect } from "react"
import { AppProvider, useApp } from "./contexts/AppContext"
import ThemeToggle from "./components/ThemeToggle"
import PetCompanion from "./components/PetCompanion"
import PomodoroTimer from "./components/PomodoroTimer"
import TaskManager from "./components/TaskManager"
import XPProgressBar from "./components/XPProgressBar"
import StoryQuest from "./components/StoryQuest"
import MoodTracker from "./components/MoodTracker"
import QuoteOfTheDay from "./components/QuoteOfTheDay"
import WeeklyChallenges from "./components/WeeklyChallenges"

function DashboardContent() {
  const { state } = useApp()
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [isBreakTime, setIsBreakTime] = useState(false)

  // Apply theme to document
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [state.theme])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjA1Ij4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-40"></div>

      <ThemeToggle />
      <PetCompanion isTimerActive={isTimerActive} isBreakTime={isBreakTime} level={state.level} streak={state.streak} />

      <div className="relative z-10 p-4 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center justify-center p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-3xl mb-6 border border-white/30 dark:border-gray-700/30">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                ✨ Focus Realm
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">Your magical productivity sanctuary</p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span>🔥 {state.streak} day streak</span>
              <span>⭐ Level {state.level}</span>
              <span>🏆 {state.xp} XP</span>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Column - Timer & Tasks */}
            <div className="xl:col-span-8 space-y-8">
              {/* Pomodoro Timer */}
              <PomodoroTimer onTimerStateChange={setIsTimerActive} onBreakStateChange={setIsBreakTime} />

              {/* Task Manager */}
              <TaskManager />
            </div>

            {/* Right Column - Progress & Story */}
            <div className="xl:col-span-4 space-y-8">
              {/* XP Progress */}
              <XPProgressBar />

              {/* Story Quest */}
              <StoryQuest />

              {/* Weekly Challenges */}
              <WeeklyChallenges />
            </div>
          </div>

          {/* Bottom Row - Wellness & Inspiration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Mood Tracker */}
            <MoodTracker />

            {/* Quote of the Day */}
            <QuoteOfTheDay />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  )
}
