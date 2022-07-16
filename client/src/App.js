import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage.js";
import { Genius } from "./pages/Genius/Genius";
import { Profile } from "./pages/Profile/Profile";
import { SetlistView } from "./pages/SetlistView/SetlistView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//link to graphql server
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// setting up apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/genius" element={<Genius />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setlists/:id" element={<SetlistView />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
