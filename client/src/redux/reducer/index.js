
const initialState = {
  allGames: [],
  games: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_GAMES':
      return {
        ...state,
        allGames: action.payload,
      };
    
    default:
      return { ...state };
  }
}