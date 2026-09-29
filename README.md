# 🗳️ The Ballot Box — Live Poll

A sleek, interactive live polling system built with Vanilla JavaScript, HTML, and CSS. Designed with a unique "torn paper" ballot aesthetic, this application allows users to dynamically add voting options and cast votes in real-time.

## ✨ Features

- **Dynamic Polling**: Add custom voting options on the fly.
- **Duplicate Vote Prevention**: Uses a `Set` data structure to ensure each unique voter can only vote once per option.
- **Persistent Voter Identity**: Generates a unique voter ID using `crypto.randomUUID()` (with a graceful Math.random fallback) and persists it via `localStorage` so the browser "remembers" the user.
- **Defensive Programming**: Includes `try/catch` blocks to gracefully handle `localStorage` restrictions (e.g., in private browsing or restricted `file://` contexts).
- **Responsive Design**: Fully responsive layout that adapts beautifully to mobile and desktop screens.
- **Elegant UI**: Custom CSS variables, serif typography, and a creative perforated-edge design.

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and accessible form structures.
- **CSS3**: Custom properties (variables), Flexbox, and creative `radial-gradient` tricks for the torn-paper effect.
- **Vanilla JavaScript (ES6+)**: `Map` and `Set` for efficient state management, DOM manipulation, and event delegation.

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/the-ballot-box.git
