"use client"

import { useState } from "react"
import { Plus, Clock, Trash2, Check, Brain } from "lucide-react"
import { useApp } from "../contexts/AppContext"
import SpacedRepetitionQuiz from "./SpacedRepetitionQuiz"

export default function TaskManager() {
  const { state, addTask, completeTask, deleteTask } = useApp()
  const [showAddTask, setShowAddTask] = useState(false)
  const [showQuiz, setShowQuiz] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    estimatedTime: 25,
    difficulty: "medium" as "easy" | "medium" | "hard",
  })

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask)
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        estimatedTime: 25,
        difficulty: "medium",
      })
      setShowAddTask(false)
    }
  }

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId)
    setShowQuiz(taskId)
  }

  const getAIPrioritizedTasks = () => {
    const incompleteTasks = state.tasks.filter((task) => !task.completed)

    // AI-like prioritization algorithm
    return incompleteTasks.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 }
      const difficultyWeight = { hard: 3, medium: 2, easy: 1 }

      const scoreA =
        priorityWeight[a.priority] * 0.4 +
        (4 - difficultyWeight[a.difficulty]) * 0.3 +
        ((60 - a.estimatedTime) / 60) * 0.3

      const scoreB =
        priorityWeight[b.priority] * 0.4 +
        (4 - difficultyWeight[b.difficulty]) * 0.3 +
        ((60 - b.estimatedTime) / 60) * 0.3

      return scoreB - scoreA
    })
  }

  const prioritizedTasks = getAIPrioritizedTasks()
  const completedTasks = state.tasks.filter((task) => task.completed)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "🟢"
      case "medium":
        return "🟡"
      case "hard":
        return "🔴"
      default:
        return "⚪"
    }
  }

  return (
    <>
      <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              AI Task Queue
            </h2>
          </div>
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>

        {showAddTask && (
          <div className="mb-6 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
              />

              <textarea
                placeholder="Description (optional)..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 resize-none"
                rows={2}
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time (min)</label>
                  <input
                    type="number"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: Number.parseInt(e.target.value) || 25 })}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="5"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={newTask.difficulty}
                    onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddTask}
                  className="flex-1 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestion */}
        {prioritizedTasks.length > 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200/30 dark:border-purple-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Recommendation</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Start with "{prioritizedTasks[0].title}" - optimal balance of priority, difficulty, and time.
            </p>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {prioritizedTasks.length === 0 && completedTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tasks yet. Add your first task to get AI-powered recommendations!</p>
            </div>
          ) : (
            <>
              {prioritizedTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-4 p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <span className="text-sm font-bold text-purple-500 bg-purple-100 dark:bg-purple-900/30 rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimatedTime}m
                      </span>
                      <span className="text-xs">{getDifficultyIcon(task.difficulty)}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {completedTasks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Completed ({completedTasks.length})
                  </h3>
                  {completedTasks.slice(-3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-4 p-3 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-200/30 dark:border-green-700/30 mb-2"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 line-through">{task.title}</span>
                      <span className="text-xs text-green-600 dark:text-green-400 ml-auto">
                        ✨ +{task.difficulty === "easy" ? 10 : task.difficulty === "medium" ? 20 : 30} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showQuiz && <SpacedRepetitionQuiz taskId={showQuiz} onClose={() => setShowQuiz(null)} />}
    </>
  )
}
