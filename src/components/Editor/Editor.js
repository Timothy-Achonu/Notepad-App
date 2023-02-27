import React from "react";
import styles from "./editor.module.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.myObj = {
      mine: (localStorage.getItem("styles")) || {} 
    }
    this.state = localStorage.getItem("styles") ? JSON.parse(localStorage.getItem("styles"))
     : {
      italics: false,
      bold: false,
      fontSize: 1,
      fontFamily: "'Karla', sans-serif"
    };
  }
  toggleItalics = () => {
    this.setState((prev) => {
      return {
        ...prev,
        italics: !this.state.italics,
      };
    });
  };
  toggleBold = () => {
    this.setState((prev) => {
      return {
        ...prev,
        bold: !this.state.bold,
      };
    });
  };
  increaseFontSize = () => {
    this.setState((prev) => {
      return {
        ...prev,
        fontSize: (Number(this.state.fontSize) + 0.1).toFixed(1),
      };
    });
  }
  decreaseFontSize = () => {
    this.setState((prev) => {
      return {
        ...prev,
        fontSize: (Number(this.state.fontSize) - 0.1).toFixed(1),
      };
    });
  }
  changeFontFamily = (e) => {
     let fontFamilystyle = ''
     if(e.target.value === 'Courier') {
      console.log('In courier')
      fontFamilystyle = "'Courier New', Courier, monospace"
     }
     else if(e.target.value === 'Arial') {
      fontFamilystyle = " Arial, Helvetica, sans-serif "
     }
     else if(e.target.value === 'Verdana') {
      fontFamilystyle = " Verdana, Geneva, Tahoma, sans-serif"
     }
     else {
      fontFamilystyle = " 'Karla', sans-serif "
     }
     this.setState((prev) => {
      return {
        ...prev,
        fontFamily: fontFamilystyle,
      };
    });
  }
  styles = () => {
    let fontSizeStyle = this.state.fontSize+'rem'
    let fontWeightStyle = this.state.bold ? 'bold' : '100'
    let fontFamilyStyle = this.state.fontFamily
    return {
      fontSize: fontSizeStyle,
      fontWeight: fontWeightStyle,
      fontFamily : fontFamilyStyle
    }
  }
  componentDidUpdate() {
    localStorage.setItem("styles", JSON.stringify(this.state));
  }
  render() {
    return (
      <div className={styles.container}>
        <header>
          <div className={styles.fontSize}>
             <span onClick={this.decreaseFontSize}>-</span>
             <span> {this.state.fontSize} </span>
             <span onClick={this.increaseFontSize}>+</span>
          </div>
          <div 
           className={`${this.state.bold ? styles.active : ""}`}
          onClick={this.toggleBold}>B</div>
          <div
            className={`${this.state.italics ? styles.active : ""} ${
              styles.italics
            }`}
            onClick={this.toggleItalics}
          >
            I
          </div>
          <select onChange={this.changeFontFamily}>
            <option>Select font</option>
            <option>Courier</option>
            <option>Arial</option>
            <option>Verdana</option>
          </select>
        </header>
        <textarea
        style={this.styles()}
          className={`${this.state.italics ? styles.italics : ""}`}
          type="text"
          value={this.props.currentNote.body}
          onChange={(e) => this.props.updateNote(e.target.value)}
        >
        </textarea>
      </div>
    );
  }
}

export default Editor;
