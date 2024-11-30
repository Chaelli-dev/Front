import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* <a href="/">Main</a> | <a href="/login">Login</a> | <a href="/detail">Detail</a> |  <a href="/mypage">Mypage</a> */}
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
