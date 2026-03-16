import logo from './logo.svg';
import './App.css';
import Login from './user_manegment/Login';
import IntroSection from './component/IntroSection';
import ProfilePage from './user_manegment/ProfilePage';

function App() {
  return (
    <>
    <IntroSection></IntroSection>
    <ProfilePage></ProfilePage>
    <Login></Login>
    </>
  )
}

export default App;
