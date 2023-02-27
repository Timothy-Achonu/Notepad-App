import "./App.css";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Editor from "./components/Editor/Editor";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("notes")) || [],
    };
    this.state.currentNoteId = this.state.notes[0]?.id || "";
    // console.log(this.state);
    // console.log('In App constructor')
  }

  componentDidUpdate() {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  }

  createNewNote = () => {
    const newNote = {
      // id: nanoid(),
      id: this.state.notes.length + 1,
      body: "# Type your note's title here",
    };
    this.setState((prevState) => {
      return {
        notes: [newNote, ...prevState.notes],
        currentNoteId: newNote.id,
      };
    });
  };

  /*
  instead passing this.state to change the font family
  pass a function that sets the state.
  */

  //update note
  updateNote = (text) => {
    let updatedNotes = [];
    let oldNotes = this.state.notes;
    let currentNoteId = this.state.currentNoteId;
    for (let i = 0; i < oldNotes.length; i++) {
      const oldNote = oldNotes[i];
      if (oldNote.id === currentNoteId) {
        updatedNotes.unshift({ ...oldNote, body: text });
      } else {
        updatedNotes.push(oldNote);
      }
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        notes: updatedNotes,
      };
    });
  };

  deleteNote = (event, noteId) => {
    event.stopPropagation();
    console.log("deleted note", noteId);
    //setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    let newNotes = this.state.notes.filter((note) => (
      note.id !== noteId
    ));
    console.log(newNotes);
    this.setState((prevState) => {
      return {
        ...prevState,
        notes: newNotes,
      };
    });
  };

  //Find current note

  findCurrentNote = () => {
    return (
      this.state.notes.find((note) => {
        return note.id === this.state.currentNoteId;
      }) || this.state.notes[0]
    );
  };

  setCurrentNoteId = (newId) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentNoteId: newId,
      };
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.notes.length > 0 ? (
          <div className="notes">
            <Sidebar
              notes={this.state.notes}
              currentNote={this.findCurrentNote()}
              currentNoteId={this.state.currentNoteId}
              setCurrentNoteId={this.setCurrentNoteId}
              newNote={this.createNewNote}
              deleteNote={this.deleteNote}
            />
            <Editor
              currentNote={this.findCurrentNote()}
              updateNote={this.updateNote}
            />
          </div>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={this.createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
