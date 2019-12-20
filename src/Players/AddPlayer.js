import React from "react";

class AddPlayer extends React.Component {
  state = {
    name: null
  }

  updateName = (e) => {
    this.setState({ name: e.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.addPlayer(this.state.name);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input placeholder="Player name" onChange={this.updateName} />
        <input type="submit" value="Add Player" />
      </form>
    );
  }
}

export default AddPlayer;