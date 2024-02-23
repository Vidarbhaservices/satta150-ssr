import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.prod";
import {DataModel} from "./models/data.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DatePipe} from "@angular/common";
import {SlotAPI} from "./card-list/card-list.component";

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    todaysDate: string | null;
    mDate = new Date();
    // private apiUrl = 'https://matkaapi.com/api/market_api.php';
    // private apiUrl2 = 'https://corsproxy.io/?https://matkaapi.com/api/market_api.php';
    // private cloudFunctionUrl = 'https://us-central1-vidarbha-ea945.cloudfunctions.net/fetchMarketData'; // Replace with your Cloud Function URL
    // private cloudFunctionUrlLocal = 'http://127.0.0.1:5001/vidarbha-ea945/us-central1/fetchMarketData'; // Replace with your Cloud Function URL
    // private cloudFunctionUrl2 = 'https://us-central1-vidarbha-ea945.cloudfunctions.net/fetchMarketData2'; // Replace with your Cloud Function URL
    // private cloudFunctionUrl2Local = 'http://127.0.0.1:5001/vidarbha-ea945/us-central1/fetchMarketData2'; // Replace with your Cloud Function URL
    // private marketApi = 'http://127.0.0.1:5001/vidarbha-ea945/us-central1/getMarketData'; // Replace with your Cloud Function URL

    constructor(private readonly http: HttpClient,
                private readonly datePipe: DatePipe,
                private readonly mFirestore: AngularFirestore) {
        this.todaysDate = this.datePipe.transform(this.mDate, 'dd-MM-yyyy');

    }

    // fetchData2(domain: string, apiKey: string, domainKey: string, market: string): Observable<any> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //     });
    //     // Prepare the request body
    //     const body = {
    //         domain: environment.domain,
    //         api_key: environment.api_key,
    //         domain_key: environment.domain_key,
    //         market: 'SRIDEVI',
    //     };
    //     return this.http.post<any>(this.apiUrl, body);
    //
    //     // Prepare the request URL with JSONP callback parameter
    //     // const url = `${this.apiUrl}?callback=JSONP_CALLBACK&domain=${domain}&api_key=${apiKey}&domain_key=${domainKey}&market=${market}`;
    //
    //     // Make the JSONP request
    //     // return this.http.jsonp(url, 'JSONP_CALLBACK');
    // }

    // fetchData(): Observable<any> {
    //     const body = {
    //         domain: environment.domain,
    //         api_key: environment.api_key,
    //         domain_key: environment.domain_key,
    //         market: 'SRIDEVI',
    //     };
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     });
    //
    //     // Send a POST request to your Cloud Function
    //     return this.http.post<any>(this.cloudFunctionUrl2Local, body, {headers: headers});
    //     // return this.http.post<any>(this.cloudFunctionUrlLocal, body);
    // }

    // fetchData3(): Observable<any> {
    //     const body = {
    //         domain: environment.domain,
    //         api_key: environment.api_key,
    //         domain_key: environment.domain_key,
    //         market: 'SRIDEVI',
    //     };
    //     // Send a POST request to your Cloud Function
    //     return this.http.post<any>(this.apiUrl, body);
    // }

    // fetchTimeBazaar() {
    //     return this.mFirestore.collection<DataModel>('time-bazaar', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()
    //     // return  this.mFirestore.collection<DataModel>('time-bazaar').doc(this.todaysDate!).valueChanges()
    // }

    fetchMadhurMorning() {
        return this.mFirestore.collection<DataModel>('madhur-morning', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('madhur-morning').doc(this.todaysDate!).valueChanges()
    }

    fetchMilanDay() {
        return this.mFirestore.collection<DataModel>('milan-day', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('milan-day').doc(this.todaysDate!).valueChanges()
    }

    fetchKalyan() {
        return this.mFirestore.collection<DataModel>('kalyan', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('kalyan').doc(this.todaysDate!).valueChanges()
    }

    fetchSrideviNight() {
        return this.mFirestore.collection<DataModel>('sridevi-night', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('sridevi-night').doc(this.todaysDate!).valueChanges()
    }

    fetchMadhurNight() {
        return this.mFirestore.collection<DataModel>('madhur-night', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('madhur-night').doc(this.todaysDate!).valueChanges()
    }

    fetchMilanNight() {
        return this.mFirestore.collection<DataModel>('milan-night', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('milan-night').doc(this.todaysDate!).valueChanges()
    }

    fetchVidharbhaNight() {
        return this.mFirestore.collection<DataModel>('vidharbha-night', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('vidharbha-night').doc(this.todaysDate!).valueChanges()
    }

    fetchMainBazzarMumbai() {
        return this.mFirestore.collection<DataModel>('main-bazaar-mumbai', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('main-bazaar-mumbai').doc(this.todaysDate!).valueChanges()
    }

    fetchMayurDay() {
        return this.mFirestore.collection<DataModel>('mayur-day', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('main-bazaar-mumbai').doc(this.todaysDate!).valueChanges()

    }
    fetchFromFirestore(market:string) {
        return this.mFirestore.collection<DataModel>(market, ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()

        // return  this.mFirestore.collection<DataModel>('main-bazaar-mumbai').doc(this.todaysDate!).valueChanges()

    }
    // fetchSridevi(): Observable<SlotAPI> {
    //     // const body = {
    //     //   domain: environment.domain,
    //     //   api_key: environment.api_key,
    //     //   domain_key: environment.domain_key,
    //     //   market: 'SRIDEVI',
    //     // };
    //     // Send a POST request to your Cloud Function
    //     return this.http.get<SlotAPI>('https://kalyan.guru/sridevi.php');
    // }


    fetchAPI(market: string) {
        // const url = 'https://corsproxy.io/?' +`https://corsproxy.io/?https://kalyan.guru/${market}.php`;
        // return  this.http.get<SlotAPI>(`https://corsproxy.io/?https://kalyan.guru/${market}.php`);
        return  this.http.get<SlotAPI>(`https://satta150.com/${market}.php`);
        // return  this.http.get<SlotAPI>(url,{ headers: { 'Access-Control-Allow-Origin': '*' } });
    }
    // sendMarketAutoResult() {
    //     // Remove 'http://' from the domain name if present
    //     // domain = domain.replace(/^https?:\/\//, '');
    //
    //     const url = 'https://matkaapi.com/api/market_api.php';
    //
    //     const requestBody = {
    //         domain: 'satta150.com',
    //         api_key: '650ebf3eace49',
    //         domain_key: 'e58cd9890cf45b220876e0ec179d9c15',
    //         market: 'sridevi'
    //     };
    //
    //     return this.http.post(url, requestBody);
    // }
}
