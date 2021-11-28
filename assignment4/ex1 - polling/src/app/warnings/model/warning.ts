import { Prediction } from "./prediction";

export interface Warning {
    id: number,
    severity: number,
    prediction: Prediction
}