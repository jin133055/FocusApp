"use client"

import { useState } from "react"

type Player = "X" | "O" | null
type Board = Player[]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState(false)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  const checkWinner = (board: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setIsDraw(false)
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        {winner ? (
          <p className="text-xl font-bold text-green-600">Player {winner} wins! 🎉</p>
        ) : isDraw ? (
          <p className="text-xl font-bold text-yellow-600">It's a draw! 🤝</p>
        ) : (
          <p className="text-lg font-medium">Player {currentPlayer}'s turn</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-white border-2 border-gray-300 rounded-lg text-3xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center"
            disabled={!!cell || !!winner || isDraw}
          >
            {cell && <span className={cell === "X" ? "text-blue-500" : "text-red-500"}>{cell}</span>}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium"
      >
        New Game
      </button>
    </div>
  )
}
