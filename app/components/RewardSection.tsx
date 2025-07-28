"use client"

import { useState } from "react"
import { Gamepad2 } from "lucide-react"
import SnakeGame from "./games/SnakeGame"
import TicTacToe from "./games/TicTacToe"

interface RewardSectionProps {
  xp: number
}

type GameType = "snake" | "tictactoe" | null

export default function RewardSection({ xp }: RewardSectionProps) {
  const [activeGame, setActiveGame] = useState<GameType>(null)

  const snakeUnlocked = xp >= 100
  const ticTacToeUnlocked = xp >= 250

  const closeGame = () => setActiveGame(null)

  return (
    <div className="bg-gradient-to-br from-yellow-100/70 to-amber-100/70 dark:from-yellow-900/30 dark:to-amber-900/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-yellow-200/30 dark:border-yellow-700/20">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
          🎁 Rewards
        </h3>
      </div>

      <div className="space-y-3">
        {/* Snake Game */}
        <div
          className={`p-4 rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all ${
            snakeUnlocked
              ? "border-green-300 dark:border-green-600 bg-green-50/50 dark:bg-green-900/20"
              : "border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">🐍 Snake Game</h4>
              <p className="text-sm text-gray-600">{snakeUnlocked ? "Unlocked!" : `Need ${100 - xp} more XP`}</p>
            </div>
            <button
              onClick={() => setActiveGame("snake")}
              disabled={!snakeUnlocked}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                snakeUnlocked
                  ? "bg-green-400 hover:bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tic Tac Toe */}
        <div
          className={`p-4 rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all ${
            ticTacToeUnlocked ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">⭕ Tic Tac Toe</h4>
              <p className="text-sm text-gray-600">{ticTacToeUnlocked ? "Unlocked!" : `Need ${250 - xp} more XP`}</p>
            </div>
            <button
              onClick={() => setActiveGame("tictactoe")}
              disabled={!ticTacToeUnlocked}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                ticTacToeUnlocked
                  ? "bg-blue-400 hover:bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-4 p-3 bg-white/50 rounded-2xl text-center">
        <p className="text-sm text-gray-700">Keep earning XP to unlock more games! 🎮</p>
      </div>

      {/* Game Modals */}
      {activeGame === "snake" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">🐍 Snake Game</h3>
              <button onClick={closeGame} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>
            <SnakeGame />
          </div>
        </div>
      )}

      {activeGame === "tictactoe" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">⭕ Tic Tac Toe</h3>
              <button onClick={closeGame} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>
            <TicTacToe />
          </div>
        </div>
      )}
    </div>
  )
}
