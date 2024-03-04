import './App.css';
import Signup from './components/Signup';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '',
          element: <p>Home</p>,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'login',
          element: <p>Login Page</p>,
        }
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
