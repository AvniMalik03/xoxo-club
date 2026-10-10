import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import { calculateWinner, isBoardFull, getBestMove } from './utils/ai';
import './App.css';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState('PvC'); // 'PvC' or 'PvP'
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const winInfo = calculateWinner(squares);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line;
  const isDraw = !winner && isBoardFull(squares);

  const handleClick = useCallback((i) => {
    if (squares[i] || winner) return;

    // In PvC mode, prevent user from clicking during computer's turn
    if (mode === 'PvC' && !isXNext) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);

    const winInfoNext = calculateWinner(nextSquares);
    const isDrawNext = !winInfoNext && isBoardFull(nextSquares);
    if (winInfoNext) {
      setScores(prev => ({ ...prev, [winInfoNext.winner]: prev[winInfoNext.winner] + 1 }));
    } else if (isDrawNext) {
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  }, [squares, winner, mode, isXNext]);

  // AI turn
  useEffect(() => {
    if (mode === 'PvC' && !isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(squares, 'O');
        if (bestMove !== -1) {
          const nextSquares = squares.slice();
          nextSquares[bestMove] = 'O';
          setSquares(nextSquares);
          setIsXNext(true);

          const winInfoNext = calculateWinner(nextSquares);
          const isDrawNext = !winInfoNext && isBoardFull(nextSquares);
          if (winInfoNext) {
            setScores(prev => ({ ...prev, [winInfoNext.winner]: prev[winInfoNext.winner] + 1 }));
          } else if (isDrawNext) {
            setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
          }
        }
      }, 500); // slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [mode, isXNext, winner, isDraw, squares]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    resetGame();
    setScores({ X: 0, O: 0, Draws: 0 });
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>XOXO Club</h1>
      </header>

      <div className="game-layout">
        <div className="controls-card card">
          <h2>Game Mode</h2>
          <div className="mode-buttons">
            <button 
              className={`mode-btn ${mode === 'PvP' ? 'active' : ''}`}
              onClick={() => changeMode('PvP')}
            >
              2 Player
            </button>
            <button 
              className={`mode-btn ${mode === 'PvC' ? 'active' : ''}`}
              onClick={() => changeMode('PvC')}
            >
              vs Computer
            </button>
          </div>
          
          <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div className="score-row">
              <span className="x-score">X (Player 1)</span>
              <span>{scores.X}</span>
            </div>
            <div className="score-row">
              <span className="o-score">O ({mode === 'PvC' ? 'Computer' : 'Player 2'})</span>
              <span>{scores.O}</span>
            </div>
            <div className="score-row">
              <span className="draw-score">Draws</span>
              <span>{scores.Draws}</span>
            </div>
          </div>
        </div>

        <div className="board-card card">
          <div className="status">{status}</div>
          <Board 
            squares={squares} 
            onClick={handleClick} 
            winningLine={winningLine}
          />
          <button className="reset-btn" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
