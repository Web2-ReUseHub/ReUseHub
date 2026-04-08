/*
import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSection from "./pages/IntroSection";
import Login from "./pages/Login";
import TrendingSection from "./pages/TrendingSection"; 
import Search from "./pages/Search";
import AboutWebsite from "./pages/AboutWebsite";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trending" element={<TrendingSection />} />
         <Route path="/search" element={<Search />} />
          <Route path="/about" element={<AboutWebsite />} />
      </Routes>

    </>
  );
}export default App;
*/
import CreateListing from "./components/CreatePost";

function App() {
  return <CreateListing />;
}

export default App;