import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./app/layout/styles.css";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { StoreContext, store } from "./app/stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
