import React from "react";
import styles from "./sidebar.module.css";
import trashIcon from "../assets/images/trash.png";
import whiteTrash from "../assets/images/whiteTrash.png";

class Sidebar extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  noteElements = () => {
    let noteElements = this.props.notes.map((note) => {
      return (
        <div key={note.id}>
          <div
            className={`${styles.title} ${
              note.id === this.props.currentNoteId ? styles.selectedNote : ""
            }`}
            onClick={() => this.props.setCurrentNoteId(note.id)}
          >
            <h4 className={styles.textSnippet}>{note.body.split("\n")[0]}</h4>
            {note.id === this.props.currentNoteId ? (
              <button
                className={styles.titleDelete}
                onClick={(event) => this.props.deleteNote(event, note.id)}
              >
                <img src={trashIcon} className="gg-trash trash-icon" alt="trash"/>
              </button>
            ) : (
              <button
                className={styles.titleDelete}
                onClick={(event) => this.props.deleteNote(event, note.id)}
              >
                <img src={whiteTrash} className="gg-trash trash-icon" alt="trash"/>
              </button>
            )}
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
