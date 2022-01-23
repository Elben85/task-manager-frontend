import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Tasks from "./pages/Tasks";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AddTask from "./pages/AddTask";
import UserContextProvider from "./components/UserContext";
import EditTask from "./pages/EditTask";
import SignOut from "./pages/SignOut";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routing />
      </UserContextProvider>
    </BrowserRouter>
  );
}

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/LogIn" element={<LogIn />} />
      <Route exact path="/SignUp" element={<SignUp />} />
      <Route exact path="/Tasks" element={<Tasks />} />
      <Route exact path="/AddTask" element={<AddTask />} />
      <Route exact path="/EditTask" element={<EditTask />} />
      <Route exact path="/SignOut" element={<SignOut />} />
    </Routes>
  );
}

export default App;
