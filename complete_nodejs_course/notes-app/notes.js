const fs = require('fs');

const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
  const notes = loadNotes();
  const isDuplicateTitle = checkNoteExist(notes, title);

  if (isDuplicateTitle) {
    // console.log(chalk.rgb(0, 0, 0).bgRed('A note with that title already exists!'));
    console.log(chalk.red.inverse('A note with that title already exists!'));
    return;
  };

  notes.push({
    title,
    body
  });
  saveNotes(notes);
  // console.log(chalk.rgb(0, 0, 0).bgGreen('Note saved!'));
  console.log(chalk.green.inverse('Note saved!'));
};

const removeNote = title => {
  const notes = loadNotes();
  const remainingNotes = notes.filter(note => note.title !== title);
  if (remainingNotes.length !== notes.length) {
    saveNotes(remainingNotes);
    console.log(chalk.rgb(0, 0, 0).bgGreen('Note removed!'))
  } else {
    console.log(chalk.rgb(0, 0, 0).bgRed('No note found!'));
  }
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
  addNote,
  removeNote
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
