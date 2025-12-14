import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import SemesterSelector from "./components/SemesterSelector";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import About from "./components/AboutUs";
import AddMaterials from "./components/AddMaterials";
import GetMaterials from "./components/GetMaterials";
import Chat from "./components/Chat";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <SemesterSelector /> : <Navigate to="/signup" />}
          />
          <Route
            path="/addnotes"
            element={authUser ? <AddMaterials/> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/getmaterials" element={<GetMaterials/>}/>
          <Route path="/chat" element={<Chat/>}/>
          
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
