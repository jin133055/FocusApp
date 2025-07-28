"use client"

import { useState } from "react"
import { X, Brain, CheckCircle } from "lucide-react"
import { useApp } from "../contexts/AppContext"

interface SpacedRepetitionQuizProps {
  taskId: string
  onClose: () => void
}

export default function SpacedRepetitionQuiz({ taskId, onClose }: SpacedRepetitionQuizProps) {
  const { state, updateXP } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const task = state.tasks.find((t) => t.id === taskId)

  // Generate quiz questions based on task
  const questions = [
    {
      question: `What was the main objective of "${task?.title}"?`,
      options: [
        "To complete a routine task",
        "To learn something new",
        "To solve a specific problem",
        "To practice a skill",
      ],
      correct: 2,
    },
    {
      question: "What key insight or learning did you gain?",
      options: [
        "A new technique or method",
        "Better understanding of the topic",
        "Improved problem-solving approach",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question: "How would you apply this knowledge in the future?",
      options: [
        "Use it in similar tasks",
        "Teach it to others",
        "Build upon it for advanced topics",
        "All of the above",
      ],
      correct: 3,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex.toString()]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      // Award bonus XP for completing quiz
      updateXP(15)
    }
  }

  const getScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correct) {
        correct++
      }
    })
    return correct
  }

  if (showResults) {
    const score = getScore()
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Knowledge Reinforced! 🧠</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You scored {score}/{questions.length} on the retention quiz
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Bonus XP Earned:</strong> +15 XP for completing the spaced repetition quiz!
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Knowledge Check</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-6">
            {questions[currentQuestion].question}
          </h4>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-2xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
              >
                <span className="text-gray-800 dark:text-gray-200">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Spaced repetition helps strengthen memory retention 🧠✨
          </p>
        </div>
      </div>
    </div>
  )
}
