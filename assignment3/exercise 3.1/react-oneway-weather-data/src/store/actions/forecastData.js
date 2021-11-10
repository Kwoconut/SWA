import * as actionTypes from "./actionTypes"
import {axiosClient} from "../../weatherReportMasterAxios"

const fetchForecastDataStart = () => {
    return {
        type: actionTypes.FETCH_FORECAST_DATA_START,
    };
};

const fetchForecastDataSuccess = (forecast) => {
    return {
        type: actionTypes.FETCH_FORECAST_DATA_SUCCESS,
        payload: forecast,
    };
};

const fetchForecastDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_FORECAST_DATA_FAILED,
        error: error
    }
}

export const fetchForecastData = () => {
    return (dispatch) => {
        dispatch(fetchForecastDataStart)
        axiosClient()
            .get("/forecast")
            .then((response) => {
                dispatch(fetchForecastDataSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchForecastDataFailed(error))
            });
    };
};