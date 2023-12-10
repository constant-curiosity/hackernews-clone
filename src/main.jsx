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
      post: (result, args, cache) => {
        cache.updateQuery(
          {
            query: FEED_QUERY,
            variables: { skip: 0, take: 10, orderBy: { createdAt: "desc" } },
          },
          (data) => {
            if (!data || !data.feed) {
              return data;
            }
            const newLink = result.post;
            let updatedLinks = [newLink, ...data.feed.links];
            if (updatedLinks.length > 10) {
              updatedLinks = updatedLinks.slice(0, 10);
            }
            return {
              ...data,
              feed: { ...data.feed, links: updatedLinks },
            };
          }
        );
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

//Even though "args" isn't being used without it an error will be thrown.
//Even though you might not be using args directly in your function,
//urql or other internal mechanisms might rely on the function signature being a certain way.
//Changing the number of parameters could disrupt this.
