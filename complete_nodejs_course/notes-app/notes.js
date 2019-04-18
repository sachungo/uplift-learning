const fs = require('fs');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
  const notes = loadNotes();
  const isDuplicateTitle = checkNoteExist(notes, title);

  if (isDuplicateTitle) {
    console.log('A note with that title already exists!');
    return;
  };

  notes.push({
    title,
    body
  });
  saveNotes(notes);
};

const checkNoteExist = (notes, title) => {
  const noteExist = notes.filter(note => note.title === title);
  return !!noteExist.length;
};

const saveNotes = (notes = []) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync('notes.json');
    return JSON.parse(buffer.toString());
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes,
  addNote
};

/**
 * EXTRA INFO
 *
 * const name = 'Stacey';
 *
 * const add = (x, y) => (x + y);
 *
 * exports.name = name; // OR  module.exports = name;
 * exports.add = add; // OR module.exports = add;
 *
 * THEN
 * const { name, add } = require('./myfile);
 */
