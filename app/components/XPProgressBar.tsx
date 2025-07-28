"use client"

import { Trophy, Star, Zap } from "lucide-react"
import { useApp } from "../contexts/AppContext"

export default function XPProgressBar() {
  const { state } = useApp()

  const currentLevelXP = state.xp % 100
  const nextLevelXP = 100
  const progressPercentage = (currentLevelXP / nextLevelXP) * 100

  const getUnlockMessage = () => {
    const nextUnlock = state.storyChapters.find((chapter) => !chapter.unlocked)
    if (nextUnlock) {
      const xpNeeded = nextUnlock.xpRequired - state.xp
      return `${xpNeeded} XP until "${nextUnlock.title}" unlocks!`
    }
    return "All chapters unlocked! 🎉"
  }

  return (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            Level {state.level}
          </h2>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>{state.streak} streak</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-purple-500" />
            <span>{state.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>
            {currentLevelXP} / {nextLevelXP} XP
          </span>
          <span>Level {state.level + 1}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 h-3 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/10 dark:bg-gray-800/10 rounded-2xl">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{state.totalTasks}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Tasks</div>
        </div>
        <div className="text-center p-3 bg-white/10 dark:bg-gray-800/10 rounded-2xl">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{state.totalPomodoros}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pomodoros</div>
        </div>
        <div className="text-center p-3 bg-white/10 dark:bg-gray-800/10 rounded-2xl">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{state.level}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Level</div>
        </div>
      </div>

      <div className="text-center p-3 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl">
        <p className="text-sm text-gray-700 dark:text-gray-300">{getUnlockMessage()}</p>
      </div>
    </div>
  )
}
