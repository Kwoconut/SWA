export interface Prediction {
    type: string,
    time: Date,
    place: string,
    from: number,
    to: number,
    unit: string,
    precipitation_types?: string[],
    directions?: string[]
}