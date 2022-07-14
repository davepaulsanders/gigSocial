import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import LandingPage from "./pages/LandingPage.js";

//link to graphql server
const httpLink = createHttpLink({
  uri: "/graphql",
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// setting up apollo client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <LandingPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
