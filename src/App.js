import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import MovieDetails from "./Components/MovieDetails/MovieDetails";



function App() {


  let [userData,setUserData] = useState()
  function saveUserData()
  {
    let encodedData = localStorage.getItem('userToken')
    let decodedData = jwtDecode(encodedData)
    setUserData(decodedData) 
  }

  let routes = createBrowserRouter([
    {
      path: "", element: <Layout userData={userData} setUserData={setUserData} />,children:
      [
        { index: true, element:  <ProtectedRoute><Home /></ProtectedRoute>},
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        { path: "Register", element: <Register /> },
        { path: "Movie/:id", element: <ProtectedRoute><MovieDetails /></ProtectedRoute> },
      ],
    },
  ]);
  return <>
  <RouterProvider router={routes}></RouterProvider>
  <Toaster />
  </>

}

export default App;
