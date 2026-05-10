import "./App.css";
import { Routes, Route } from "react-router-dom";

import IntroSection from "./pages/IntroSection";
import Login from "./pages/Login";
import TrendingSection from "./pages/TrendingSection";
import Search from "./pages/Search";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroSection />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <TrendingSection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;