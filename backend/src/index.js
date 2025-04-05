import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, title: "a joke", content: "This is a joke" },
    { id: 2, title: "Another joke", content: "This is another joke" },
    { id: 3, title: "third joke", content: "This is third joke" },
    { id: 4, title: "forth joke", content: "This is forth joke" },
    { id: 5, title: "fifth joke", content: "This is fifth joke" },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
