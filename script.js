document.addEventListener("DOMContentLoaded", () => {
  // Welcome message with animation
  addBotMessage("Hello! I'm your friendly chatbot. How can I assist you today?", true);

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

  // Handle riddle answers
  if (activeRiddle && userInput.toLowerCase() === "answer") {
    addBotMessage(activeRiddle.answer, true);
    activeRiddle = null;
    return;
  }

  // Simple bot response logic
  const botResponse = getBotResponse(userInput);
  addBotMessage(botResponse, true);
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

// Function to add bot message to chat with optional animation
function addBotMessage(message, animated = false) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "bot-message");

  if (animated) {
    let i = 0;
    const interval = setInterval(() => {
      msgDiv.textContent += message.charAt(i);
      i++;
      if (i === message.length) clearInterval(interval);
    }, 50);
  } else {
    msgDiv.textContent = message;
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple bot response generator
let activeRiddle = null;
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hi there! How can I help you today?";
  } else if (lowerInput.includes("bye")) {
    return "Goodbye! Have a great day!";
  } else if (lowerInput.includes("weather")) {
    return "Currently, I can't fetch live weather data, but it's always good to check a weather app!";
  } else if (lowerInput.includes("time")) {
    const now = new Date();
    return `The current time is ${now.toLocaleTimeString()}.`;
  } else if (lowerInput.includes("joke")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why was the math book sad? It had too many problems.",
      "Why don't skeletons fight each other? They don't have the guts."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  } else if (lowerInput.includes("riddle")) {
    const riddles = [
      { question: "What has to be broken before you can use it?", answer: "An egg." },
      { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "A candle." },
      { question: "What can you keep after giving to someone?", answer: "Your word." }
    ];
    activeRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    return `Here's a riddle for you: ${activeRiddle.question} (Type 'answer' for the solution.)`;
  } else if (lowerInput.includes("capabilities")) {
    return "I can chat with you, play games like Tic-Tac-Toe and Rock-Paper-Scissors, tell jokes, ask riddles, and much more!";
  } else {
    return "I'm here to help! You can ask me anything or play a game.";
  }
}
