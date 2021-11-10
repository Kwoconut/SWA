import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addWeatherData, fetchWeatherData} from "../store/actions/weatherData";
import ReportHistoricalData from "../components/ReportHistoricalData";

const WeatherData = () => {
    const [selectedCity, setSelectedCity] = useState()
    const [startHour, setStartHour] = useState("")
    const [endHour, setEndHour] = useState("")
    const weatherData = useSelector(state => state.weatherData.weather)
    const loading = useSelector(state => state.weatherData.loading)
    const dispatch = useDispatch();

    const handleSaveData = (data) => {
        dispatch(addWeatherData(data))
    }

    const initWeatherData = () => {
        dispatch(fetchWeatherData())
    }

    const getAvailableCities = () => {
        return weatherData.reduce((acc, weatherData) => {
            if (!acc.includes(weatherData.place))
                acc.push(weatherData.place)
            return acc
        }, [])
    }

    const getWeatherDataForSelectedCity = () => {
        return weatherData.filter(weatherData => weatherData.place === selectedCity).filter(startEndTimeFilter)
    }

    const startEndTimeFilter = (forecast) => {
        if (startHour === "" || endHour === "")
            return true
        const forecastDate = new Date(forecast.time)
        return forecastDate.getUTCHours() >= startHour && forecastDate.getUTCHours() <= endHour
    }

    const handleSelectCity = (event) => {
        setSelectedCity(event.target.value)
    }

    const handleStartHourChange = (event) => {
        setStartHour(event.target.value)
    }

    const handleEndHourChange = (event) => {
        setEndHour(event.target.value)
    }

    const renderSelect = () => (
        <div className="input-group">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">City</label>
            </div>
            <select onChange={handleSelectCity} className="form-select" id="inputGroupSelect01">
                <option defaultChecked>none</option>
                {getAvailableCities().map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
        </div>
    )

    const renderTimeInterval = () => (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Start and End time</span>
            </div>
            <input type="text" onChange={handleStartHourChange} className="form-control"/>
            <input type="text" onChange={handleEndHourChange} className="form-control"/>
        </div>
    )

    const renderTable = () => (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Value</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>

            {loading ? <div>Loading...</div> : getWeatherDataForSelectedCity().map((forecast, index) => {
                return (
                    <tr key={index}>
                        <td>{forecast.type}</td>
                        <td>{forecast.value} {forecast.unit}</td>
                        <td>{forecast.time}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )

    useEffect(() => {
        initWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h3 className="text-center">Weather Data</h3>
            <div className="row">
                <div className="col-12 col-md-4 mb-3">
                    {renderSelect()}
                </div>

                <div className="col-12 col-md-6 mb-3">
                    {renderTimeInterval()}
                </div>

                <div className="col-12 col-md-2 mb-3">
                    <button className="btn btn-primary" onClick={initWeatherData}>Refresh Data</button>
                </div>

                <hr className="mb-4"/>

                <div className="col-12">
                    <ReportHistoricalData saveData={handleSaveData}/>
                </div>

                <hr className="mt-4"/>

                <div className="col-12">
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}

export default WeatherData