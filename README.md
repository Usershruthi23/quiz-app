# Interactive Quiz App

![Quiz App Banner](screenshots/home.png)

## 📌 Overview

A responsive, interactive quiz application built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies. Features a modern design with smooth animations, a live countdown timer, and instant score feedback.

## 🚀 Features

- ✅ Multiple-choice questions (10 curated questions)
- ✅ 15-second countdown timer per question (animated ring)
- ✅ Live score tracking
- ✅ Dynamic question rendering via DOM manipulation
- ✅ Correct / wrong answer highlighting
- ✅ Final result screen with animated score ring
- ✅ Restart quiz option
- ✅ Light / Dark theme toggle
- ✅ Fully responsive (desktop, tablet, mobile)

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | App structure & markup |
| CSS3 | Styling, animations, CSS variables, responsive layout |
| JavaScript (ES6+) | DOM manipulation, timer logic, state management |

## 📂 Project Structure

```
quiz-app/
├── index.html        # Main HTML file (3 screens: Home, Quiz, Result)
├── style.css         # All styles, themes, animations
├── script.js         # Quiz logic, timer, DOM updates
├── screenshots/      # App screenshots for documentation
│   ├── home.png
│   ├── quiz.png
│   └── result.png
└── README.md
```

## 🎮 How It Works

1. **Home Screen** — User selects Light/Dark theme and clicks Start
2. **Quiz Screen** — 10 questions load one at a time; 15-second timer starts automatically
3. **Answering** — Clicking an option locks in the answer, highlights correct/wrong, enables Next button
4. **Timer runs out** — Correct answer is highlighted automatically, user can proceed
5. **Result Screen** — Final score shown with animated ring, breakdown of correct/wrong, percentage

## 🌐 Live Demo

> Add your GitHub Pages link here after deployment

**Example:** `https://yourusername.github.io/quiz-app/`

## 📂 GitHub Repository

> Add your repository link here

**Example:** `https://github.com/yourusername/quiz-app`

## 🚀 Deployment (GitHub Pages)

1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Branch**, select `main` and folder `/root`
4. Click **Save**
5. Your app will be live at `https://yourusername.github.io/quiz-app/`

## 📸 Screenshots

 Home Screen 

 Quiz Screen 

 Result Screen 

## 🎯 Learning Objectives Demonstrated

- JavaScript DOM manipulation (`getElementById`, `querySelector`, `innerHTML`)
- Event handling (`addEventListener`, `onclick`)
- Dynamic content rendering (questions, options generated via JS)
- Timer logic with `setInterval` / `clearInterval`
- State management (score, current question, answered flag)
- CSS custom properties (variables) for theming
- CSS animations (`@keyframes`, transitions)
- Responsive design with `clamp()`, `flexbox`, `grid`

## 👨‍💻 Author

> Add your name and contact links here

