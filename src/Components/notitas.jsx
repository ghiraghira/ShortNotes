import React, { useState, useEffect } from 'react';
import './notitas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

const Notitas = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    document.title = 'Notes';
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    } else {
      localStorage.removeItem('notes');
    }
  }, [notes]);

  const addNote = () => {
    setNotes([...notes, '']);
  };

  const updateNote = (index, newText) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? newText : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div id="main">
      <button id="addButton" onClick={addNote}><FontAwesomeIcon icon={faSquarePlus} /> Add a note</button>
      {notes.map((note, index) => (
        <div key={index} className="note">
          <div className="tool">
          <p className='addNoteButton' onClick={addNote}><FontAwesomeIcon icon={faSquarePlus} /></p>
            <p className="trash" onClick={() => deleteNote(index)}><FontAwesomeIcon icon={faSquareXmark} /></p>
          </div>
          <textarea
            value={note}
            onChange={(e) => updateNote(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Notitas;


