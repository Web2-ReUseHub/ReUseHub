import logo from './logo.svg';
import './App.css';
import Login from './user_manegment/Login';
import IntroSection from './components/IntroSection';
import ProfilePage from './pages/profile/ProfilePage';
import Navbar from './components/Nav';


function App() {
  return (
    <>
      <Navbar />
      <ProfilePage />;

    </>
  )
}

export default App;
