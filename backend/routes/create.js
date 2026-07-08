const express = require("express");
const router = express.Router();
require("dotenv").config();
const { quizes } = require("../data");

function extractJson(text) {
  if (!text) return null;

  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start !== -1 && end !== -1 && end > start) {
    return JSON.parse(candidate.slice(start, end + 1));
  }

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
    note: aiQuiz.note || "",
  };
}

router.post("/", async (req, res) => {
  const { title, number, difficulty } = req.body;

  const topic = String(title || "").trim();
  const questionCount = Number(number);

  if (!topic) {
    return res.status(400).json({ error: "title is required" });
  }

  if (!Number.isInteger(questionCount) || questionCount < 1) {
    return res.status(400).json({ error: "number must be a positive integer" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }

  const prompt = `
Create a multiple-choice quiz on the topic: ${topic}.

Requirements:
- Number of questions: ${questionCount}
- Each question must have 4 options
- Only one correct answer per question
- Make questions clear, educational, and exam-ready
- Difficulty: ${difficulty || "medium"}

Return ONLY valid JSON in this exact structure, with no extra commentary:

{
  "title": "Quiz title",
  "name": "Quiz title",
  "desc": "A short description",
  "imgKeyword": "a short keyword representing the topic icon",
  "queue": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct option"
    }
  ],
  "note": "A long and detailed note on ${topic} that helps the user understand the topic and answer the questions. It should be long, detailed, and explanatory, but not repeat the quiz questions."
}
`.trim();

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.GROQ_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    const data = await groqRes.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return res.status(502).json({
        error: "Groq API failed",
        details: data.error?.message,
      });
    }

    const responseText = data.choices?.[0]?.message?.content || "";
    const parsed = extractJson(responseText);

    const aiQuiz = normalizeQuiz(parsed, topic);

    quizes.push(aiQuiz);

    return res.json({
      success: true,
      quiz: aiQuiz,
      quizes,
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return res.status(500).json({
      error: "Groq API failed",
      details: error?.message,
    });
  }
});

module.exports = router;