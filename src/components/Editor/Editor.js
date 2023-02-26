import React from "react";
import styles from "./editor.module.css";

class Editor extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className={styles.container}>
        <header>
          <span>H</span>
          <span>B</span>
          <span>I</span>
          <select>
            <option>Select font</option>
            <option>Open sans</option>
            <option>Arial</option>
            <option>Pops</option>
          </select>
        </header>
        <textarea
          type="text"
          value={this.props.currentNote.body}
          onChange={(e) => this.props.updateNote(e.target.value)}
        ></textarea>
      </div>
    );
  }
}

export default Editor;
