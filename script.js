document.addEventListener("DOMContentLoaded", () => {
  // Welcome message
  addBotMessage("Hello! I'm your friendly chatbot. How can I assist you today?");

  // Event listeners for game buttons
  document.getElementById("tic-tac-toe-btn").addEventListener("click", openTicTacToe);
  document.getElementById("rock-paper-scissors-btn").addEventListener("click", openRPS);

  // Event listener for send button
  document.getElementById("send-btn").addEventListener("click", sendMessage);

  // Event listener for Enter key
  document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Modal close buttons
  document.getElementById("close-ttt").addEventListener("click", closeTicTacToe);
  document.getElementById("close-rps").addEventListener("click", closeRPS);
});

// Function to send user message
function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput === "") return;

  addUserMessage(userInput);
  document.getElementById("user-input").value = "";

  // Simple bot response logic
  const botResponse = getBotResponse(userInput);
  addBotMessage(botResponse);
}

// Function to add user message to chat
function addUserMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "user-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add bot message to chat
function addBotMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "bot-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple bot response generator
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hi there! How can I help you today?";
  } else if (lowerInput.includes("play")) {
    return "Sure, which game would you like to play?";
  } else {
    return "I'm here to help! You can ask me anything or play a game.";
  }
}

/* Tic-Tac-Toe Game Functions */
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function openTicTacToe() {
  document.getElementById("tic-tac-toe-modal").style.display = "block";
  initializeTicTacToe();
}

function closeTicTacToe() {
  document.getElementById("tic-tac-toe-modal").style.display = "none";
}

function initializeTicTacToe() {
  tttBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  const gameContainer = document.getElementById("tic-tac-toe-game");
  gameContainer.innerHTML = "";
  tttBoard.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("ttt-cell");
    cellDiv.dataset.index = index;
    cellDiv.addEventListener("click", handleTTTClick);
    gameContainer.appendChild(cellDiv);
  });
}

function handleTTTClick(e) {
  const index = e.target.dataset.index;
  if (tttBoard[index] !== "" || !gameActive) return;

  tttBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkTTTWin()) {
    addBotMessage(`Player ${currentPlayer} wins the Tic-Tac-Toe game!`);
    gameActive = false;
    return;
  }

  if (!tttBoard.includes("")) {
    addBotMessage("Tic-Tac-Toe is a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check Tic-Tac-Toe win conditions
function checkTTTWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c];
  });
}

/* Rock Paper Scissors Game Functions */
const rpsChoices = ["Rock", "Paper", "Scissors"];

function openRPS() {
  document.getElementById("rps-modal").style.display = "block";
  initializeRPS();
}

function closeRPS() {
  document.getElementById("rps-modal").style.display = "none";
}

function initializeRPS() {
  const rpsGame = document.getElementById("rps-game");
  rpsGame.innerHTML = "<h3>Choose your move:</h3>";

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("rps-options");

  rpsChoices.forEach(choice => {
    const option = document.createElement("div");
    option.classList.add("rps-option");
    option.textContent = choice;
    option.addEventListener("click", () => playRPS(choice));
    optionsDiv.appendChild(option);
  });

  rpsGame.appendChild(optionsDiv);

  const resultDiv = document.createElement("div");
  resultDiv.id = "rps-result";
  rpsGame.appendChild(resultDiv);
}

function playRPS(playerChoice) {
  const botChoice = rpsChoices[Math.floor(Math.random() * 3)];
  let result = "";

  if (playerChoice === botChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === "Rock" && botChoice === "Scissors") ||
    (playerChoice === "Paper" && botChoice === "Rock") ||
    (playerChoice === "Scissors" && botChoice === "Paper")
  ) {
    result = "You win!";
  } else {
    result = "Bot wins!";
  }

  document.getElementById("rps-result").textContent = `You chose ${playerChoice}. Bot chose ${botChoice}. ${result}`;
  addBotMessage(`Rock Paper Scissors Result: You chose ${playerChoice}, bot chose ${botChoice}. ${result}`);
}
