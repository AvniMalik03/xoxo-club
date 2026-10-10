export default function Square({ value, onClick, isWinningSquare }) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'winning' : ''} ${value ? value.toLowerCase() : ''}`} 
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}
