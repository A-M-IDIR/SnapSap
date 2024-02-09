import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "./style.scss";

const App = () => {
  React.useEffect(() => {}, []);

  return <div className="App">SNAP-SAP</div>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
