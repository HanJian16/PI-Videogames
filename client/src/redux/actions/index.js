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

export function getNameGames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: 'GET_NAME_CHARACTERS',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
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

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_ALF_OR_RATING',
        payload
    }
}

export function getGenres() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function postGame(payload) {
    return async function () {
        const json = await axios.post("http://localhost:3001/videogames", payload);
        return json;
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (err) {
            console.error(err)
        }
    }
}