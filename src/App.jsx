import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from "./Header"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    // loader: rootLoader,
    children: [
      {
        index:true,
        element: <Login />,
      },
      {
        path:"/signup",
        element: <Signup />,
      },
      {
        path:"/Home",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
