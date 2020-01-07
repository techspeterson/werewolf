const UPDATE_PLAYERS = "UPDATE_PLAYERS";
const FINALISE_PLAYERS = "FINALISE_PLAYERS";
const FINALISE_ROLES = "FINALISE_ROLES";
const INCREMENT_DAY_COUNT = "INCREMENT_DAY_COUNT";

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

export { UPDATE_PLAYERS, FINALISE_PLAYERS, FINALISE_ROLES, INCREMENT_DAY_COUNT };
export { updatePlayerAction, finalisePlayersAction, finaliseRolesAction, incrementDayAction };