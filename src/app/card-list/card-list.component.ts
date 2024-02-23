import {Component, OnDestroy, OnInit} from '@angular/core';
import {MarketService} from "../market.service";
import {environment} from "../../environments/environment";
import {catchError, forkJoin, Observable, of, Subject, takeUntil} from "rxjs";
import {DatePipe} from "@angular/common";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DataModel} from "../models/data.model";
import firebase from "firebase/compat/app";
import {Data} from "@angular/router";

export interface SlotAPI {
    status: boolean;
    message: string;
    data: SlotData[];
}

export interface SlotData {
    id: string;
    uid: string;
    name: string;
    result: string;
    date: string;
}

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
    todaysDate: string | null;
    mDate = new Date();
    _destroyed = new Subject()
    mVidharbhaDay?: DataModel
    mSrideviNight?: DataModel|undefined
    mMadhurNight?:DataModel
    mVidharbhaNight?: DataModel
    mMilanNight?: DataModel | undefined
    mMayurDay?: DataModel
    mSridevi?: DataModel

    mMadhurMorning?: DataModel
    mTimeBazaar?: DataModel
    mMilanDay?: DataModel
    mKalyan?: DataModel
    mMainBazaarMumbai?: DataModel
    isVidharbhaDayLoading = false
    showVidharbhaDayCard = false
    showVidharbhaNightCard = false
    showJantaBazaarCard = false
    isVidharbhaDayCloseLoading = false
    isVidharbhaNightLoading = false
    isVidharbhaNightClosingLoading = false
    isMayurDayLoading = false;
    isSrideviLoading = false;
    isMadhurMorningLoading = false;
    isTimeBazaaeLoading = false;
    milanDayLoading = false;
    milanDayCloseLoading = false;
    isTimeBazaaeCloseLoading = false
    isSrideviClosingLoading = false
    isMayurDayClosingLoading = false
    isMadhurMorningCloseLoading = false;
    isKalyanLoading = false;
    isKalyanCloseLoading = false;
    isSrideviNightLoading = false;
    isMadhuriNightLoading = false;
    isSrideviNightCloseLoading = false;
    isMadhurNightCloseLoading = false;
    isMilanNightLoading = false;
    isMainBazaarLoading = false;
    isMilanNightCloseLoading = false;
    isMainBazaarCloseLoading = false;
    now = new Date()



    //now = firebase.firestore.Timestamp.now()
    private hours: number;
    private minutes: number;
    private seconds: number;

    mMilanDay$!: SlotData|undefined
    mRajdhaniDay$!: SlotData | undefined
    mTimeBazaar$!: Observable<SlotAPI>
    mRajdhaniNight$!: Observable<SlotAPI>
    mSrideviNight$!: Observable<SlotAPI>
    mKalyanNight$!: Observable<SlotAPI>
    mKalyanNight!: SlotData | undefined
    mMainBazaar$!: Observable<SlotAPI>
    mMadhurNight$!: Observable<SlotAPI>
    mMadhurMorning$!: Observable<SlotAPI>
    mMilanNight$!: Observable<SlotAPI>


    constructor(
        private readonly marketService: MarketService,
        private readonly datePipe: DatePipe,
        private readonly mFirestore: AngularFirestore
    ) {
        this.todaysDate = this.datePipe.transform(this.mDate, 'dd-MM-yyyy');
        this.hours = this.now.getHours();
        this.minutes = this.now.getMinutes();
        this.seconds = this.now.getSeconds();

    }

    ngOnInit(): void {

        this.getVidharbhaDayData()

        this.getVidharbhaNight()

        this.getMayurDay()
        this.getSridevi()
        this.getTimeBazaar()
        this.getMadhurMornig()
        this.getMilanDay()
        this.getKalyan()

      this.  getSrideviNight()
        this.getMadhurNight()
        this.getMilanNight()
        this.getMainBazaar()
        // this.mKalyan$ = this.marketService.fetchAPI('kalyan') //done
        // this.mMilanDay$ = this.marketService.fetchAPI('milanday') //done
        // this.mRajdhaniDay$ = this.marketService.fetchAPI('rajdhani_day')
        // this.mTimeBazaar$ = this.marketService.fetchAPI('time_bazar')  //done
        // this.mRajdhaniNight$ = this.marketService.fetchAPI('rajdhani_night')
        // this.mSrideviNight$ = this.marketService.fetchAPI('sridevi_night') //done
        // this.mKalyanNight$ = this.marketService.fetchAPI('kalyan_night')
        // this.mMainBazaar$ = this.marketService.fetchAPI('main_bazar') //done
        // this.mSridevi$ = this.marketService.fetchAPI('sridevi') //done
        // this.mMadhurNight$ = this.marketService.fetchAPI('madhur_night') //done
        // this.mMadhurMorning$ = this.marketService.fetchAPI('madhur_morning') //done
        // this.mMilanNight$ = this.marketService.fetchAPI('milan_night') //done
        // this.marketService.fetchAPI('all').subscribe(res => {
        //     console.log(JSON.stringify(res))
        //     const arr = res.data
        //     console.log('MILAN MORNING', arr.find(x => x.name == "MILAN MORNING"))
        //     // @ts-ignore
        //     this.mMilanDay$ = arr.find(x => x.name == "MILAN DAY")
        //     this.mRajdhaniDay$ = arr.find(x => x.name == "RAJDHANI DAY")
        //     // this.mTimeBazaar = arr.find(x => x.name == 'TIME BAZAR')
        //     // this.mSridevi = arr.find(x => x.name == 'SRIDEVI')
        //     this.mKalyanNight = arr.find(x => x.name == "KALYAN NIGHT")
        //     // this.mMadhurMorning$ = arr.find(x => x.name == "MADHUR MORNING")
        //     this.mMadhurNight = arr.find(x => x.name == "MADHUR NIGHT")
        //     this.mSrideviNight = arr.find(x => x.name == 'SRIDEVI NIGHT')
        //     this.mMilanNight = arr.find(x => x.name == 'MILAN NIGHT')
        //     this.mMainBazaarMumbai = arr.find(x => x.name == 'MAIN BAZAR')
        //     this.mKalyan = arr.find(x => x.name == 'KALYAN')
        // })

        // this.vidharbhaLoading()
        // this.marketService.sendMarketAutoResult().subscribe(res => {
        //     // alert(JSON.stringify(res))
        //     console.log(res)
        // })
        // Fetch all observables concurrently
        // forkJoin(observables).subscribe(
        //     (results: any[]) => {
        //         // Handle results here
        //         this.mKalyan$ = results[0];
        //         this.mMilanDay$ = results[1];
        //         this.mRajdhaniDay$ = results[2];
        //         this.mTimeBazaar$ =results[3]
        //         this.mRajdhaniNight$ =results[4]
        //         this.mSrideviNight$ =results[5]
        //         this.mKalyanNight$=results[6]
        //         this.mMainBazaar$ =results[7]
        //         this.mSridevi$ =results[8]
        //         this.mMadhurNight$ =results[9]
        //         this.mMadhurMorning$ =results[10]
        //         this.mMilanNight$ =results[11]
        //         // Assign other results similarly
        //     },
        //     (error) => {
        //         // Handle error
        //     }
        // );
    }


    getOpeningCombination(model: DataModel | undefined) {
        return model?.opening_number.toString() || ''
    }

    getOpeningNumber(model: DataModel | undefined) {
        return model?.opening_digit?.toString() || ''

    }

    getClosingNumber(model: DataModel | undefined) {
        return model?.closing_digit?.toString() || ''

    }

    getClosingCombination(model: DataModel | undefined) {
        return model?.closing_number?.toString() || ''

    }

    getVidharbhaDayData() {
        this.mFirestore.collection<DataModel>('vidharbha-day', ref => ref.orderBy('timestamp').limitToLast(1)).valueChanges()
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    this.mVidharbhaDay = res[0]
                    this.vidharbhaDayLoading(this.mVidharbhaDay)
                }
            )
    }


    getVidharbhaNight() {
        this.marketService.fetchVidharbhaNight()
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    this.mVidharbhaNight = res[0]
                    this.vidharbhaNightLoading(this.mVidharbhaNight)

                }
            )
    }

    ngOnDestroy(): void {
        this._destroyed.next('')
        this._destroyed.complete()
    }

    vidharbhaDayLoading(mVidharbhaDay: DataModel) {

        const slotHour = mVidharbhaDay?.timestamp.toDate().getHours()
        const slotTime = mVidharbhaDay?.timestamp.toDate().getMinutes()
        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaDay?.timestamp.toDate())
        if (nowHour == 11 && nowMinutes >= 13) {
            this.showVidharbhaDayCard = true
        } else if ((nowHour == 12 && nowMinutes <= 15)) {
            this.showVidharbhaDayCard = true
        } else if (nowHour >= 12 && nowMinutes < 15) this.showVidharbhaDayCard = false

        if (nowHour >= 11 && nowMinutes >= 13) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isVidharbhaDayLoading = true
            // console.log('OPEN LOADING')
            if (mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isVidharbhaDayLoading = false
                // console.log('OPEN LOADING CLOSED')
                // console.log(new Date().getDate())
                // console.log(mVidharbhaDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 12 && nowMinutes >= 13) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isVidharbhaDayCloseLoading = true
            if (mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate() && mVidharbhaDay?.closing_digit != null) {
                this.isVidharbhaDayCloseLoading = false

            }
        }

    }

    vidharbhaNightLoading(mVidharbhaNight: DataModel) {


        const slotHour = mVidharbhaNight?.timestamp.toDate().getHours()
        const slotTime = mVidharbhaNight?.timestamp.toDate().getMinutes()
        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if ((nowHour == 19 && nowMinutes >= 20)) {
            this.showVidharbhaNightCard = true

        } else if ((nowHour == 20 && nowMinutes <= 30)) {
            this.showVidharbhaNightCard = true
        } else this.showVidharbhaNightCard = false
        if (nowHour >= 19 && nowMinutes >= 20) {
// alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isVidharbhaNightLoading = true
            if (mVidharbhaNight?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isVidharbhaNightLoading = false
                // console.log(new Date().getDate())
                // console.log(mVidharbhaNight?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 20 && nowMinutes >= 20) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isVidharbhaNightClosingLoading = true
            if (mVidharbhaNight?.timestamp.toDate().getDate() == new Date().getDate() && (mVidharbhaNight?.closing_number != null)) {
                this.isVidharbhaNightClosingLoading = false
                // console.log(new Date().getDate())
                // console.log(mVidharbhaNight?.timestamp.toDate().getDate())
            }
        }


    }

    mayurDayLoading(mMayurDay: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 16 && nowMinutes > 26)) {
            // alert('true')
            this.showJantaBazaarCard = true
        } else if (nowHour == 17) {
            this.showJantaBazaarCard = true
        } else if (((nowHour == 18) && nowMinutes < 31)) {
            this.showJantaBazaarCard = true
        } else {
            // alert('false')
            this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 16 && nowMinutes >= 27) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isMayurDayLoading = true
            if (mMayurDay?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isMayurDayLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 18 && nowMinutes >= 27) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isMayurDayClosingLoading = true
            if (mMayurDay?.timestamp.toDate().getDate() == new Date().getDate() && (mMayurDay?.closing_number != null)) {
                this.isMayurDayClosingLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }

    srideviLoading(mSridevi: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 11 && nowMinutes > 30)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 12) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 12) && nowMinutes < 31)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 11 && nowMinutes >= 30) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isSrideviLoading = true
            if (mSridevi?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isSrideviLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 12 && nowMinutes >= 30) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isSrideviClosingLoading = true
            if (mSridevi?.timestamp.toDate().getDate() == new Date().getDate() && (mSridevi?.closing_number != null)) {
                this.isSrideviClosingLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }

    madhurMorningLoading(mSridevi: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 11 && nowMinutes > 25)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 12) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 12) && nowMinutes < 31)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 11 && nowMinutes >= 30) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isMadhurMorningLoading = true
            if (mSridevi?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isMadhurMorningLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 12 && nowMinutes >= 30) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isMadhurMorningCloseLoading = true
            if (mSridevi?.timestamp.toDate().getDate() == new Date().getDate() && (mSridevi?.closing_number != null)) {
                this.isMadhurMorningCloseLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }
    timeBazaarLoading(mTimeBazaar: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 13 && nowMinutes > 0)) {
            // alert('true')
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 14) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 14) && nowMinutes < 0)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 14 && nowMinutes >= 0) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isTimeBazaaeLoading = true
            if (mTimeBazaar?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isTimeBazaaeLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 14 && nowMinutes >= 0) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isTimeBazaaeCloseLoading = true
            if (mTimeBazaar?.timestamp.toDate().getDate() == new Date().getDate() && (mTimeBazaar?.closing_number != null)) {
                this.isTimeBazaaeCloseLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }
   getmilanDayLoading(mMilanDay: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 14 && nowMinutes > 55)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 17) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 17) && nowMinutes < 55)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 17 && nowMinutes >= 55) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.milanDayLoading = true
            if (mMilanDay?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.milanDayLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 12 && nowMinutes >= 30) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.milanDayCloseLoading = true
            if (mMilanDay?.timestamp.toDate().getDate() == new Date().getDate() && (mMilanDay?.closing_number != null)) {
                this.milanDayCloseLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }
   getKalyanLoading(mKalyan: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 15 && nowMinutes > 45)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 17) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 17) && nowMinutes < 45)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 17 && nowMinutes >= 55) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isKalyanLoading = true
            if (mKalyan?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isKalyanLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 12 && nowMinutes >= 30) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isKalyanCloseLoading = true
            if (mKalyan?.timestamp.toDate().getDate() == new Date().getDate() && (mKalyan?.closing_number != null)) {
                this.isKalyanCloseLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }
   getSrideviNightLoading(mSrideviNight: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 19 && nowMinutes > 0)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 19) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 19) && nowMinutes < 0)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 20 && nowMinutes >= 0) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isSrideviNightLoading = true
            if (mSrideviNight?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isSrideviNightLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
        if (nowHour >= 20 && nowMinutes >= 0) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isSrideviNightCloseLoading = true
            if (mSrideviNight?.timestamp.toDate().getDate() == new Date().getDate() && (mSrideviNight?.closing_number != null)) {
                this.isSrideviNightCloseLoading = false
                // console.log(new Date().getDate())
                // console.log(mMayurDay?.timestamp.toDate().getDate())
            }
        }
    }
   getMadhurNightLoading(mMadhurNight: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 20 && nowMinutes > 30)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 20) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 20) && nowMinutes < 30)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 22 && nowMinutes >= 30) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isMadhuriNightLoading = true
            if (mMadhurNight?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isMadhuriNightLoading = false
            }
        }
        if (nowHour >= 22 && nowMinutes >= 30) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isMadhurNightCloseLoading = true
            if (mMadhurNight?.timestamp.toDate().getDate() == new Date().getDate() && (mMadhurNight?.closing_number != null)) {
                this.isMadhurNightCloseLoading = false
            }
        }
    }
    getMilanNightLoading(mMilanNight: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 21 && nowMinutes > 0)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 21) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 21) && nowMinutes < 0)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 23 && nowMinutes >= 0) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isMadhuriNightLoading = true
            if (this.mMilanNight?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isMadhuriNightLoading = false
            }
        }
        if (nowHour >= 23 && nowMinutes >= 0) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isMadhurNightCloseLoading = true
            if (this.mMilanNight?.timestamp.toDate().getDate() == new Date().getDate() && (this.mMilanNight?.closing_number != null)) {
                this.isMadhurNightCloseLoading = false
            }
        }
    }
    getMainBazaarLoading(mTimeBazar: DataModel) {

        const nowHour = this.now.getHours()
        const nowMinutes = this.now.getMinutes()
        // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
        // 31
        if ((nowHour == 21 && nowMinutes > 0)) {
            // alert('true')
            // this.showJantaBazaarCard = true
        } else if (nowHour == 21) {
            // this.showJantaBazaarCard = true
        } else if (((nowHour == 21) && nowMinutes < 0)) {
            // this.showJantaBazaarCard = true
        } else {
            // alert('false')
            // this.showJantaBazaarCard = false
        }
        // alert(`${this.now.getHours()}: ${this.now.getMinutes()}`)
        // alert(`${slotHour}: ${slotTime}`)
// alert(this.mVidharbhaNight?.timestamp.toDate())
        if (nowHour >= 23 && nowMinutes >= 0) {
            // alert('slot logic nowHour>=23 && nowMinutes>=47')
            this.isMainBazaarLoading = true
            if (this.mTimeBazaar?.timestamp.toDate().getDate() == new Date().getDate()) {
                this.isTimeBazaaeLoading = false
            }
        }
        if (nowHour >= 23 && nowMinutes >= 0) {
// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
            this.isTimeBazaaeCloseLoading = true
            if (mTimeBazar?.timestamp.toDate().getDate() == new Date().getDate() && (mTimeBazar?.closing_number != null)) {
                this.isTimeBazaaeCloseLoading = false
            }
        }
    }

    private getMayurDay() {
        this.marketService.fetchMayurDay()
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    this.mMayurDay = res[0]
                    this.mayurDayLoading(this.mMayurDay)
                }
            )
    }
    private getSridevi() {
        this.marketService.fetchFromFirestore('sridevi')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mSridevi = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.srideviLoading(this.mSridevi)
                }
            )
    }
    private getMadhurMornig() {
        this.marketService.fetchFromFirestore('madhur-morning')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mMadhurMorning = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.madhurMorningLoading(this.mMadhurMorning)
                }
            )
    }
    private getTimeBazaar() {
        this.marketService.fetchFromFirestore('time-bazaar')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mTimeBazaar = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.timeBazaarLoading(this.mTimeBazaar)
                }
            )
    }
    private getMilanDay() {
        this.marketService.fetchFromFirestore('milan-day')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mMilanDay = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getmilanDayLoading(this.mMilanDay)
                }
            )
    }
    private getKalyan() {
        this.marketService.fetchFromFirestore('kalyan')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mKalyan = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getKalyanLoading(this.mKalyan)
                }
            )
    }
    private getSrideviNight() {
        this.marketService.fetchFromFirestore('sridevi-night')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mSrideviNight = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getSrideviNightLoading(this.mSrideviNight)
                }
            )
    }
    private getMadhurNight() {
        this.marketService.fetchFromFirestore('madhur-night')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mMadhurNight = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getMadhurNightLoading(this.mMadhurNight)
                }
            )
    }
    private getMilanNight() {
        this.marketService.fetchFromFirestore('milan-night')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mMilanNight = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getMilanNightLoading(this.mMilanNight)
                }
            )
    }
    private getMainBazaar() {
        this.marketService.fetchFromFirestore('main-bazaar-mumbai')
            .pipe(
                takeUntil(this._destroyed)
            )
            .subscribe(
                res => {
                    // this.mMayurDay = res[0]
                    this.mMainBazaarMumbai = res[0]
                    // this.mayurDayLoading(this.mMayurDay)
                    this.getMainBazaarLoading(this.mMainBazaarMumbai)
                }
            )
    }



}

//MORNING
