
import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSection from "./pages/IntroSection";
import Login from "./pages/Login";
import TrendingSection from "./pages/TrendingSection"; 
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trending" element={<TrendingSection />} />
         <Route path="/search" element={<Search />} />
      </Routes>

    </>
  );
}export default App;