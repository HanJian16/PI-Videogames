
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
        games: action.payload
      };
    case 'FILTER_BY_GENRE':
      const allGames = state.allGames;
      const statusFilter = action.payload === 'All' ? allGames : allGames.filter(game => game.genres?.some(genre => genre.name === action.payload))
      return {
        ...state,
        games: statusFilter
      }
    case 'FILTER_BY_ORIGIN':
      const allGames2 = state.allGames;
      const statusFilter2 = action.payload === 'Created' ? allGames2.filter(game => game.description) : allGames2.filter(game => !game.description)
      return {
        ...state,
        games: action.payload === 'All' ? allGames2 : statusFilter2
      }
    case 'ORDER_BY_NAME':
      const sortedArr = action.payload === 'Asc' ?
        state.games.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        }) : state.games.sort(function (a, b) {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        })
      return {
        ...state,
        games: sortedArr
      }
    case 'ORDER_BY_ALF_OR_RATING':
      const sortedArr2 = action.payload === 'Asc' ?
        state.games.sort(function (a, b) {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0
        }) : state.games.sort(function (a, b) {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0
        })
      return {
        ...state,
        games: sortedArr2
      }
    case 'GET_NAME_CHARACTERS':
      return {
        ...state,
        games: action.payload
      }
    case "POST_GAME":
      return {
        ...state
      }
    case "GET_GENRES":
      console.log(action)
      return {
        ...state,
        genres: action.payload
      }
    default:
      return { ...state };
  }
}