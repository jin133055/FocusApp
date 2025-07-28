"use client"

import { Book, Lock, CheckCircle } from "lucide-react"
import { useApp } from "../contexts/AppContext"

export default function StoryQuest() {
  const { state, unlockChapter } = useApp()

  const handleChapterClick = (chapter: any) => {
    if (chapter.unlocked) {
      unlockChapter(chapter.id)
    }
  }

  return (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <Book className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          The Focus Realm Chronicles
        </h2>
      </div>

      <div className="space-y-4">
        {state.storyChapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
              chapter.unlocked
                ? "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200/30 dark:border-indigo-700/30 hover:from-indigo-100/50 hover:to-purple-100/50"
                : "bg-gray-50/30 dark:bg-gray-800/30 border-gray-200/30 dark:border-gray-700/30 opacity-60"
            }`}
            onClick={() => handleChapterClick(chapter)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {chapter.unlocked ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`font-medium ${
                      chapter.unlocked ? "text-gray-800 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    Chapter {chapter.id}: {chapter.title}
                  </h3>
                  {!chapter.unlocked && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200/50 dark:bg-gray-700/50 px-2 py-1 rounded-full">
                      {chapter.xpRequired} XP
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    chapter.unlocked ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {chapter.unlocked ? chapter.content : "Complete more tasks to unlock this chapter..."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200/30 dark:border-indigo-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <Book className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Current Progress</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Chapter {state.currentChapter} of {state.storyChapters.length} •
          {state.storyChapters.filter((c) => c.unlocked).length} chapters unlocked
        </p>
      </div>
    </div>
  )
}
