import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import Submissions from './components/Submissions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </Router>
  );
}

export default App;

