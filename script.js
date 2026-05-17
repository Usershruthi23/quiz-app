/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    document.getElementById("loader").style.display =
      "none";

  }, 1200);

});

/* =========================
   THEME
========================= */

function setTheme(theme) {

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem("quiz-theme", theme);

  document.getElementById("btn-light")
    .classList.toggle("active", theme === "light");

  document.getElementById("btn-dark")
    .classList.toggle("active", theme === "dark");
}

window.onload = () => {

  const savedTheme =
    localStorage.getItem("quiz-theme") || "light";

  setTheme(savedTheme);
};

/* =========================
   QUESTION BANK
========================= */

const questionBank = [

  {
    category: "DSA",
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: 1
  },

  {
    category: "DSA",
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    answer: 1
  },

  {
    category: "Operating Systems",
    question: "Which scheduling algorithm gives minimum waiting time?",
    options: ["FCFS", "SJF", "Round Robin", "Priority"],
    answer: 1
  },

  {
    category: "DBMS",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Sequential Query Logic",
      "System Query Language"
    ],
    answer: 0
  },

  {
    category: "Computer Networks",
    question: "Which protocol is used for web browsing?",
    options: ["FTP", "HTTP", "SMTP", "ARP"],
    answer: 1
  },

  {
    category: "OOP",
    question: "Which OOP principle hides internal implementation?",
    options: [
      "Inheritance",
      "Encapsulation",
      "Polymorphism",
      "Abstraction"
    ],
    answer: 1
  },

  {
    category: "Programming",
    question: "Which keyword creates a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: 2
  },

  {
    category: "Software Engineering",
    question: "Which SDLC model is linear sequential?",
    options: ["Agile", "Spiral", "Waterfall", "RAD"],
    answer: 2
  },

  {
    category: "Computer Architecture",
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Power Unit",
      "Central Program Utility",
      "Control Processing Unit"
    ],
    answer: 0
  },

  {
    category: "TOC",
    question: "Which automaton accepts Context-Free Languages?",
    options: [
      "DFA",
      "NFA",
      "Pushdown Automaton",
      "Turing Machine"
    ],
    answer: 2
  },

  {
    category: "DSA",
    question: "Which traversal gives sorted order in BST?",
    options: [
      "Preorder",
      "Postorder",
      "Inorder",
      "Level Order"
    ],
    answer: 2
  },

  {
    category: "Operating Systems",
    question: "What is deadlock?",
    options: [
      "Infinite loop",
      "Memory overflow",
      "Processes waiting forever",
      "CPU failure"
    ],
    answer: 2
  }

];

/* =========================
   RANDOM QUESTIONS
========================= */

function getSessionQuestions() {

  const shuffled =
    [...questionBank].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 10);
}

let questions = getSessionQuestions();

/* =========================
   STATE
========================= */

let currentQ = 0;
let score = 0;
let answered = false;

let timerInterval = null;

let timeLeft = 15;

const TIMER_MAX = 15;

const CIRCUMFERENCE =
  2 * Math.PI * 18;

const letters = ["A", "B", "C", "D"];

/* =========================
   NAVIGATION
========================= */

function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.remove("active");

    });

  document
    .getElementById(id)
    .classList.add("active");
}

function goHome() {

  clearTimer();

  showScreen("home-screen");
}

/* =========================
   QUIZ START
========================= */

function startQuiz() {

  questions = getSessionQuestions();

  currentQ = 0;

  score = 0;

  showScreen("quiz-screen");

  renderQuestion();
}

function restartQuiz() {

  startQuiz();
}

/* =========================
   RENDER QUESTION
========================= */

function renderQuestion() {

  answered = false;

  const q = questions[currentQ];

  const progress =
    Math.round(
      ((currentQ + 1) / questions.length) * 100
    );

  document.getElementById("q-label")
    .textContent =
    `Question ${currentQ + 1} of ${questions.length} • ${progress}%`;

  document.getElementById("live-score")
    .textContent = score;

  const motivation = [

    "🔥 You got this!",

    "🚀 Keep going!",

    "🎯 Aim for perfection!",

    "💡 Think carefully!"

  ];

  document.getElementById("category-tag")
    .innerHTML =
    `${q.category} • ${
      motivation[
        Math.floor(Math.random() * motivation.length)
      ]
    }`;

  document.getElementById("question-text")
    .textContent = q.question;

  document.getElementById("progress-bar")
    .style.width =
    `${(currentQ / questions.length) * 100}%`;

  const nextBtn =
    document.getElementById("next-btn");

  nextBtn.disabled = true;

  nextBtn.textContent =
    currentQ === questions.length - 1
      ? "See Results →"
      : "Next →";

  const grid =
    document.getElementById("options-grid");

  grid.innerHTML = "";

  q.options.forEach((opt, i) => {

    const btn =
      document.createElement("button");

    btn.className = "option-btn";

    btn.innerHTML = `
      <div style="display:flex;align-items:center;gap:15px;">
        <div class="option-letter">
          ${letters[i]}
        </div>

        <div>
          ${opt}
        </div>
      </div>
    `;

    btn.addEventListener("click", () => {

      selectOption(i, btn);

    });

    grid.appendChild(btn);

  });

  startTimer();
}

