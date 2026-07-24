# ⚡ Lumen AI Backend

A high-performance **Node.js & Express** backend service for **Lumen**, an intelligent AI chat and summarization assistant powered by the **Groq API** (`llama-3.3-70b-versatile`).

Designed to seamlessly integrate with modern frontend applications and web builders (e.g., **Lovable**, React, Next.js, Vue).

---

## 🚀 Features

- 💬 **AI Chat Endpoint (`/api/chat`)**: Multi-turn conversation support with custom system prompt context, powered by Groq's high-speed `llama-3.3-70b-versatile` model.
- 📝 **Text Summarization Endpoint (`/api/summarize`)**: Intelligent, key-point text summarization for long articles, documents, or notes.
- 🩺 **Health Check Endpoint (`/health`)**: Lightweight diagnostic endpoint for uptime monitoring.
- 🌐 **Cross-Origin Resource Sharing (CORS)**: Pre-configured to allow seamless frontend integration across domains.
- 🔐 **Secure Environment Handling**: Strict separation of credentials using `dotenv` to keep API keys out of source control.
- 🛡️ **Robust Error Handling**: Structured JSON error responses with proper HTTP status codes.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI SDK**: Official [`groq-sdk`](https://www.npmjs.com/package/groq-sdk)
- **AI Model**: `llama-3.3-70b-versatile` via [Groq Cloud](https://groq.com/)
- **Middleware**: `cors`, `dotenv`, `express.json`

---

## 📁 Project Structure

```text
lumen-backend/
├── server.js          # Express application entry point & API routes
├── package.json        # Project metadata & npm dependencies
├── package-lock.json   # Locked dependency tree
├── .env.example        # Environment variable template
├── .gitignore          # Git exclusion rules (node_modules, .env)
└── README.md           # Documentation
```

---

## 🔑 Environment Setup

1. Copy `.env.example` to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment variables in `.env`:
   ```env
   # Required: Get your free API key from https://console.groq.com
   GROQ_API_KEY=gsk_your_actual_groq_api_key_here

   # Optional: Server listening port (default: 3000)
   PORT=3000
   ```

> ⚠️ **Security Warning**: Never commit your `.env` file or hardcode your `GROQ_API_KEY` into source files.

---

## 💻 Local Quickstart

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

**Production Mode:**
```bash
npm start
```

**Development Mode (Auto-reloading):**
```bash
npm run dev
```

The server will start at `http://localhost:3000`.

---

## 📡 API Reference

### 1. Health Check

Verifies server status and availability.

- **URL**: `/health`
- **Method**: `GET`
- **Response**: `200 OK`

```json
{
  "status": "ok"
}
```

---

### 2. Chat Assistant

Generates a response from Lumen using multi-turn conversation context.

- **URL**: `/api/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "message": "What can you help me with?",
  "conversationHistory": [
    { "role": "user", "content": "Hi, I am Sakshi." },
    { "role": "assistant", "content": "Hello Sakshi! How can I assist you today?" }
  ]
}
```

#### Success Response (`200 OK`)
```json
{
  "reply": "Hello Sakshi! As Lumen, I can help answer questions, brainstorm ideas, analyze concepts, summarize long texts, and assist with coding or general knowledge. What would you like to work on today?"
}
```

#### Error Response (`500 Internal Server Error`)
```json
{
  "error": "Failed to generate response from Groq API.",
  "message": "GROQ_API_KEY is not configured in environment."
}
```

---

### 3. Text Summarization

Generates a concise summary for any given block of text.

- **URL**: `/api/summarize`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "text": "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting to produce dynamic web page content before the page is sent to the user's web browser."
}
```

#### Success Response (`200 OK`)
```json
{
  "summary": "Node.js is an open-source, cross-platform JavaScript runtime that allows developers to run server-side scripts and build command-line tools outside the browser."
}
```

---

## 🚢 Deployment Guide

This backend can be deployed to any hosting platform supporting Node.js (e.g. **Render**, **Railway**, **Vercel**, **Fly.io**).

### Deploying to Render / Railway

1. Push your repository to GitHub (`Sakshii2708/lumen-backend`).
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
3. Connect your GitHub repository.
4. Configure build settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add `GROQ_API_KEY` under **Environment Variables** in your hosting dashboard.
6. Copy your deployed web service URL (e.g., `https://lumen-backend.onrender.com`) to connect your frontend.

---

## 📄 License

[MIT](LICENSE) © 2026 Lumen Team
