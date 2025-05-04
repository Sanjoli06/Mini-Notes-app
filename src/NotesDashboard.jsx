import React, { useState, useEffect, useRef } from 'react';

const NotesDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch('https://notes-c0115-default-rtdb.firebaseio.com/notes.json');
      const data = await response.json();
      if (data) {
        const notesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setNotes(notesArray);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (!title || !content) return;

    const newNote = { title, content, timestamp: Date.now() };
    try {
      await fetch('https://notes-c0115-default-rtdb.firebaseio.com/notes.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`https://notes-c0115-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'DELETE',
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    titleRef.current?.focus();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '16px' }}>Notes Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          ref={titleRef}
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={addNote}
          style={{
            padding: '10px',
            backgroundColor: 'teal',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Note
        </button>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 'bold', margin: '0 0 4px' }}>{note.title}</p>
                  <p style={{ margin: '0 0 4px' }}>{note.content}</p>
                  <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                  aria-label="Delete note"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesDashboard;
