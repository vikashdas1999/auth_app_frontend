import './App.css'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from "./Header"
import AddQuiz from './component/AddQuiz';
import GetQuiz from './component/GetQuiz';
import Share from './Share';
import Result from './component/Result';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add",
        element: <PrivateRoute>
          <AddQuiz />
        </PrivateRoute>,
      },
      {
        path: "/play-quiz/:id",
        element:<GetQuiz />,
      },
      {
        path: "/share/:id",
        element:<Share />,
      },
      {
        path: "/result/:id",
        element:<Result />,
      }
    ],
  },
]);



function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
