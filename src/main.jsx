import "./styles/index.css";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Client, fetchExchange, Provider } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./routes/PublicRoutes";
import React from "react";
import ReactDOM from "react-dom/client";
import FEED_QUERY from "./graphql/query/feedList";

const router = createBrowserRouter([...publicRoutes]);

const cache = cacheExchange({
  updates: {
    Mutation: {
      post: (result, args, cache, info) => {
        cache.updateQuery({ query: FEED_QUERY }, (data) => {
          return {
            ...data,
            feed: { ...data.feed, links: [result.post, ...data.feed.links] },
          };
        });
      },
    },
  },
});

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cache, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
