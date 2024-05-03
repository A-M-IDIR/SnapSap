import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Auth from "@/PAGES/Auth";
import Home from "@/PAGES/Home";
import Project from "@/PAGES/Project";

import WithAlert from "@/RESOURCES/HOCS/WithAlert";
import WithAuth from "@/RESOURCES/HOCS/WithAuth";
import WithMobileWarning from "@/RESOURCES/HOCS/WithMobileWarning";
import store from "@/CONTEXT/store";

import "./style.scss";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<Auth />} />

          <Route path="/home" element={<Home />} />

          <Route path="/project" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <WithAlert>
          <WithMobileWarning>
            <WithAuth>
              <App />
            </WithAuth>
          </WithMobileWarning>
        </WithAlert>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
