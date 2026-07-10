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

function normalizeQuiz(aiQuiz, fallbackTitle, fallbackQuizType = "QuizOnly") {
  if (!aiQuiz || typeof aiQuiz !== "object") {
    throw new Error("AI response was not a valid quiz object");
  }

  const topicTitle = String(aiQuiz.title || aiQuiz.name || fallbackTitle || "Quiz");
  const queue = Array.isArray(aiQuiz.queue) ? aiQuiz.queue : [];
  // Prefer the user's selection (fallbackQuizType) over whatever the AI echoes back
  const quizTypeValue = String(fallbackQuizType || "QuizOnly").trim() || "QuizOnly";

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
    quizType: quizTypeValue,
  };
}

router.post("/", async (req, res) => {
  const { title, number, difficulty, quizType } = req.body;

  const topic = String(title || "").trim();
  const questionCount = Number(number);
  const quizTypeValue = String(quizType || "QuizOnly").trim() || "QuizOnly";

  if (!topic) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!Number.isInteger(questionCount) || questionCount < 1) {
    return res.status(400).json({ error: "number must be a positive integer" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "AI is Malfunctioning" });
  }

 const isLesson = quizTypeValue === "Lesson";

  const noteInstructions = isLesson
    ? `
For the "note" field, write a comprehensive, textbook-style study guide on ${topic}.
This must be LONG and IN-DEPTH — aim for 1500-2000 words minimum. Do not write a short summary.

Structure it with these Markdown sections, each fully developed with multiple paragraphs (not just one or two sentences per section):

## Introduction
Explain what ${topic} is, its background/context, and why it matters. 2-3 paragraphs.

## Core Concepts
Break down every major concept, term, and idea related to ${topic} in detail. Use ### subheadings for each distinct concept. Explain each one thoroughly as if teaching someone encountering it for the first time — don't just define terms, explain how and why they work, with reasoning.

## Examples and Applications
Give concrete, worked examples. If the topic involves calculations, formulas, or quantitative reasoning, show step-by-step worked examples using LaTeX (inline math like $x^2$, block equations like $$E = mc^2$$ on their own line).

## Comparisons or Key Facts
Where relevant, include a Markdown table comparing related concepts, categories, timelines, or values.

## Common Misconceptions or Pitfalls
Point out things learners often get wrong or confuse, and clarify them.

## Key Takeaways
A bullet list summarizing the most essential points from the entire guide.

Formatting rules:
- Use ## and ### Markdown headings exactly as structured above
- Use bullet points/numbered lists for anything list-like
- Use LaTeX for all math as described above
- Use **bold** for key terms on first mention
- Do NOT repeat or reference the specific quiz questions/options — this must stand alone as general study material
- Do NOT pad with filler or repeat the same point in different words — every paragraph should add new information`
    : `
Set the "note" field to an empty string "". Save tokens, no study guide needed.`;

  const notePlaceholder = isLesson
    ? `"The full long-form Markdown study guide described above, as a single JSON string with \\n for line breaks"`
    : `""`;

  const prompt = `
Create a multiple-choice quiz on the topic: ${topic}.

Requirements:
- Number of questions: ${questionCount}
- Each question must have 4 options
- Only one correct answer per question
- A breif and short one sentence explanation for the correct answer and whi it is correct according to the question
- Make questions clear, educational, and exam-ready
- Difficulty: ${difficulty || "medium"}
- Quiz format: ${quizTypeValue}
${noteInstructions}

Return ONLY valid JSON in this exact structure, with no extra commentary:

{
  "title": "title",
  "name": "title",
  "desc": "A short description",
  "quizType": "${quizTypeValue}",
  "imgKeyword": "a short keyword representing the topic icon",
  "queue": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct answer",
      "explanation" : "A brief explanation on the answer",
    }
  ],
  "note": ${notePlaceholder}
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
        max_tokens: 8000,
      }),
    });

    const data = await groqRes.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return res.status(502).json({
        error: "AI failed",
        details: data.error?.message,
      });
    }

    const responseText = data.choices?.[0]?.message?.content || "";
    const parsed = extractJson(responseText);

    const aiQuiz = normalizeQuiz(parsed, topic, quizTypeValue);

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