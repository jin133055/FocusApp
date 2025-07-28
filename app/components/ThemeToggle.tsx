"use client"

import { Sun, Moon } from "lucide-react"
import { useApp } from "../contexts/AppContext"

export default function ThemeToggle() {
  const { state, toggleTheme } = useApp()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {state.theme === "light" ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  )
}
