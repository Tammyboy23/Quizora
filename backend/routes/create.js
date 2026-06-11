const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { quizes } = require("../data");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function extractJson(text) {
  if (!text) return null;

  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;

  return JSON.parse(candidate);
}

function normalizeQuiz(aiQuiz, fallbackTitle) {
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

  // Convert AI keyword → real icon URL
  const iconKeyword = aiQuiz.imgKeyword || topicTitle;

  const imgUrl = `https://img.icons8.com/ios-filled/512/${encodeURIComponent(
    iconKeyword.toLowerCase().replace(/\s+/g, "-")
  )}.png`;

  return {
    title: topicTitle,
    name: aiQuiz.name || topicTitle,
    id: Date.now() + Math.floor(Math.random() * 1000),
    desc: aiQuiz.desc || `Quiz about ${topicTitle}`,
    img: imgUrl,
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
    const prompt = `
Create a multiple-choice quiz on the topic: ${topic}.

Requirements:
- Number of questions: ${questionCount}
- Each question must have 4 options
- Only one correct answer per question
- Make questions clear, educational, and exam-ready

Return ONLY valid JSON in this structure:

{
  "title": "Quiz title",
  "name": "Quiz title",
  "id": ${Date.now()},
  "desc": "A short description",
  "imgKeyword": "a short keyword representing the topic icon (e.g. 'physics', 'chemistry', 'biology')",
  "queue": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct option"
    }
  ]
}
`.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const message = response.text || "";
    const parsed = extractJson(message);

    const aiQuiz = normalizeQuiz(parsed, topic);

    quizes.push(aiQuiz);

    return res.json({
      success: true,
      quiz: aiQuiz,
      quizes,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
  error: "Gemini API failed",
  details: error?.message,
});
  }
});

module.exports = router;