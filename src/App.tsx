import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Revival from './components/Revival';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#000001' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/revival" element={<Revival />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;