import React from 'react';
import Game from "./Game";
import styles from "./App.module.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

class App extends React.Component {
  store = createStore(reducer);

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
      <Provider store={this.store}>
        <div className={styles.App}>
          <h1 className={styles.header}>Werewolf Moderator</h1>
          {this.renderGameOverMessage()}
          <Game gameOverMessage={this.gameOverMessage} />
          {/* <button onClick={this.resetGame}>Reset</button> */}
          <footer>&copy; Tessa Peterson 2020</footer>
        </div>
      </Provider>

    );
  }
}

export default App;
