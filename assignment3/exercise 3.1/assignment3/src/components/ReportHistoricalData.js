import React, {useState} from "react";

const ReportHistoricalData = (props) => {
    const types = [
        {
            type: "temperature",
            label: "Temperature",
            units: [
                "C",
                "F"
            ]
        }, {
            type: "precipitation",
            label: "Precipitation",
            units: [
                "mm",
                "inch"
            ],
            additionalValues: [
                "rain",
                "breeze"
            ]
        }, {
            type: "wind",
            label: "Wind",
            units: [
                "mph",
                "m/s"
            ],
            additionalValues: [
                "North",
                "South",
                "West",
                "East"
            ]
        }, {
            type: "cloud coverage",
            label: "Cloud Coverage",
            units: [
                "%",
            ],
        }
    ]
    const [selectedType, setSelectedType] = useState()
    const [time, setTime] = useState()
    const [place, setPlace] = useState()
    const [value, setValue] = useState()
    const [unit, setUnit] = useState()
    const [additionalValue, setAdditionalValue] = useState()

    const getAdditionalValues = () => {
        const result = {}
        if (additionalValue) {
            const name = selectedType === "precipitation" ? "precipitation_type" : "direction"
            result[name] = additionalValue
        }
        return result
    }

    const getDataObject = () => ({
        type: selectedType,
        time,
        place,
        value,
        unit,
        ...getAdditionalValues()
    })

    const submitData = () => {
        props.saveData(getDataObject())
    }

    const handleSelectedType = (event) => {
        setSelectedType(event.target.value)
    }

    const handleTimeChange = (event) => {
        setTime(event.target.value)
    }

    const handlePlaceChange = (event) => {
        setPlace(event.target.value)
    }

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }

    const handleUnitChange = (event) => {
        setUnit(event.target.value)
    }

    const handleAdditionalValueChange = (event) => {
        setAdditionalValue(event.target.value)
    }

    const renderSelect = () => (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Weather Type</label>
            </div>
            <select onChange={handleSelectedType} className="form-select" id="inputGroupSelect01">
                <option defaultChecked>none</option>
                {types.map(({type, label}) => (
                    <option key={type} value={type}>{label}</option>
                ))}
            </select>
        </div>
    )

    const renderOptions = () => (
        <React.Fragment>
            <div className="col-12 col-md-3">
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-2">
                        <span className="input-group-text">Time</span>
                    </div>
                    <input onChange={handleTimeChange} type="text" className="form-control" placeholder="Time"/>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-2">
                        <span className="input-group-text">Place</span>
                    </div>
                    <input onChange={handlePlaceChange} type="text" className="form-control" placeholder="Place"/>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-2">
                        <span className="input-group-text">Value</span>
                    </div>
                    <input onChange={handleValueChange} type="text" className="form-control" placeholder="Value"/>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <div className="input-group mb-3">
                    <div className="input-group-prepend col-2">
                        <label className="input-group-text">
                            Unit
                        </label>
                    </div>
                    <select onChange={handleUnitChange} className="form-select">
                        <option defaultChecked value="none">none</option>
                        {types.find(({type}) => type === selectedType).units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>
            {
                types.find(({type}) => type === selectedType).additionalValues
                    ? <div className="col-12 col-md-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend col-2">
                                <label className="input-group-text">
                                    {selectedType === 'precipitation' ? "Type" : "Direction"}
                                </label>
                            </div>
                            <select onChange={handleAdditionalValueChange} className="form-select">
                                <option defaultChecked value="none">none</option>
                                {types.find(({type}) => type === selectedType).additionalValues.map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : null
            }

            <div className="col-12 mb-2">
                <button className="btn btn-success" onClick={submitData}>Create</button>
            </div>

        </React.Fragment>
    )

    return (
        <div>
            <h4 className="text-center">Report Historical Data</h4>
            {renderSelect()}
            {selectedType === "none" || !selectedType ? null : renderOptions()}
        </div>
    )
}

export default ReportHistoricalData