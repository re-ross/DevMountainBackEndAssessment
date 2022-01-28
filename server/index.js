const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = [
    "Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});
app.get("/api/fortune", (req, res) => {
  const fortunes = [
    "A lifetime friend shall soon be made.",
    "A light heart carries you through all the hard times.",
    "A soft voice may be awfully persuasive.",
    "Advice, when most needed, is least heeded.",
    "All the effort you are making will ultimately pay off.",
  ];
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
});

app.get("/api/quotes", (req, res) => {
  const quotes = [
    `I don't walk away from things I think are unfinished. - Arnold Schwarzenegger`,
    "The mind is everything. What you think you become. - Buddha",
    `Life shrinks or expands in proportion to one's courage. - Anais Nin`,
    `It is never too late to be what you might have been. - George Eliot`,
  ];
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  res.status(200).send(randomQuote);
});

app.listen(4000, () => console.log("Server running on 4000"));
