import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS to allow cross-origin requests (e.g., from Lovable frontend)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to instantiate Groq SDK client safely
const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY is not configured. Please set your API key in the .env file.');
  }
  return new Groq({ apiKey });
};

/**
 * GET /health
 * Verification endpoint to check if the server is running.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * POST /api/chat
 * Handles chat interactions with Lumen using Groq API (llama-3.3-70b-versatile).
 * Expects body: { message: string, conversationHistory?: Array<{ role: string, content: string }> }
 * Returns: { reply: string }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message && (!Array.isArray(conversationHistory) || conversationHistory.length === 0)) {
      return res.status(400).json({ error: "Request body must include 'message' string or non-empty 'conversationHistory' array." });
    }

    // Build the messages list for Groq
    const messages = [];

    // System prompt defining Lumen's identity
    messages.push({
      role: 'system',
      content: 'You are Lumen, a helpful, intelligent, and friendly AI assistant.'
    });

    // Append existing conversation history if provided
    if (Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg) => {
        if (msg && typeof msg === 'object' && msg.role && msg.content) {
          messages.push({
            role: msg.role,
            content: msg.content
          });
        }
      });
    }

    // Append the current message if provided and not already the last message in history
    if (message && typeof message === 'string') {
      const lastMsg = messages[messages.length - 1];
      if (!lastMsg || lastMsg.role !== 'user' || lastMsg.content !== message) {
        messages.push({
          role: 'user',
          content: message
        });
      }
    }

    const groq = getGroqClient();

    // Call Groq API with model llama-3.3-70b-versatile
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile'
    });

    const reply = completion.choices[0]?.message?.content || '';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error in POST /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to generate response from Groq API.',
      message: error.message || 'An unexpected error occurred.'
    });
  }
});

/**
 * POST /api/summarize
 * Generates a concise summary of the provided text using Groq API.
 * Expects body: { text: string }
 * Returns: { summary: string }
 */
app.post('/api/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: "Request body must contain a valid 'text' string parameter." });
    }

    const groq = getGroqClient();

    // Call Groq API to request summary
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a precise text summarizer. Create a clear, concise summary highlighting key points.'
        },
        {
          role: 'user',
          content: `Please provide a concise summary of the following text:\n\n${text}`
        }
      ],
      model: 'llama-3.3-70b-versatile'
    });

    const summary = completion.choices[0]?.message?.content || '';

    return res.status(200).json({ summary });
  } catch (error) {
    console.error('Error in POST /api/summarize:', error);
    return res.status(500).json({
      error: 'Failed to generate summary from Groq API.',
      message: error.message || 'An unexpected error occurred.'
    });
  }
});

// Start express server
app.listen(PORT, () => {
  console.log(`Lumen backend listening on port ${PORT}`);
});
