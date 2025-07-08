const rulesBtn = document.getElementById("rules-btn");
const backBtn = document.getElementById("back-btn");
const startBtn = document.getElementById("start-btn");
const menuScreen = document.getElementById("menu-screen");
const rulesScreen = document.getElementById("rules-screen");
const gameScreen = document.getElementById("game-screen");
const allowDuplicates = document.getElementById("allow-duplicates");

let secretCode = [];
let currentGuess = [];
let attempts = 0;

rulesBtn.addEventListener("click", () => {
  menuScreen.style.display = "none";
  rulesScreen.style.display = "flex";
});

backBtn.addEventListener("click", () => {
  rulesScreen.style.display = "none";
  menuScreen.style.display = "flex";
});

startBtn.addEventListener("click", () => {
  menuScreen.style.display = "none";
  gameScreen.style.display = "flex";
  generateCode();
  setupGuesses();
});

function generateCode() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];
  secretCode = [];
  while (secretCode.length < 4) {
    const c = colors[Math.floor(Math.random() * colors.length)];
    if (!allowDuplicates.checked && secretCode.includes(c)) continue;
    secretCode.push(c);
  }
  console.log("Secret code:", secretCode);
}

function setupGuesses() {
  const guesses = document.getElementById("guesses");
  guesses.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.className = "guess-row";
    for (let j = 0; j < 4; j++) {
      const slot = document.createElement("div");
      slot.className = "guess-slot";
      slot.dataset.index = j;
      row.appendChild(slot);
    }
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    for (let k = 0; k < 4; k++) {
      const peg = document.createElement("div");
      peg.className = "peg";
      feedback.appendChild(peg);
    }
    row.appendChild(feedback);
    guesses.appendChild(row);
  }
  currentGuess = [];
  attempts = 0;
  updateScore();
}

document.querySelectorAll(".palette .color").forEach(colorBtn => {
  colorBtn.addEventListener("click", () => {
    if (currentGuess.length < 4) {
      currentGuess.push(colorBtn.classList[1]);
      updateCurrentRow();
    }
  });
});

function updateCurrentRow() {
  const rows = document.querySelectorAll(".guess-row");
  const activeRow = rows[9 - attempts];
  const slots = activeRow.querySelectorAll(".guess-slot");
  slots.forEach((s, i) => {
    s.style.backgroundColor = currentGuess[i] || "lightgreen";
  });
}

document.getElementById("check-btn").addEventListener("click", () => {
  if (currentGuess.length < 4) return alert("Fill all 4 slots!");

  const feedback = getFeedback(currentGuess, secretCode);
  const rows = document.querySelectorAll(".guess-row");
  const activeRow = rows[9 - attempts];
  const pegs = activeRow.querySelectorAll(".peg");
  feedback.forEach((pegColor, i) => {
    pegs[i].style.backgroundColor = pegColor;
  });

  if (feedback.every(p => p === "red")) {
    revealCode();
    showCustomAlert(attempts + 1); // 👈 show stars based on attempts
  } else {
    attempts++;
    updateScore();
    if (attempts >= 10) {
      revealCode();
      showCustomAlert(attempts); // 👈 also show alert on loss
    }
    currentGuess = [];
  }
});

function updateScore() {
  document.getElementById("score").textContent = `Attempts: ${attempts}`;
}

function getFeedback(guess, code) {
  const result = [];
  const codeCopy = [...code];
  const guessCopy = [...guess];

  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      result.push("red");
      codeCopy[i] = guessCopy[i] = null;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
      result.push("white");
      codeCopy[codeCopy.indexOf(guessCopy[i])] = null;
      guessCopy[i] = null;
    }
  }
  while (result.length < 4) result.push("black");
  return result;
}

function revealCode() {
  const hidden = document.getElementById("hidden-code").children;
  secretCode.forEach((color, i) => {
    hidden[i].textContent = "";
    hidden[i].style.backgroundColor = color;
  });
}

// 🔥 Custom modal alert with stars
function showCustomAlert(attempts) {
  const modal = document.getElementById("custom-alert");
  const starsContainer = document.getElementById("stars-container");

  let stars = 0;
  if (attempts <= 1) stars = 5;
  else if (attempts <= 2) stars = 4;
  else if (attempts <= 3) stars = 3;
  else if (attempts <= 5) stars = 2;
  else stars = 1;

  starsContainer.innerHTML = "⭐".repeat(stars);
  modal.style.display = "flex";
}

//  "Play Again" button
document.getElementById("play-again").addEventListener("click", () => {
  document.getElementById("custom-alert").style.display = "none";
  location.reload();
});

// Reset on restart
document.getElementById("restart-btn").addEventListener("click", () => {
  gameScreen.style.display = "none";
  menuScreen.style.display = "flex";

  const hiddenSlots = document.querySelectorAll("#hidden-code .slot");
  hiddenSlots.forEach(slot => {
    slot.style.backgroundColor = "#d3d3d3";
    slot.textContent = "?";
  });

  document.getElementById("score").textContent = "Attempts: 0";
});


