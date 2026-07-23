# Lumen Backend

Node.js + Express backend service for **Lumen** AI chat assistant powered by Groq API (`llama-3.3-70b-versatile`).

---

## 🚀 Quick Start Instructions

### 1. Installation

Navigate to the project folder and install dependencies:

```bash
cd lumen-backend
npm install
```

### 2. Configure Environment Variables

Open `.env` (or copy `.env.example` to `.env`) and set your Groq API key:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
PORT=3000
```

> 🔑 Get a Groq API key for free from the [Groq Console](https://console.groq.com).

### 3. Run the Server

Start the server in production mode:

```bash
npm start
```

Or run in development mode (auto-reload on file changes in Node 18+):

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

### 1. `GET /health`
Verifies server health and status.

**Response:**
```json
{
  "status": "ok"
}
```

---

### 2. `POST /api/chat`
Generates a response from Lumen assistant using `llama-3.3-70b-versatile`.

**Request Body:**
```json
{
  "message": "Hello Lumen, what can you do?",
  "conversationHistory": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help you today?" }
  ]
}
```

**Response:**
```json
{
  "reply": "Hello! I am Lumen, your AI assistant. I can answer questions, summarize long text, help with coding, and more!"
}
```

---

### 3. `POST /api/summarize`
Summarizes any given block of text.

**Request Body:**
```json
{
  "text": "Node.js is a cross-platform, open-source JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting."
}
```

**Response:**
```json
{
  "summary": "Node.js is an open-source, cross-platform JavaScript runtime environment for server-side scripting and command-line tools."
}
```

---

## 🔒 Security & CORS
- **CORS** is enabled for cross-origin requests, allowing frontends hosted on platforms like **Lovable**, Vercel, or Netlify to connect smoothly.
- **API Key Security**: The Groq API key is accessed strictly via `process.env.GROQ_API_KEY` and never exposed to the frontend.
