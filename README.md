# 🧘 MacroZen

**MacroZen** is a sleek, mobile-first nutrition and weight tracking app built with [Nuxt 3](https://nuxt.com), designed to help users stay on top of their health goals with clarity and calm. It supports calorie and macro tracking, intermittent fasting, and mandatory weight monitoring — all wrapped in a beautifully responsive UI.

---

## ✨ Features

- 📊 **Track daily calories and macros** (protein, carbs, fats)
- 🧮 **Set weight loss, gain, or maintenance goals**
- 🕰️ **Support for intermittent fasting** (e.g. 16:8)
- 📉 **Mandatory weight tracking with progress visualization**
- 🍽️ **Log meals using a food database or custom entries**
- 📱 **Mobile-first design** with responsive layout
- 🧘 **Minimal, elegant UI** using [Nuxt UI 3](https://ui.nuxt.com)

---

## 🧱 Tech Stack

- [Nuxt 3](https://nuxt.com)
- [Nuxt UI 3](https://ui.nuxt.com)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [TailwindCSS](https://tailwindcss.com)
- Optional: Supabase, PWA, Capacitor (future mobile support)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/macrozen.git
cd macrozen

### 2. Install Dependendcies
```bun install

### 3. Run in Development Mode
```bun run dev

### 4. Build for Production
```bun run build

## 📁 Project Structure
pages/         → Main views (dashboard, food, weight, fasting)
components/    → UI and feature components
stores/        → Pinia stores for state (user, intake, weight, etc.)