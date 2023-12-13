import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { Reset } from "styled-reset";
import "./main.css";
// import "./App.css";
import "./assets/fonts/font.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Reset />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
