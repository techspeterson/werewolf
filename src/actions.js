const UPDATE_PLAYERS = "UPDATE_PLAYERS";
const FINALISE_PLAYERS = "FINALISE_PLAYERS";
const FINALISE_ROLES = "FINALISE_ROLES";
const INCREMENT_DAY_COUNT = "INCREMENT_DAY_COUNT";
const TOGGLE_PHASE = "TOGGLE_PHASE";
const SET_ALERT = "SET_ALERT";

function updatePlayerAction(players) {
  return { type: UPDATE_PLAYERS, players };
}

function finalisePlayersAction() {
  return { type: FINALISE_PLAYERS };
}

function finaliseRolesAction() {
  return { type: FINALISE_ROLES };
}

function incrementDayAction() {
  return { type: INCREMENT_DAY_COUNT };
}

function togglePhaseAction() {
  return { type: TOGGLE_PHASE };
}

function setAlertAction(alert) {
  return { type: SET_ALERT, alert }
}

export { UPDATE_PLAYERS, FINALISE_PLAYERS, FINALISE_ROLES, INCREMENT_DAY_COUNT, TOGGLE_PHASE, SET_ALERT };
export { updatePlayerAction, finalisePlayersAction, finaliseRolesAction, incrementDayAction, togglePhaseAction, setAlertAction };