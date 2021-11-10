import React from "react";
import {NavLink} from "react-router-dom";

export const Layout =(props) => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <NavLink className="nav-link" to="/weatherData" activeClassName="text-info">WeatherData</NavLink>
                    <NavLink className="nav-link" to="/forecastData" activeClassName="text-info">ForecastData</NavLink>
                </ul>
            </nav>
            <main className="mt-4 container-fluid">{props.children}</main>
        </React.Fragment>
    )
}