"use client"

import { Heart, Smile } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import { useState } from "react"

const moods = [
  { emoji: "😄", label: "Great", value: "great" },
  { emoji: "😊", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😔", label: "Low", value: "low" },
  { emoji: "😞", label: "Tough", value: "tough" },
]

export default function MoodTracker() {
  const { state, updateMood, updateGratitude } = useApp()
  const [showGratitude, setShowGratitude] = useState(false)
  const [gratitudeText, setGratitudeText] = useState(state.gratitudeEntry)

  const handleMoodSelect = (type: "morning" | "evening", mood: string) => {
    updateMood(type, mood)
  }

  const handleGratitudeSave = () => {
    updateGratitude(gratitudeText)
    setShowGratitude(false)
  }

  const today = new Date().toDateString()
  const isToday = state.dailyMood.date === today

  return (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 dark:from-pink-400 dark:to-red-400 bg-clip-text text-transparent">
          Mindfulness Check
        </h2>
      </div>

      {/* Morning Mood */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">How are you feeling today? 🌅</h3>
        <div className="flex space-x-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect("morning", mood.value)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isToday && state.dailyMood.morning === mood.value
                  ? "bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-300 dark:border-pink-600 scale-110"
                  : "bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 border border-white/20 dark:border-gray-700/20"
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gratitude Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Gratitude 🙏</h3>
          <button
            onClick={() => setShowGratitude(!showGratitude)}
            className="text-xs text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
          >
            {showGratitude ? "Cancel" : "Add Entry"}
          </button>
        </div>

        {showGratitude ? (
          <div className="space-y-3">
            <textarea
              value={gratitudeText}
              onChange={(e) => setGratitudeText(e.target.value)}
              placeholder="What are you grateful for today?"
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200 resize-none"
              rows={3}
            />
            <button
              onClick={handleGratitudeSave}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-xl transition-all duration-300"
            >
              Save Gratitude
            </button>
          </div>
        ) : state.gratitudeEntry ? (
          <div className="p-4 bg-gradient-to-r from-pink-50/50 to-red-50/50 dark:from-pink-900/20 dark:to-red-900/20 rounded-2xl border border-pink-200/30 dark:border-pink-700/30">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{state.gratitudeEntry}"</p>
          </div>
        ) : (
          <div className="p-4 bg-gray-50/30 dark:bg-gray-800/30 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">No gratitude entry yet today</p>
          </div>
        )}
      </div>

      {/* Mindfulness Tip */}
      <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/30 dark:border-blue-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <Smile className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Mindfulness Tip</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Take three deep breaths before starting your next focus session. Present moment awareness enhances
          concentration.
        </p>
      </div>
    </div>
  )
}
