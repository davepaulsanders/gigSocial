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
import { NothingHere } from "./pages/NothingHere/NothingHere";
import { Browse } from "./pages/Browse/Browse";
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
            <Route path="/" component={<LandingPage />} />
            <Route path="/genius" component={<Genius />} />
            <Route path="/setlists" component={<Profile />} />
            <Route path="/setlists/:id" component={<SetlistView />} />
            <Route path="/browse" component={<Browse />} />
            <Route path="*" component={<NothingHere />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