/* =========================
   SELECT OPTION
========================= */

function selectOption(index, clickedBtn) {

  if (answered) return;

  answered = true;

  clearTimer();

  document.getElementById("click-sound").play();

  const q = questions[currentQ];

  const btns =
    document.querySelectorAll(".option-btn");

  btns.forEach((btn, i) => {

    btn.disabled = true;

    if (i === q.answer) {

      btn.classList.add("correct");

      btn.innerHTML += " ✅";
    }

  });

  if (index === q.answer) {

    score++;

    document.getElementById("correct-sound")
      .play();

    document.getElementById("live-score")
      .textContent = score;

  } else {

    clickedBtn.classList.add("wrong");

    clickedBtn.innerHTML += " ❌";

    document.getElementById("wrong-sound")
      .play();
  }

  document.getElementById("next-btn")
    .disabled = false;
}

/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

  currentQ++;

  if (currentQ >= questions.length) {

    showResult();

  } else {

    renderQuestion();
  }
}

/* =========================
   TIMER
========================= */

function startTimer() {

  timeLeft = TIMER_MAX;

  updateTimerUI();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {

    timeLeft--;

    updateTimerUI();

    if (timeLeft <= 0) {

      clearTimer();

      timeUpAutoSelect();
    }

  }, 1000);
}

function clearTimer() {

  clearInterval(timerInterval);

  timerInterval = null;
}

function updateTimerUI() {

  document.getElementById("timer-text")
    .textContent = timeLeft;

  const pct =
    timeLeft / TIMER_MAX;

  const offset =
    CIRCUMFERENCE * (1 - pct);

  const arc =
    document.getElementById("timer-arc");

  arc.style.strokeDashoffset = offset;

  arc.style.stroke =
    timeLeft <= 5
      ? "#dc2626"
      : "#7c3aed";
}

function timeUpAutoSelect() {

  if (answered) return;

  answered = true;

  const q = questions[currentQ];

  const btns =
    document.querySelectorAll(".option-btn");

  btns.forEach((btn, i) => {

    btn.disabled = true;

    if (i === q.answer) {

      btn.classList.add("correct");

      btn.innerHTML += " ✅";
    }

  });

  document.getElementById("next-btn")
    .disabled = false;
}

/* =========================
   RESULT
========================= */

function showResult() {

  clearTimer();

  showScreen("result-screen");

  const pct =
    Math.round(
      (score / questions.length) * 100
    );

  const wrong =
    questions.length - score;

  let emoji;

  let heading;

  if (pct === 100) {

    emoji = "🏆";

    heading = "Perfect!";

  } else if (pct >= 80) {

    emoji = "🎉";

    heading = "Brilliant!";

  } else if (pct >= 60) {

    emoji = "😊";

    heading = "Well Done!";

  } else if (pct >= 40) {

    emoji = "🤔";

    heading = "Not Bad!";

  } else {

    emoji = "📚";

    heading = "Keep Practicing!";
  }

  document.getElementById("result-emoji")
    .textContent = emoji;

  document.getElementById("result-heading")
    .textContent = heading;

  document.getElementById("result-sub")
    .textContent =
    `You answered ${score} out of ${questions.length} correctly`;

  document.getElementById("score-big")
    .textContent = score;

  const arc =
    document.getElementById("score-arc");

  const SCORE_CIRC =
    2 * Math.PI * 50;

  arc.style.strokeDasharray = SCORE_CIRC;

  setTimeout(() => {

    arc.style.strokeDashoffset =
      SCORE_CIRC *
      (1 - score / questions.length);

  }, 100);

  document.getElementById("result-breakdown")
    .innerHTML = `

    <div class="breakdown-card">
      <span class="breakdown-val">
        ✅ ${score}
      </span>

      <span class="breakdown-label">
        Correct
      </span>
    </div>

    <div class="breakdown-card">
      <span class="breakdown-val">
        ❌ ${wrong}
      </span>

      <span class="breakdown-label">
        Wrong
      </span>
    </div>

    <div class="breakdown-card">
      <span class="breakdown-val">
        🎯 ${pct}%
      </span>

      <span class="breakdown-label">
        Score
      </span>
    </div>
  `;

  if (pct >= 80) {

    confetti({

      particleCount: 200,

      spread: 90,

      origin: { y: 0.6 }

    });
  }
}

/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", (e) => {

  const map = {

    "1": 0,

    "2": 1,

    "3": 2,

    "4": 3

  };

  if (map[e.key] !== undefined) {

    const btns =
      document.querySelectorAll(".option-btn");

    if (btns[map[e.key]]) {

      btns[map[e.key]].click();
    }
  }
});