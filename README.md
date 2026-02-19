# 🚀 Cogniflow — Frontend Dashboard

> **A modern, state-driven productivity dashboard built with React and Tailwind CSS.** > *Designed to behave like a production application, not a tutorial project.*

![Project Status](https://img.shields.io/badge/Status-Frontend%20Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20|%20Tailwind-blue)

## 📖 Overview

**Cogniflow** is a dashboard interface focused on real-world User Experience (UX) patterns. Unlike standard demo projects that assume data is always present, Cogniflow is engineered to handle the full lifecycle of data retrieval: **Loading**, **Empty**, and **Success** states.

It features a clean, dark-themed UI with viewport-based animations, trend indicators, and modular architecture, ensuring the application feels responsive and alive.

---

## ✨ Key Features

### 📊 Interactive Stat Cards
* **Smart Animations:** Count-up animations that trigger only when the element enters the viewport (using `useInView`).
* **Visual Feedback:** Integrated progress bars and dynamic trend indicators (Up/Down/Neutral).
* **Micro-interactions:** subtle gradients and hover effects.

### 🧠 State-Driven Architecture
The UI never assumes data presence. It reacts dynamically to the application state:
1.  **⏳ Loading State:** Displays shimmering Skeleton cards to prevent layout shifts (CLS) and improve perceived performance.
2.  **📭 Empty State:** A dedicated UX flow for when no active goals exist, avoiding "dead" UI.
3.  **✅ Data Ready:** Renders the dashboard with smooth entry animations.

### 🎯 Active Goals Tracking
* Clear visualization of ongoing objectives.
* Status-based color coding (On Track / At Risk / Off Track).
* Optimized for quick scanning.

---

## 🛠️ Tech Stack

* **Core:** React (Functional Components)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Logic:** Custom React Hooks
* **Design Philosophy:** No external UI libraries (Headless/Custom implementation)

---

## 📂 Project Structure

A scalable folder structure designed for separation of concerns.

```text
src/
│
├── components/
│   └── dashboard/
│       ├── DashHeader.jsx       # Global dashboard controls
│       ├── DashCard.jsx         # Generic card wrapper
│       ├── StatCard.jsx         # Individual metric display
│       ├── ActiveGoal.jsx       # Goal list item component
│       ├── SkeletonStatCard.jsx # Loading state placeholder
│       └── EmptyState.jsx       # UX for zero-data scenarios
│
├── hooks/
│   ├── useDashboardData.js      # Simulates API calls & state logic
│   └── useInView.js             # Intersection Observer logic
│
└── pages/
    └── Dashboard.jsx            # Main view controller
