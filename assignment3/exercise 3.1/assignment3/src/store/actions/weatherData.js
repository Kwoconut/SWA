import * as actionTypes from "./actionTypes"
import {axiosClient} from "../../weatherReportMasterAxios"

const fetchWeatherDataStart = () => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_START,
    };
};

const fetchWeatherDataSuccess = (weatherData) => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_SUCCESS,
        payload: weatherData,
    };
};

const fetchWeatherDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_FAILED,
        error: error
    }
}

export const addWeatherData = (data) => {
    return (dispatch) => {
        axiosClient()
            .post("/data", data)
            .then(() => {
                dispatch(fetchWeatherData())
            })
    };

}

export const fetchWeatherData = () => {
    return (dispatch) => {
        dispatch(fetchWeatherDataStart)
        axiosClient()
            .get("/data")
            .then((response) => {
                dispatch(fetchWeatherDataSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchWeatherDataFailed(error))
            });
    };
};