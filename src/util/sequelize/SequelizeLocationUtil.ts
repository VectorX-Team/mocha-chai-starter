export class SequelLocationUtil {
    static getPoint(long: number, lati: number): GeomPoint {
        return {
            type: 'Point',
            coordinates: [long, lati]
        }
    }
}

export interface GeomPoint {
    type: 'Point';
    coordinates: [number, number]   // [latitude, longitude]
}