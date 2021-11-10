export interface Measurement {
    type: string,
    time: Date,
    place: string,
    value: number,
    unit: string,
    additionalValue?: string
}