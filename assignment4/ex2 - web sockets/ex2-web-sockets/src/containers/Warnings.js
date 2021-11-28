import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarnings, unsubscribeWarnings, subscribeWarnings } from "../store/actions/warningsActions";

const Warnings = () => {
    const [minimalSeverity, setMinimalSeverity] = useState("")
    const [receiveWarnings, setReceiveWarnings] = useState(true)
    const currentWarnings = useSelector(state => state.warnings.data.warnings)
    const lastWarnings = useSelector(state => state.warnings.data2.warnings)
    const loading = useSelector(state => state.warnings.loading)
    const dispatch = useDispatch();

    const initWarnings = () => {
        dispatch(fetchWarnings())
    }

    const handleMinimalSeverityChange = (event) => {
        setMinimalSeverity(event.target.value)
    }

    const ReceiveWarnings = () => {
        if (receiveWarnings === false)
        {
            setReceiveWarnings(true)
            dispatch(subscribeWarnings())
        }
    }

    const StopReceiveWarnings = () => {
        if (receiveWarnings === true)
        {
            setReceiveWarnings(false)
            dispatch(unsubscribeWarnings())
        }
    }
    
    const GetReceiveWarnings = () => {
        return receiveWarnings.toString()
    }

    const getWarningsFilterSeverity = () => {
        return currentWarnings.filter(warnings => warnings.severity >= minimalSeverity);
    }

    const getLastWarningsFilterSeverity = () => {
        return lastWarnings.filter(warnings => warnings.severity >= minimalSeverity);
    }

    const renderTable = () => (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">Severity</th>
                <th scope="col">Type</th>
                <th scope="col">Value</th>
                <th scope="col">Place</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>

            {loading
                ? <div>Loading...</div>
                : getWarningsFilterSeverity().map((warnings, index) => {
                    return (
                        <tr key={index}>
                            <td>{warnings.severity}</td>
                            <td>{warnings.prediction.type}</td>
                            <td>from {warnings.prediction.from} to {warnings.prediction.to} {warnings.prediction.unit}</td>
                            <td>{warnings.prediction.place}</td>
                            <td>{warnings.prediction.time}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    const renderLastTable = () => (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">Severity</th>
                <th scope="col">Type</th>
                <th scope="col">Value</th>
                <th scope="col">Place</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>

            {loading
                ? <div>Loading...</div>
                : getLastWarningsFilterSeverity().map((warnings, index) => {
                    return (
                        <tr key={index}>
                            <td>{warnings.severity}</td>
                            <td>{warnings.prediction.type}</td>
                            <td>from {warnings.prediction.from} to {warnings.prediction.to} {warnings.prediction.unit}</td>
                            <td>{warnings.prediction.place}</td>
                            <td>{warnings.prediction.time}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    useEffect(() => {
        initWarnings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">Current warnings</h4>
                    {renderTable()}
                </div>

                <div className="col-12">
                    <h4 className="text-center">Initial warnings</h4>
                    {renderLastTable()}
                </div>

                <div className="col-12">
                    <div className="input-group mb-5">
                        <div className="input-group-prepend col-2">
                            <span className="input-group-text">Minimal severity level</span>
                        </div>
                        <input onChange={handleMinimalSeverityChange} type="text" className="form-control" placeholder="Minimal severity level"/>
                    </div>
                </div>

                <div className="col-12">
                    <span>Receive warnings ?   </span>
                    <button className="btn btn-success" onClick={ReceiveWarnings}>Yes</button>
                    <button className="btn btn-danger" onClick={StopReceiveWarnings}>No</button>
                    <span>   Currently: </span>
                    <span>{GetReceiveWarnings()}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Warnings