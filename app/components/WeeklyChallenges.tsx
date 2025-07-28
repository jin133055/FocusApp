"use client"

import { Target, Award, Users } from "lucide-react"
import { useApp } from "../contexts/AppContext"

export default function WeeklyChallenges() {
  const { state } = useApp()

  const leaderboardData = [
    { name: "You", score: state.weeklyChallenge.current, isUser: true },
    { name: "Alex", score: 8 },
    { name: "Sarah", score: 7 },
    { name: "Mike", score: 6 },
    { name: "Emma", score: 5 },
  ].sort((a, b) => b.score - a.score)

  const userRank = leaderboardData.findIndex((user) => user.isUser) + 1

  return (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
          Weekly Challenge
        </h2>
      </div>

      {/* Current Challenge */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200/30 dark:border-green-700/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{state.weeklyChallenge.title}</h3>
          {state.weeklyChallenge.completed && <Award className="w-5 h-5 text-yellow-500" />}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{state.weeklyChallenge.description}</p>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>
              {state.weeklyChallenge.current} / {state.weeklyChallenge.target}
            </span>
            <span>{Math.round((state.weeklyChallenge.current / state.weeklyChallenge.target) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((state.weeklyChallenge.current / state.weeklyChallenge.target) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            🏆 Reward: +{state.weeklyChallenge.xpReward} XP
          </span>
        </div>
      </div>

      {/* Mini Leaderboard */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Community Leaderboard</h3>
        </div>

        <div className="space-y-2">
          {leaderboardData.slice(0, 5).map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                user.isUser
                  ? "bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/30 dark:border-purple-700/30"
                  : "bg-white/10 dark:bg-gray-800/10"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0
                      ? "bg-yellow-400 text-yellow-900"
                      : index === 1
                        ? "bg-gray-300 text-gray-700"
                        : index === 2
                          ? "bg-amber-600 text-white"
                          : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`font-medium ${
                    user.isUser ? "text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {user.name}
                  {user.isUser && " (You)"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.score}</span>
                <Target className="w-4 h-4 text-green-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center p-3 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">You're ranked #{userRank} this week! 🎯</p>
        </div>
      </div>
    </div>
  )
}
