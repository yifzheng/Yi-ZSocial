import { useContext } from "react"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import EditProfile from "./pages/editProfile/EditProfile"
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import EditPicture from "./pages/editPicture/EditPicture"

function App () {
  const { user } = useContext( AuthContext )
  return (
    <Router>
      <Routes>
        <Route index path="/" element={ user ? <Home /> : <Navigate to={ "/login" } /> } />
        <Route path="/login" element={ user ? <Navigate to={ "/" } /> : <Login /> } />
        <Route path="/register" element={ user ? <Navigate to={ "/" } /> : <Register /> } />
        <Route path="/profile/:userName" element={ user ? <Profile /> : <Login /> } />
        <Route path="/edit_profile" element={ user ? <EditProfile /> : <Login /> } />
        <Route path="/edit_picture" element={ user ? <EditPicture /> : <Login /> } />
      </Routes>
    </Router>
  )
}

export default App
