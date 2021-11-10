import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForecastData } from "../store/actions/forecastData";

const ForecastData = () => {
    const [selectedCity, setSelectedCity] = useState()
    const [startHour, setStartHour] = useState("")
    const [endHour, setEndHour] = useState("")
    const forecast = useSelector(state => state.forecastData.forecast)
    const loading = useSelector(state => state.forecastData.loading)
    const dispatch = useDispatch();

    const initForecast = () => {
        dispatch(fetchForecastData())
    }

    const getAvailableCities = () => {
        return forecast.reduce((acc, forecast) => {
            if (!acc.includes(forecast.place))
                acc.push(forecast.place)
            return acc
        }, [])
    }

    const startEndTimeFilter = (forecast) => {
        if (startHour === "" || endHour === "")
            return true
        const forecastDate = new Date(forecast.time)
        return forecastDate.getUTCHours() >= startHour && forecastDate.getUTCHours() <= endHour
    }

    const getForecastForSelectedCity = () => {
        return forecast.filter(forecast => forecast.place === selectedCity).filter(startEndTimeFilter)
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

    useEffect(() => {
        initForecast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            {loading
                ? <div>Loading...</div>
                : getForecastForSelectedCity().map((forecast, index) => {
                    return (
                        <tr key={index}>
                            <td>{forecast.type}</td>
                            <td>from {forecast.from} to {forecast.to} {forecast.unit}</td>
                            <td>{forecast.time}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    return (
        <div>
            <h3 className="text-center">Forecast Data</h3>
            <div className="row">
                <div className="col-12 col-md-4">
                    {renderSelect()}
                </div>

                <div className="col-12 col-md-6">
                    {renderTimeInterval()}
                </div>

                <div className="col-12 col-md-2">
                    <button className="btn btn-primary" onClick={initForecast}>Refresh Data</button>
                </div>

                <div className="col-12">
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}

export default ForecastData