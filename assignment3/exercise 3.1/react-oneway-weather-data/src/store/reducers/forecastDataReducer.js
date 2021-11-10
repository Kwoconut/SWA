import * as actionTypes from "../actions/actionTypes"

const initialState = {
    forecast: [],
    loading: false,
    error: null
}

const forecastDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FORECAST_DATA_START:
            return {...state, loading: true, error: null}
        case actionTypes.FETCH_FORECAST_DATA_SUCCESS:
            return {...state, forecast: action.payload, loading: false, error: null}
        case actionTypes.FETCH_FORECAST_DATA_FAILED:
            return {...state, loading: false, error: null}
        default:
            return state
    }
}

export default forecastDataReducer