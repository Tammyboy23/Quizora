const express = require("express");
const router = express.Router();
require("dotenv").config();
const { quizes } = require("../data");

function extractJson(text) {
  if (!text) return null;

  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;

  return JSON.parse(candidate);
}

function normalizeQuiz(aiQuiz, fallbackTitle, fallbackNumber) {
  if (!aiQuiz || typeof aiQuiz !== "object") {
    throw new Error("AI response was not a valid quiz object");
  }

  const topicTitle = String(aiQuiz.title || aiQuiz.name || fallbackTitle || "Quiz");
  const queue = Array.isArray(aiQuiz.queue) ? aiQuiz.queue : [];

  const normalizedQueue = queue.map((item) => {
    const rawOptions = item?.options;
    const options = Array.isArray(rawOptions)
      ? rawOptions
      : rawOptions && typeof rawOptions === "object"
      ? Object.values(rawOptions)
      : [];

    return {
      question: item?.question || "",
      options,
      answer: item?.answer || options[0] || "",
    };
  });

  return {
    title: topicTitle,
    name: aiQuiz.name || topicTitle,
    id: Number(aiQuiz.id) || Date.now() + Math.floor(Math.random() * 1000),
    desc: aiQuiz.desc || `Quiz about ${topicTitle}`,
    img: aiQuiz.img || "https://cdn-icons-png.flaticon.com/512/184/184615.png",
    queue: normalizedQueue,
  };
}

router.post("/", async (req, res) => {
  const { title, number } = req.body;
  const topic = String(title);
  const questionCount = Number(number);

  if (!topic) {
    return res.status(400).json({ error: "title is required" });
  }

  if (!Number.isInteger(questionCount) || questionCount < 1) {
    return res.status(400).json({ error: "number must be a positive integer" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY || process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: `Create a multiple-choice quiz on the topic: ${topic}.

Requirements:
- Number of questions: ${questionCount}
- Each question must have 4 options
- Only one correct answer per question
- Questions should be clear, accurate, and educational
- Make it suitable for students preparing for exams if applicable
-Make sure to make the questions different and not the exact same when asked for it another time

Return ONLY valid JSON in this exact structure:
{
  "title": "Quiz title",
  "name": "Quiz title",
  "id": ${crypto.randomUUID()},
  "desc": "A short description",
  "img": "a link to an image or icon that matchs the topic",
  "id": 123456,
  "desc": "A short description",
  "img": "A link to a image that can represnet the topic",
  "queue": [
    {
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "The exact correct option text"
    }
  ]
}`.trim(),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(message);
    const aiQuiz = normalizeQuiz(parsed, topic, questionCount);

    quizes.push(aiQuiz);
    return res.json({ success: true, quiz: aiQuiz, quizes });
  } catch (error) {
    console.error("Groq API error:", error);
    return res.status(500).json({ error: "Failed to fetch response from Groq API" });
  }
});

module.exports = router;