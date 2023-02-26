import "./App.css";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Editor from "./components/Editor/Editor";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.state.currentNoteId = this.state.notes[0]?.id || "";
    // console.log(this.state);
    // console.log('In App constructor')
  }

  createNewNote = () => {
    const newNote = {
      // id: nanoid(),
      id: this.state.notes.length+1,
      body: "# Type your markdown note's title here",
    };
    this.setState((prevState) => {
      return {
        notes: [newNote, ...prevState.notes],
        currentNoteId: newNote.id,
      };
    });
  }


  //update note
  updateNote= (text) =>  {
    let updatedNotes = this.state.notes.map((oldNote) => {
      return oldNote.id === this.state.currentNoteId
        ? { ...oldNote, body: text }
        : oldNote;
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        notes: updatedNotes,
      };
    });
  }

  //Find current note

  findCurrentNote = () => {
    return (
      this.state.notes.find((note) => {
        return note.id === this.state.currentNoteId;
      }) || this.state.notes[0]
    );
  }

  setCurrentNoteId = (newId) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentNoteId: newId,
      };
    });
  }


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

