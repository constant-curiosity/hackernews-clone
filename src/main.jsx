import "./styles/index.css";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Client, fetchExchange, Provider } from "urql";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom/client";

const cache = cacheExchange({});
const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cache, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./components/App";
// import "./styles/index.css";
// import {
//   ApolloProvider,
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
// } from "@apollo/client";

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000",
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>
// );
