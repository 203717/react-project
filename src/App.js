import './App.css';
import Login from "./Login";
import Register from "./Register";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Profile from "./Profile";



import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div>
    <Router>

    <Routes>
      <Route  exact path="/" element={<Login/>} ></Route>
      <Route  exact path="/login" element={<Login/>} ></Route>
      <Route  exact path="/register" element={<Register/>} ></Route>
      <Route  exact path="/profile" element={<Profile/>} ></Route>
    </Routes>

  </Router>
  </div>
  );
}

export default App;