import React, { useState, useEffect } from 'react';
import './notitas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

const Notitas = () => {
  // Estado para almacenar las notas
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    document.title = 'Notes';
  }, []);

  // Cargar notas del localStorage al iniciar
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Guardar notas en el localStorage cuando cambie el estado
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    } else {
      localStorage.removeItem('notes');
    }
  }, [notes]);

  // Agregar una nueva nota
  const addNote = () => {
    setNotes([...notes, '']);
  };

  // Actualizar el contenido de una nota
  const updateNote = (index, newText) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? newText : note
    );
    setNotes(updatedNotes);
  };

  // Eliminar una nota
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


