# XOXO Club

A cute, minimal pastel Tic Tac Toe game built with React.

## Features

- **Two Game Modes:** Play locally against a friend (Player vs Player) or challenge the computer (Player vs Computer).
- **Unbeatable AI:** The computer opponent uses the minimax algorithm, ensuring it plays optimally and never loses.
- **Game State Detection:** Automatically detects wins and draws, highlighting the winning cells.
- **Scoreboard:** Keeps track of X wins, O/computer wins, and draws across multiple rounds.
- **Restart Functionality:** Easily reset the board or change game modes at any time.

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- ESLint

## Installation and Development

To run this project locally, ensure you have Node.js installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/AvniMalik03/xoxo-club.git
   ```
2. Navigate to the project directory:
   ```bash
   cd xoxo-club
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Play

1. Choose your game mode using the toggles on the left side: **2 Player** or **vs Computer**.
2. Click on any empty square on the 3x3 grid to place your mark. Player 1 is always 'X' and goes first.
3. In **2 Player** mode, take turns placing 'X' and 'O'. In **vs Computer** mode, the AI will automatically place its 'O' mark after your turn.
4. The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins. If all 9 squares are filled without a winner, the game is a draw.
5. Use the "New Game" button to clear the board and start another round.

## Repository

[GitHub Repository](https://github.com/AvniMalik03/xoxo-club)
