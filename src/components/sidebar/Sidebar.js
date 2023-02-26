import React from "react";
import styles from "./sidebar.module.css";

class Sidebar extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  noteElements = () => {
    let noteElements = this.props.notes.map((note, index) => {
      return (
        <div key={note.id}>
          <div
            className={`${styles.title} ${
              note.id === this.props.currentNoteId ? styles.selectedNote : ""
            }`}
            onClick={() => this.props.setCurrentNoteId(note.id)}
          >
            <h4 className="text-snippet">Note {index + 1}</h4>
          </div>
        </div>
      );
    });
    return noteElements;
  };

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.sidebarHeader}>
          <h3>Notes</h3>
          <button className="new-note" onClick={this.props.newNote}>
            +
          </button>
        </div>
        {this.noteElements()}
      </section>
    );
  }
}

export default Sidebar;
