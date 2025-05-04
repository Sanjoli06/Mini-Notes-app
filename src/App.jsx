import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotesDashboard from './NotesDashboard';
import About from './About';

const App = () => {
  return (
    <div>
      <nav style={{
        padding: '16px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<NotesDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
