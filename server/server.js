// express set up
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
// mongoDB connection
const db = require("./config/connection");
// Apollo set up
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// express set up
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if in production environment, server static files from build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Express serve up index.html file if it doesn't recognize route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// function to start server, connect it to express
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
