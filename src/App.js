import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

import Nav from "./pages/Comp/Nav";
import Footer from "./pages/Comp/Footer";
import CreateVote from "./pages/CreateVote";
import VotePage from "./pages/VotePage";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase";
import { useRecoilState } from "recoil";

import { userState } from "./Atom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="App bg-black">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateVote />} />
        <Route path="/Vote" element={<VotePage />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
