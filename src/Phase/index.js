import React from "react";
import { connect } from "react-redux";
import styles from '../Game.module.css';
import DayPhase from "./DayPhase";
import NightPhase from "./NightPhase";

function mapStateToProps(state) {
  return {
    isDay: state.isDay,
    dayCount: state.dayCount,
    alert: state.alert
  };
}

class Phase extends React.Component {
  renderDayOrNight = () => {
    const { isDay } = this.props;

    if (isDay) {
      return <DayPhase endPhase={this.props.endDayPhase} />
    }
    else {
      return <NightPhase endPhase={this.props.endNightPhase} />
    }
  }

  renderAlert = () => {
    if (this.props.dayCount > 1) {
      let alertList = [];
      const { alert } = this.props;

      if (alert.deadPlayers.length > 0) {
        alert.deadPlayers.forEach((player) => {
          alertList.push(<li key={player}>{player} has died.</li>);
        });
      }
      else {
        alertList.push(<li key="noDeath">No one has died.</li>);
      }

      if (alert.silenced) {
        alertList.push(<li key={alert.silenced}>{alert.silenced} has been silenced.</li>);
      }

      return (
        <ul className={styles.alert}>
          {alertList}
        </ul>
      );
    }
  }

  render() {
    const { isDay, dayCount } = this.props;
    return (
      <div>
        <h2 className={styles.header}>{isDay ? "Day" : "Night"} {dayCount}</h2>
        {this.renderAlert()}
        {this.renderDayOrNight()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Phase);