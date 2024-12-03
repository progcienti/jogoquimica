const words = ["hidorgenio", "oxigenio", "boro", "aluminio", "bronze", "cobre", "ferro", "tungstenio", "prata", "selenio"];
let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let attemptsLeft;

function initializeGame() {
  if (words.length === 0) {
    // Se todas as palavras foram usadas, avisar o jogador e reiniciar o conjunto de palavras
    alert("Parabéns! Você completou todas as palavras! Reiniciando o jogo...");
    words = ["Hidorgenio", "oxigenio", "Boro", "Aluminio", "Bronze", "Cobre", "ferro", "Tungstenio", "prata", "selenio"];
  }

  // Selecionar uma nova palavra aleatória e removê-la da lista de palavras
  selectedWord = words.splice(Math.floor(Math.random() * words.length), 1)[0];
  guessedLetters = Array(selectedWord.length).fill("_");
  wrongLetters = [];
  attemptsLeft = maxAttempts;
  updateDisplay();
  document.getElementById("message").innerText = "";
  document.getElementById("nextQuestionButton").style.display = "none"; // Ocultar o botão no início
}

function updateDisplay() {
  document.getElementById("wordDisplay").innerText = guessedLetters.join(" ");
  document.getElementById("wrongLetters").innerText = `Erros: ${wrongLetters.join(", ")}`;
  document.getElementById("tentativasRestantes").innerText = `Tentativas Restantes: ${attemptsLeft}`;
}

function makeGuess() {
  const input = document.getElementById("guessInput").value.toLowerCase();
  document.getElementById("guessInput").value = "";

  if (input === "" || input.length > 1 || !/^[a-záéíóúãõç]$/.test(input)) {
    alert("Por favor, digite apenas uma letra válida.");
    return;
  }

  if (guessedLetters.includes(input) || wrongLetters.includes(input)) {
    alert("Você já tentou essa letra.");
    return;
  }

  if (selectedWord.includes(input)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === input) guessedLetters[i] = input;
    }
    checkWin();
  } else {
    wrongLetters.push(input);
    attemptsLeft--;
    if (attemptsLeft === 0) {
      document.getElementById("message").innerText = `Você perdeu! A palavra era "${selectedWord}".`;
      document.getElementById("nextQuestionButton").style.display = "block"; // Mostrar o botão ao perder
    }
  }

  updateDisplay();
}

function checkWin() {
  if (guessedLetters.join("") === selectedWord) {
    document.getElementById("message").innerText = "Parabéns! Você venceu!";
    document.getElementById("nextQuestionButton").style.display = "block"; // Mostrar o botão ao vencer
  }
}

function resetGame() {
    words = ["Hidorgenio", "oxigenio", "Boro", "Aluminio", "Bronze", "Cobre", "ferro", "Tungstenio", "prata", "selenio"];
  initializeGame();
}

function nextQuestion() {
  initializeGame(); // Iniciar uma nova rodada
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    makeGuess();
  }
}

initializeGame();
