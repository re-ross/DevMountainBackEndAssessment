const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const quotes = [
  `I don't walk away from things I think are unfinished. - Arnold Schwarzenegger`,
  "The mind is everything. What you think you become. - Buddha",
  `Life shrinks or expands in proportion to one's courage. - Anais Nin`,
  `It is never too late to be what you might have been. - George Eliot`,
  `Too many of us are not living our dreams because we are living our fears. - Les Brown`,
  `I didn't fail the test. I just found 100 ways to do it wrong. - Benjamin Franklin`,
  `The two most important days in your life are the day you are born and the day you find out why. - Mark Twain`,
  `You miss 100% of the shots you don't take. -Wayne Gretzky - Michael Scott`,
];

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
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  res.status(200).send(randomQuote);
});

//

let members = [
  {
    id: 0,
    firstName: "Ryan",
    lastName: "Ross",
    gender: "male",
    age: 32,
    likes: ["Korean Food", "James Bond Movies", "coding"],
  },
  {
    id: 1,
    firstName: "Eric",
    lastName: "Sellors",
    gender: "male",
    age: 21,
    likes: ["pizza", "coding", "teaching"],
  },
  {
    id: 2,
    firstName: "DJ",
    lastName: "Tiwari",
    gender: "male",
    age: 21,
    likes: ["anime", "coding", "basketball"],
  },
  {
    id: 3,
    firstName: "Lucas",
    lastName: "Nogueira",
    gender: "male",
    age: 26,
    likes: ["topochico", "Meatloaf", "sarcasm"],
  },
  {
    id: 4,
    firstName: "Ben",
    lastName: "Bertagnole",
    gender: "male",
    age: 28,
    likes: ["energy drinks", "coding", "anime"],
  },
];
app.get("/api/members", (req, res) => {
  console.log("hit members", members);
  res.status(200).send(members);
});

app.get("/member/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = members.find((mem) => mem.id == id); // finds one object from list.
  console.log("result from memberId server", result);
  return res.status(200).send(result); // returns 200 + member object it found;
});

let id = 5;

app.post("/member", (req, res) => {
  let newMember = { ...req.body, id };
  newMember.likes = newMember.likes.slice(0, 3);
  members.push(newMember);
  res.status(200).send(members);
  id++;
});

app.delete("/member/:id", (req, res) => {
  const memberId = +req.params.id;
  console.log("id");

  const trgtInd = members.findIndex((member) => {
    return member.id === memberId;
  });
  members.splice(trgtInd, 1);

  res.status(200).send(JSON.stringify({ success: true }));
});

app.put("/members/:id", (req, res) => {
  const { newname, currentname } = req.body;
  console.log(newname, currentname);
  let targetName = currentname;
  console.log(targetName);
  for (let i = 0; i < members.length; i++) {
    if (members[i].firstName === targetName) {
      members[i].firstName = newname;
    }
  }
  res.status(200).send(members[i]);
});

app.listen(4000, () => console.log("Server running on port 4000"));
