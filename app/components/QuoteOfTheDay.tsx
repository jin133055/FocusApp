"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Quote } from "lucide-react"

const motivationalQuotes = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown",
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
]

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(motivationalQuotes[0])
  const [isLoading, setIsLoading] = useState(false)

  const getQuoteOfTheDay = () => {
    const today = new Date().toDateString()
    const savedQuote = localStorage.getItem("quote-of-the-day")
    const savedDate = localStorage.getItem("quote-date")

    if (savedQuote && savedDate === today) {
      try {
        setQuote(JSON.parse(savedQuote))
      } catch (error) {
        // If parsing fails, generate a new quote
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
        setQuote(randomQuote)
        localStorage.setItem("quote-of-the-day", JSON.stringify(randomQuote))
        localStorage.setItem("quote-date", today)
      }
    } else {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      setQuote(randomQuote)
      localStorage.setItem("quote-of-the-day", JSON.stringify(randomQuote))
      localStorage.setItem("quote-date", today)
    }
  }

  const refreshQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      setQuote(randomQuote)
      localStorage.setItem("quote-of-the-day", JSON.stringify(randomQuote))
      localStorage.setItem("quote-date", new Date().toDateString())
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    getQuoteOfTheDay()
  }, [])

  return (
    <div className="bg-gradient-to-br from-amber-100/70 to-orange-100/70 dark:from-amber-900/30 dark:to-orange-900/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-amber-200/30 dark:border-amber-700/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Quote className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Daily Inspiration
          </h3>
        </div>
        <button
          onClick={refreshQuote}
          disabled={isLoading}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-amber-600 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="relative">
        <div className="text-6xl text-amber-300/50 absolute -top-4 -left-2">"</div>
        <blockquote className="text-gray-700 dark:text-gray-300 italic pl-8 pr-4 leading-relaxed font-medium text-lg mb-4">
          {quote.text}
        </blockquote>
        <div className="text-6xl text-amber-300/50 absolute -bottom-8 right-0">"</div>
      </div>

      <div className="text-right">
        <cite className="text-amber-700 dark:text-amber-300 font-medium">— {quote.author}</cite>
      </div>
    </div>
  )
}
