const express = require("express");
const router = express.Router();
const quizy = require('../quiz.json');
const {quizes} = require('../data')

const quiz = {
  title: "Example 1",
  id: 134,
  queue: [
    {
      question: "Which particle carries a negative electric charge?",
      options: ["Proton", "Electron", "Neutron", "Photon"],
      answer: "Electron",
      topic: "Electric Charges",
    },
    {
      question: "Like charges ______ each other.",
      options: ["Attract", "Repel", "Destroy", "Ignore"],
      answer: "Repel",
      topic: "Electric Charges",
    },
    {
      question: "Unlike charges ______ each other.",
      options: ["Repel", "Attract", "Neutralize", "Separate"],
      answer: "Attract",
      topic: "Electric Charges",
    },
  ],
};

router.get("/", (req, res) => {
  res.json(quizes);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const data = quizes.find((item) => String(item.id) === String(id));

  if (!data) {
    return res.status(404).json({ title: "", id: null, queue: [] });
  }

  return res.json(data);
});
module.exports = router;