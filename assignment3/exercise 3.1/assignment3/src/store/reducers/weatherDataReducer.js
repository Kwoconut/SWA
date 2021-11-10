import * as actionTypes from "../actions/actionTypes"

const initialState = {
    weather: [],
    loading: false,
    error: null
}

const weatherDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHER_DATA_START:
            return {...state, loading: true, error: null}
        case actionTypes.FETCH_WEATHER_DATA_SUCCESS:
            return {...state, weather: action.payload, loading: false, error: null}
        case actionTypes.FETCH_WEATHER_DATA_FAILED:
            return {...state, loading: false, error: action.error}
        default:
            return state
    }
}

export default weatherDataReducer