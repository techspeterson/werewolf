import { UPDATE_PLAYERS, FINALISE_PLAYERS, FINALISE_ROLES, INCREMENT_DAY_COUNT } from "./actions"

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
    default:
      break;
  }

  return newState;
}