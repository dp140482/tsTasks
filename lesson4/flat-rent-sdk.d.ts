export interface DataType {
    id: string,
    title: string,
    details: string,
    photos: string[],
    coordinates: number[],
    bookedDates: any[],
    price: number
}

export function cloneDate(date: Date): Date;
export function addDays(date: Date, days: number): Date;

export const backendPort: number;
export const localStorageKey: string;

export interface ParametersType {
    city: string,
    checkInDate: Date,
    checkOutDate: Date,
    priceLimit?: number
}

export class FlatRentSdk {
    constructor();

    /**
     * Get flat by ID.
     * 
     * @param {string} id Flat ID.
     * @returns {Promise<DataType|null>} Flat.
     */
    get(id: string): Promise<DataType | null>;

    /**
     * Search for flats.
     * 
     * @param {ParametersType} parameters Search parameters
     * @param {string}parameters.city City name
     * @param {Date} parameters.checkInDate Check-in date
     * @param {Date} parameters.checkOutDate Check-out date
     * @param {number} [parameters.priceLimit] Max price for a night
     * @returns {DataType[]} List of suitable flats.
     */
    search(parameters: ParametersType): DataType[];

    /**
     * Book flat.
     * 
     * @param {number} flatId 
     * @param {Date} checkInDate 
     * @param {Date} checkOutDate
     * @returns {number}
     */
    book(flatId: number, checkInDate: Date, checkOutDate: Date): number;

}
