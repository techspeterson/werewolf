import React from 'react';
import Game from "./Game";
import styles from "./App.module.css";

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <h1 className={styles.header}>Werewolf Moderator</h1>
        <Game />
      </div>
    );
  }
}

export default App;
