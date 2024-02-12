import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "@/PAGES/Auth";
import Home from "@/PAGES/Home";

import "./style.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
