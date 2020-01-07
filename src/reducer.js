import { UPDATE_PLAYERS, FINALISE_PLAYERS, FINALISE_ROLES, INCREMENT_DAY_COUNT, TOGGLE_PHASE, SET_ALERT } from "./actions"

const initialState = {
  message: null,
  players: [],
  playersFinalised: false,
  rolesFinalised: false,
  dayCount: 0,
  isDay: true,
  alert: {
    deadPlayers: [],
    silenced: null
  }
};

export default function reducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case UPDATE_PLAYERS:
      newState.players = action.players;
      break;
    case FINALISE_PLAYERS:
      newState.playersFinalised = true;
      break;
    case FINALISE_ROLES:
      newState.rolesFinalised = true;
      break;
    case INCREMENT_DAY_COUNT:
      newState.dayCount++;
      break;
    case TOGGLE_PHASE:
      newState.isDay = !newState.isDay;
      break;
    case SET_ALERT:
      newState.alert = action.alert;
      break;
    default:
      break;
  }

  return newState;
}