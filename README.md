# 🌾 Fasal AI (फसल AI) — AI-Powered Crop Disease Detector for Indian Farmers

[![VBYLD 2027](https://img.shields.io/badge/VBYLD%202027-Hack%20for%20Social%20Cause-orange)](https://mybharat.gov.in)
[![Theme](https://img.shields.io/badge/Theme-Rural%20Development%20%26%20Livelihoods-green)](https://sdgs.un.org/goals)
[![UN SDG](https://img.shields.io/badge/UN%20SDGs-SDG%202%20%7C%20SDG%201%20%7C%20SDG%209-blue)](https://sdgs.un.org/goals)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?logo=google)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-23%2F23%20Passing-brightgreen)](tests/run-tests.js)

> **"Think Global, Hack Local — Technology for Social Transformation"**
> Official Submission for **VBYLD 2027 — Hack for Social Cause**

---

## 🎯 What is Fasal AI? (एक वाक्य में)

**Farmer takes photo of sick crop → AI detects disease → Farmer gets treatment advice in Hindi, instantly — FREE.**

---

## 🚨 The Problem

India has **600 million farmers**. Crop diseases destroy **30–50% of yield** every year.

| Problem | Scale |
|---|---|
| Farmers lose ₹2–5 lakh/acre to undetected crop diseases | 150 million+ acres affected annually |
| Average farmer travels 40–80 km to reach an agronomist | Only 1 agronomist per 1,000 farmers in rural India |
| Disease identified too late = entire season ruined | 54% of farmers get diagnosis only after >50% crop loss |
| Agriculture apps are in English only | 73% of Indian farmers are Hindi/regional language speakers |

---

## 💡 The Solution — Fasal AI

A **mobile-first Progressive Web App** that puts a Google Gemini AI agronomist in every farmer's pocket:

```
📸 Take Photo → 🤖 Gemini 2.5 Flash Vision AI → 💊 Treatment in Hindi (30 seconds)
```

### Key Features

| Feature | Description |
|---|---|
| 📸 **Camera-first UI** | Tap, point, shoot — optimized for rural smartphone users |
| 🤖 **Gemini 2.5 Flash Vision** | Identifies 50+ crop diseases from a single photo |
| 🌿 **Dual Treatment Plans** | Chemical AND organic/home-remedy alternatives |
| 🗣️ **Hindi Voice Output** | Text-to-speech reads advice aloud for low-literacy users |
| 📱 **PWA — No App Store** | Works in browser, installs on phone like an app |
| ⚡ **Demo Mode** | Works WITHOUT API key for offline/demo purposes |
| 📞 **Kisan Call Centre** | One-tap dial 1800-180-1551 for live expert help |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2 (App Router), React 19, TypeScript 5.8
- **AI Engine**: Google Gemini 2.5 Flash Vision API (`@google/genai`)
- **Styling**: Tailwind CSS 3.4, Mobile-first PWA
- **Voice**: Web Speech Synthesis API (Hindi Text-to-Speech, zero cost)
- **Backend**: Next.js API Routes (serverless, zero infrastructure)
- **Testing**: Node.js built-in `assert` module — 23 tests, 100% pass rate

---

## 🚀 Quick Setup (Under 5 Minutes)

### Prerequisites
- Node.js v18+ installed
- Free Google Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fasal-ai.git
cd fasal-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
```
Edit `.env`:
```env
GEMINI_API_KEY="your-free-gemini-api-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```
> **Note:** Fasal AI works in **Demo Mode** even without an API key — great for presentations!

### 4. Run Tests
```bash
npm test
# Expected: 23/23 Tests Passed ✅
```

### 5. Start the App
```bash
npm run dev
# Open: http://localhost:3001
```

---

## 📱 How to Use (Demo Walkthrough)

1. **Open** `http://localhost:3001` on your phone or browser
2. **Tap** the camera area to take a photo (or upload an existing crop image)
3. **Tap** "AI से जाँचें" (Analyze with AI)
4. **Read** the disease diagnosis in Hindi/English
5. **Tap** 🔊 to hear the advice spoken aloud in Hindi
6. **Follow** the treatment steps or call 1800-180-1551

---

## 🧪 Sample Data & Test Images

Find sample crop disease images in `tests/sample-images/` (or use any crop photo from your camera).

**Crops Supported:**
- गेहूँ (Wheat) — Yellow Rust, Brown Rust, Loose Smut
- धान (Rice/Paddy) — Blast Disease, Brown Spot, Bacterial Blight
- टमाटर (Tomato) — Early Blight, Late Blight, Leaf Curl
- कपास (Cotton) — Bollworm, Alternaria Blight
- गन्ना (Sugarcane) — Red Rot, Smut

---

## 📊 Impact Potential

| Metric | Target |
|---|---|
| Farmers reached | 50,000+ in Year 1 (via CSCs and KVKs) |
| Disease detection time | From 3–7 days to **30 seconds** |
| Yield loss prevention | Save **₹30,000–₹80,000** per farmer per season |
| Language barrier | **Eliminated** — full Hindi interface + voice |

---

## 📄 License

MIT License — See [LICENSE](LICENSE) file. Fully open source.

---

*Built with ❤️ for 600 million Indian farmers | Viksit Bharat 2027*
