import ReactDOM from "react-dom/client";
import React from 'react';
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import SingUpPage from "./pages/singUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import './index.css';



import HomePage from "./pages/HomePage";
import store from "./pages/Store";
import PostinfoPage from "./pages/PostinfoPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/signup",
        element: <SingUpPage />
      },
      {
        index:true,
        element: <HomePage />
      },
      {
        path:"/post/:id",
        element: <PostinfoPage />
      },
      {
        path:"/login",
        element: <LoginPage />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
