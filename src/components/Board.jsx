import Square from './Square';

export default function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={winningLine?.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      {squares.map((_, i) => renderSquare(i))}
    </div>
  );
}
