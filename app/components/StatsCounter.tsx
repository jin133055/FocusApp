"use client"

import { Trophy, Zap, CheckCircle, Clock } from "lucide-react"

interface StatsCounterProps {
  xp: number
  streak: number
  completedTasks: number
  completedPomodoros: number
}

export default function StatsCounter({ xp, streak, completedTasks, completedPomodoros }: StatsCounterProps) {
  const level = Math.floor(xp / 100) + 1
  const xpToNextLevel = 100 - (xp % 100)
  const progressPercentage = xp % 100

  return (
    <div className="bg-gradient-to-br from-green-100/70 to-emerald-100/70 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-green-200/30 dark:border-green-700/20">
      <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
        📊 Your Progress
      </h3>

      {/* Level and XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Level {level}</span>
          <span className="text-sm text-gray-600">{xp} XP</span>
        </div>
        <div className="w-full bg-green-200/50 dark:bg-green-800/30 rounded-full h-3 backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">{xpToNextLevel} XP to next level</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{streak}</span>
          </div>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{completedTasks}</span>
          </div>
          <p className="text-xs text-gray-600">Tasks Done</p>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-red-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{completedPomodoros}</span>
          </div>
          <p className="text-xs text-gray-600">Pomodoros</p>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-purple-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{level}</span>
          </div>
          <p className="text-xs text-gray-600">Level</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-white/30 rounded-2xl text-center">
        <p className="text-sm text-gray-700">
          {xp < 50 && "Just getting started! 🌱"}
          {xp >= 50 && xp < 200 && "You're on fire! 🔥"}
          {xp >= 200 && xp < 500 && "Productivity master! ⭐"}
          {xp >= 500 && "Legendary focus! 🏆"}
        </p>
      </div>
    </div>
  )
}
