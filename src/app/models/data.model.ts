import {Timestamp} from "@angular/fire/firestore";

export interface DataModel {
    opening_number: string
    closing_number: string
    closing_digit: string
    opening_digit: string
    market: string
    timestamp: Timestamp
    date: string


}
