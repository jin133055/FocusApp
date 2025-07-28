"use client"

import { useState, useEffect, useCallback } from "react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const BOARD_SIZE = 15
const INITIAL_SNAKE = [{ x: 7, y: 7 }]
const INITIAL_FOOD = { x: 10, y: 10 }

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      }
    } while (snakeBody.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection("RIGHT")
    setGameOver(false)
    setScore(0)
    setIsPlaying(false)
  }

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPlaying, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          setDirection((prev) => (prev !== "DOWN" ? "UP" : prev))
          break
        case "ArrowDown":
          e.preventDefault()
          setDirection((prev) => (prev !== "UP" ? "DOWN" : prev))
          break
        case "ArrowLeft":
          e.preventDefault()
          setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev))
          break
        case "ArrowRight":
          e.preventDefault()
          setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev))
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) {
      const gameInterval = setInterval(moveSnake, 200)
      return () => clearInterval(gameInterval)
    }
  }, [moveSnake, isPlaying])

  return (
    <div className="text-center">
      <div className="mb-4">
        <p className="text-lg font-bold">Score: {score}</p>
      </div>

      <div className="inline-block border-2 border-gray-300 rounded-lg p-2 bg-green-50">
        <div className="grid grid-cols-15 gap-0" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
            const x = index % BOARD_SIZE
            const y = Math.floor(index / BOARD_SIZE)
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
            const isFood = food.x === x && food.y === y
            const isHead = snake[0]?.x === x && snake[0]?.y === y

            return (
              <div
                key={index}
                className={`w-4 h-4 border border-green-100 ${
                  isSnake ? (isHead ? "bg-green-600" : "bg-green-400") : isFood ? "bg-red-400" : "bg-green-50"
                }`}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {!isPlaying && !gameOver && (
          <button
            onClick={() => setIsPlaying(true)}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium"
          >
            Start Game
          </button>
        )}

        {gameOver && (
          <div>
            <p className="text-red-600 font-medium mb-2">Game Over!</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium"
            >
              Play Again
            </button>
          </div>
        )}

        {isPlaying && <p className="text-sm text-gray-600">Use arrow keys to control the snake</p>}
      </div>
    </div>
  )
}
