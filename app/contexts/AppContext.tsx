"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  estimatedTime: number // in minutes
  difficulty: "easy" | "medium" | "hard"
  completed: boolean
  completedAt?: Date
  pomodoroBlocks?: number
}

interface StoryChapter {
  id: number
  title: string
  content: string
  unlocked: boolean
  xpRequired: number
}

interface Challenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  xpReward: number
  completed: boolean
}

interface AppState {
  // User Progress
  xp: number
  level: number
  streak: number
  totalPomodoros: number
  totalTasks: number

  // Tasks
  tasks: Task[]

  // Story
  storyChapters: StoryChapter[]
  currentChapter: number

  // Challenges
  weeklyChallenge: Challenge

  // Settings
  theme: "light" | "dark"
  pomodoroSettings: {
    workDuration: number
    shortBreak: number
    longBreak: number
    longBreakInterval: number
  }

  // Pet
  petSkin: string
  unlockedSkins: string[]

  // Mood tracking
  dailyMood: {
    morning?: string
    evening?: string
    date: string
  }
  gratitudeEntry: string
}

interface AppContextType {
  state: AppState
  updateXP: (amount: number) => void
  addTask: (task: Omit<Task, "id" | "completed">) => void
  completeTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
  toggleTheme: () => void
  updatePomodoroSettings: (settings: Partial<AppState["pomodoroSettings"]>) => void
  unlockChapter: (chapterId: number) => void
  updateMood: (type: "morning" | "evening", mood: string) => void
  updateGratitude: (entry: string) => void
  completePomodoro: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialStoryChapters: StoryChapter[] = [
  {
    id: 1,
    title: "The Awakening",
    content:
      "In the mystical Focus Realm, ancient knowledge lies scattered. Your journey begins as a Guardian of Concentration, tasked with restoring balance to this magical land.",
    unlocked: true,
    xpRequired: 0,
  },
  {
    id: 2,
    title: "The First Crystal",
    content:
      "You discover the Crystal of Clarity, pulsing with gentle light. Each completed task strengthens its glow, revealing hidden pathways through the realm.",
    unlocked: false,
    xpRequired: 100,
  },
  {
    id: 3,
    title: "The Time Keeper's Gift",
    content:
      "The ancient Time Keeper appears, gifting you the Sacred Hourglass. With it, you can bend time itself, making each moment of focus more powerful.",
    unlocked: false,
    xpRequired: 250,
  },
  {
    id: 4,
    title: "The Pet Companion",
    content:
      "A mystical creature emerges from the Realm's heart - your eternal companion. Together, you'll face greater challenges and unlock deeper mysteries.",
    unlocked: false,
    xpRequired: 500,
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    xp: 0,
    level: 1,
    streak: 0,
    totalPomodoros: 0,
    totalTasks: 0,
    tasks: [],
    storyChapters: initialStoryChapters,
    currentChapter: 1,
    weeklyChallenge: {
      id: "week1",
      title: "Focus Master",
      description: "Complete 10 Pomodoro sessions this week",
      target: 10,
      current: 0,
      xpReward: 100,
      completed: false,
    },
    theme: "light",
    pomodoroSettings: {
      workDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 4,
    },
    petSkin: "default",
    unlockedSkins: ["default"],
    dailyMood: {
      date: new Date().toDateString(),
    },
    gratitudeEntry: "",
  })

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("focus-realm-data")
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        setState((prev) => ({ ...prev, ...parsedData }))
      } catch (error) {
        console.error("Failed to load saved data:", error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("focus-realm-data", JSON.stringify(state))
  }, [state])

  const updateXP = (amount: number) => {
    setState((prev) => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1

      // Check for story unlocks
      const newChapters = prev.storyChapters.map((chapter) => ({
        ...chapter,
        unlocked: chapter.unlocked || newXP >= chapter.xpRequired,
      }))

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        storyChapters: newChapters,
      }
    })
  }

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...task, id: Date.now().toString(), completed: false }],
    }))
  }

  const completeTask = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true, completedAt: new Date() } : task,
      ),
      totalTasks: prev.totalTasks + 1,
    }))

    // Award XP based on difficulty
    const task = state.tasks.find((t) => t.id === taskId)
    if (task) {
      const xpReward = task.difficulty === "easy" ? 10 : task.difficulty === "medium" ? 20 : 30
      updateXP(xpReward)
    }
  }

  const deleteTask = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }))
  }

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }))
  }

  const updatePomodoroSettings = (settings: Partial<AppState["pomodoroSettings"]>) => {
    setState((prev) => ({
      ...prev,
      pomodoroSettings: { ...prev.pomodoroSettings, ...settings },
    }))
  }

  const unlockChapter = (chapterId: number) => {
    setState((prev) => ({
      ...prev,
      currentChapter: Math.max(prev.currentChapter, chapterId),
    }))
  }

  const updateMood = (type: "morning" | "evening", mood: string) => {
    setState((prev) => ({
      ...prev,
      dailyMood: {
        ...prev.dailyMood,
        [type]: mood,
        date: new Date().toDateString(),
      },
    }))
  }

  const updateGratitude = (entry: string) => {
    setState((prev) => ({
      ...prev,
      gratitudeEntry: entry,
    }))
  }

  const completePomodoro = () => {
    setState((prev) => {
      const newTotalPomodoros = prev.totalPomodoros + 1
      const newWeeklyChallenge = {
        ...prev.weeklyChallenge,
        current: Math.min(prev.weeklyChallenge.current + 1, prev.weeklyChallenge.target),
        completed: prev.weeklyChallenge.current + 1 >= prev.weeklyChallenge.target,
      }

      return {
        ...prev,
        totalPomodoros: newTotalPomodoros,
        weeklyChallenge: newWeeklyChallenge,
        streak: prev.streak + 1,
      }
    })

    updateXP(25) // XP for completing pomodoro
  }

  return (
    <AppContext.Provider
      value={{
        state,
        updateXP,
        addTask,
        completeTask,
        deleteTask,
        toggleTheme,
        updatePomodoroSettings,
        unlockChapter,
        updateMood,
        updateGratitude,
        completePomodoro,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
