import axios from "axios";

export function getGames() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_GAMES',
            payload: json.data
        })
    }
}

export function filterGamesByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload: payload
    }
}

export function filterGamesByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload: payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_ALF_OR_RATING',
        payload
    }
}