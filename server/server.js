const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./config/connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log("Database connected pre Graphql");
  });
});
