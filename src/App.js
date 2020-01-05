import React from 'react';
import Game from "./Game";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    message: null
  }

  gameOverMessage = (message) => {
    this.setState({ message });
  }

  renderGameOverMessage = () => {
    const { message } = this.state;
    if (message) {
      return <h2 className={styles.gameOver}>{message}</h2>
    }
  }

  render() {
    return (
      <div className={styles.App}>
        <h1 className={styles.header}>Werewolf Moderator</h1>
        {this.renderGameOverMessage()}
        <Game gameOverMessage={this.gameOverMessage} />
      </div>
    );
  }
}

export default App;
