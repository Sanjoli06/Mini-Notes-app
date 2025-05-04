import React from 'react';

const About = () => (
  <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
    <h1 style={{ marginBottom: '16px' }}>About</h1>
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      This is a simple notes app built with React and Firebase Realtime Database.
      You can add, view, and delete notes. The app also includes basic navigation and demonstrates how to manage state and perform CRUD operations in a React application.
    </p>
  </div>
);

export default About;
