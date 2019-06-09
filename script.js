// Factory function
const createPlayer = (name, marker, points = 0, score = 0) => {
  return {
    name,
    marker,
    points,
    addScore: () => {
      return ++score;
    }
  };
};

const playerX = createPlayer("Player X", "X");
const playerO = createPlayer("Player O", "O");
const playerXHeading = document.getElementById("playerX");
const playerOHeading = document.getElementById("playerO");

// Module pattern to play game
const playGame = (function() {
  let currentPlayer = playerX;
  // Winning values using bitwise operation
  let winValues = [7, 56, 73, 84, 146, 273, 292, 448]
  let gameOver = false;

  return {
    getCurrentPlayer: () => {
      return currentPlayer;
    },
    setCurrentPlayer: (player) => {
      currentPlayer = player;
      return currentPlayer;
    },
    getGameOver: () => {
      return gameOver;
    },
    setGameOver: (value) => {
      gameOver = value;
      return gameOver;
    },
    togglePlayer: () => {
      if (currentPlayer === playerX) {
        currentPlayer = playerO;
      } else {
        currentPlayer = playerX;
      }
    },
    countPoint: (point) => {
      currentPlayer.points += point;
    },
    checkWinner: () => {
      for (let i = 0; i < winValues.length; i++) {
        if ((winValues[i] & currentPlayer.points) === winValues[i]) {
          gameOver = true;
          displayGame.displayWinner().textContent = currentPlayer.name + " wins!";
          displayGame.displayScore().textContent = currentPlayer.addScore();
        }
      }
    
      if ((playerX.points + playerO.points === 511) && gameOver === false) {
        gameOver = true;
        displayGame.displayWinner().textContent = "The match is a draw.";
      }
    }
  };
})();

// Module pattern to display game elements
const displayGame = (function() {
  return {
    setMarker: (clickedBox, clickedPoint) => {
      if (playGame.getGameOver() === false) {
        if (clickedBox.textContent === "") {
          playGame.countPoint(clickedPoint);
          clickedBox.textContent = playGame.getCurrentPlayer().marker;
          playGame.checkWinner();
          if (playGame.getGameOver() === false) {
            playGame.togglePlayer();
            displayGame.displayWhoseTurn();
          }
        }  
      }
    },
    displayWhoseTurn: () => {
      playerXHeading.classList.toggle("turn");
      playerOHeading.classList.toggle("turn");
    },
    displayWinner: () => {
      let messageBoard = document.getElementById("messageBoard");
      return messageBoard;
    }, 
    displayScore: () => {
      let playerXScore = document.getElementById("playerXScoreboard");
      let playerOScore = document.getElementById("playerOScoreboard");
      if (playGame.getCurrentPlayer() === playerX) {
        return playerXScore;
      } else {
        return playerOScore;
      }
    }
  };
})();

// This function is called onclick in HTML
function takeTurn (clickedTableData, number) {
  displayGame.setMarker(clickedTableData, number);
}

// This function is called onclick in HTML
function rematch() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.textContent = "";
  });
  displayGame.displayWinner().textContent = "Let's play Tic Tac Toe";
  playGame.setGameOver(false);
  playGame.setCurrentPlayer(playerX);
  playerXHeading.classList.add("turn");
  playerOHeading.classList.remove("turn");
  playerX.points = 0;
  playerO.points = 0;
}


