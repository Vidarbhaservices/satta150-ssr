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
  mSrideviNight?: DataModel | undefined
  mMadhurNight?: DataModel
  mVidharbhaNight?: DataModel
  mMilanNight?: DataModel | undefined
  mMayurDay?: DataModel
  mSridevi?: DataModel
  mMadhurMorning?: DataModel
  mTimeBazaar?: DataModel
  mMilanDay?: DataModel
  mKalyan?: DataModel
  mMainBazaarMumbai?: DataModel


  showMadhurMorningCard = false
  showTimeBazaarCard = false
  showMilanDayCard = false
  showKalyanLoadingCard = false
  showVidharbhaDayCard = false
  showVidharbhaNightCard = false
  showJantaBazaarCard = false
  showSrideviNightCard = false
  showMadhurNightCard = false
  showMilanNightCard = false
  showMainBazaarCard = false
  isMilanDayCloseLoading = false

  isVidharbhaDayLoading = false
  isVidharbhaDayCloseLoading = false
  isVidharbhaNightLoading = false
  isVidharbhaNightClosingLoading = false
  isMayurDayLoading = false;
  isSrideviLoading = false;
  isMadhurMorningLoading = false;
  isTimeBazaaeLoading = false;
  isMilanDayLoading = false;
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
  isMilanNightCloseLoading = false;
  isMainBazaarLoading = false;
  isMainBazaarCloseLoading = false;
  now = new Date()

  private hours: number;
  private minutes: number;
  private seconds: number;


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
    this.getSrideviNight()
    this.getMadhurNight()
    this.getMilanNight()
    this.getMainBazaar()
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

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()

    if (nowHour == 11 && nowMinutes >= 13) {
      this.showVidharbhaDayCard = true
    } else if ((nowHour == 12 && nowMinutes <= 15)) {
      this.showVidharbhaDayCard = true
    } else if (nowHour >= 12 && nowMinutes < 15) this.showVidharbhaDayCard = false

    if (nowHour >= 11 && nowMinutes >= 13) {

      this.isVidharbhaDayLoading = true

      if (mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate()) {
        this.isVidharbhaDayLoading = false

      }
    }
    // alert(mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate() && mVidharbhaDay?.closing_digit != null)
    if (nowHour >= 12 && nowMinutes >= 15) {


      this.isVidharbhaDayCloseLoading = !(mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate() && mVidharbhaDay?.closing_digit != null);
    }

  }

  showMarketLoadingx(mMarket: DataModel, openLoading: boolean, openHour: number, openMinute: number,
                     closeHour: number, closeMiute: number, closeLoading: boolean, loadingCard: boolean
  ) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()
//OPEN HOUR 11 OPEN MINUTE 13 CLOSE HOUR 12 CLOSE MINUTE 15
    if (nowHour == openHour && nowMinutes >= openMinute) {
      loadingCard = true
    } else if ((nowHour == closeHour && nowMinutes <= closeMiute)) {
      loadingCard = true
    } else if (nowHour >= closeHour && nowMinutes < closeMiute) loadingCard = false

    if (nowHour >= openHour && nowMinutes >= openMinute) {

      openLoading = true

      if (mMarket?.timestamp.toDate().getDate() == new Date().getDate()) {
        openLoading = false

      }
    }
    // alert(mVidharbhaDay?.timestamp.toDate().getDate() == new Date().getDate() && mVidharbhaDay?.closing_digit != null)
    if (nowHour >= closeHour && nowMinutes >= closeMiute) {


      closeLoading = !(mMarket?.timestamp.toDate().getDate() == new Date().getDate() && mMarket?.closing_digit != null);
    }

  }

  showMarketLoading(mMarket: DataModel, openLoading: boolean, openHour: number, openMinute: number, closeHour: number, closeMinute: number, closeLoading: boolean, loadingCard: boolean): any {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();

    loadingCard = (nowHour === openHour && nowMinutes >= openMinute) || (nowHour === closeHour && nowMinutes <= closeMinute) || (nowHour >= closeHour && nowMinutes < closeMinute);
    alert(loadingCard)
    if (nowHour >= openHour && nowMinutes >= openMinute) {
      openLoading = true;
      if (mMarket && mMarket.timestamp.toDate().getDate() === now.getDate()) {
        openLoading = false;
      }
    }

    if (nowHour >= closeHour && nowMinutes >= closeMinute) {
      closeLoading = !(mMarket && mMarket.timestamp.toDate().getDate() === now.getDate() && mMarket.closing_digit !== null);
    }
    loadingCard = openLoading || closeLoading
    return {openLoading, closeLoading, loadingCard};

  }

  getMadhurNightLoading(mMadhurNight: DataModel) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()

    if (nowHour == 20 && nowMinutes >= 20) {
      this.showMadhurNightCard = true
      this.isMadhuriNightLoading = true
      if (mMadhurNight?.timestamp.toDate().getDate() == new Date().getDate()) {
        this.isMadhuriNightLoading = false

      }
    }

    if (nowHour >= 22 && nowMinutes >= 22) {
      this.isMadhurNightCloseLoading = true
      this.showMadhurNightCard = true
      if (mMadhurNight?.timestamp.toDate().getDate() == new Date().getDate() && mMadhurNight?.closing_digit != null) {
        this.isMadhurNightCloseLoading = false
        this.showMadhurNightCard = false
      }
      if (nowHour >= 23) {
        this.showMadhurNightCard = false
        this.isMadhuriNightLoading = false
        this.isMadhurNightCloseLoading = false
      }
    }


  }


  getMilanNightLoading(mMilanNight: DataModel) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()
//*START LOADING FROM HERE
    if (nowHour >= 21 && nowMinutes >= 0) {
      //*SHOWING LOADING CARD
      this.showMilanNightCard = true
      this.isMilanNightLoading = true
    }
    if (mMilanNight?.timestamp.toDate().getDate() == new Date().getDate()) {
      this.isMilanNightLoading = false
    }

    if (nowHour >= 23 && nowMinutes >= 0) {
      this.isMilanNightCloseLoading = true
      this.showMilanNightCard = true
      if (mMilanNight?.timestamp.toDate().getDate() == new Date().getDate() && mMilanNight?.closing_digit != null) {
        this.isMilanNightCloseLoading = false
        this.showMilanNightCard = false
        this.isMilanNightLoading = false
      }
    }

  }

  //GEMINI CODE
  getMilanNightLoadingxx(mMilanNight: DataModel) {
    const now = this.now;
    const hour = now.getHours();
    const minutes = now.getMinutes();

    // Combined loading and closing loading checks with single date comparison
    this.isMilanNightLoading = hour >= 20;
    this.isMilanNightCloseLoading = hour >= 22 && minutes >= 50; // Adjust based on your closing time
    // Refine loading states based on data and date
    if (mMilanNight) {
      const milanNightDate = mMilanNight.timestamp.toDate().getDate();
      const currentDate = new Date().getDate();
      this.isMilanNightLoading = this.isMilanNightLoading && milanNightDate !== currentDate;
      this.isMilanNightCloseLoading = this.isMilanNightCloseLoading && milanNightDate === currentDate && mMilanNight.closing_digit !== null;
    }

    // Show card based on loading state
    this.showMilanNightCard = this.isMilanNightLoading || this.isMilanNightCloseLoading;
    alert(this.isMilanNightLoading)
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
      this.showMadhurMorningCard = true
    } else if (nowHour == 12) {
      this.showMadhurMorningCard
    } else if (((nowHour == 12) && nowMinutes < 31)) {
      this.showMadhurMorningCard
    } else {
      // alert('false')
      this.showMadhurMorningCard = false
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

      this.isMadhurMorningCloseLoading = !(mSridevi?.timestamp.toDate().getDate() == new Date().getDate() && (mSridevi?.closing_number != null));
    }
  }

  getisMilanDayLoading(mMilanDay: DataModel) {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();

    if (nowHour === 14 && nowMinutes > 50) {
      this.showMilanDayCard = true;

    } else if (nowHour === 16 || (nowHour >= 16 && nowMinutes <= 55)) {
      this.showMilanDayCard = true;
    } else {
      this.showMilanDayCard = false;
    }

    if (nowHour >= 16 && nowMinutes >= 55) {
      this.isMilanDayLoading = true;
      if (mMilanDay && mMilanDay.timestamp.toDate().getDate() === now.getDate()) {
        this.isMilanDayLoading = false;
      }
    }

    if (nowHour >= 16 && nowMinutes >= 50) {
      this.isMilanDayCloseLoading = true;
      if (mMilanDay && mMilanDay.timestamp.toDate().getDate() === now.getDate() && mMilanDay.closing_number !== null) {
        this.isMilanDayCloseLoading = false;
        this.showMilanDayCard = false;
      }
    }
  }

  isMilanLoading(mMilanDay: DataModel) {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();
    //FOR OPEN for 3 and 4
    if (nowHour >= 14 && nowMinutes >= 50 || (nowHour >= 15)) {
      this.isMilanDayLoading = true
      this.showMilanDayCard = true
      if (mMilanDay && mMilanDay.timestamp.toDate().getDate() === now.getDate()) {
        this.isMilanDayLoading = false;
      }
      if (nowHour >= 16 && nowMinutes >= 50 || (nowHour >= 17)) {
        this.isMilanDayCloseLoading = true
        this.showMilanDayCard = true
        if (mMilanDay.timestamp.toDate().getDate() === now.getDate() && mMilanDay.closing_number !== null) {
          this.isMilanDayLoading = false
          this.isMilanDayCloseLoading = false
          this.showMilanDayCard = false;
        }
      }
// FOR CLOSE
    }

  }

  getKalyanLoading(mKalyan: DataModel) {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();
    //FOR OPEN for 3 and 4
    if ((nowHour >= 15 && nowMinutes >= 35) || (nowHour >= 16)) {
      this.isKalyanLoading = true
      this.showKalyanLoadingCard = true
      if (mKalyan && mKalyan.timestamp.toDate().getDate() === now.getDate()) {
        this.isKalyanLoading = false;
      }

      if (nowHour >= 16 && nowMinutes >= 50 || (nowHour >= 17)) {
        this.isKalyanCloseLoading = true
        this.showKalyanLoadingCard = true
        if (mKalyan.timestamp.toDate().getDate() === now.getDate() && mKalyan.closing_number !== null) {
          this.isKalyanLoading = false
          this.isKalyanCloseLoading = false
          this.showKalyanLoadingCard = false;
        }
      }
// FOR CLOSE
    }

  }

  getSrideviNightLoading(mSrideviNight: DataModel) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()

    if ((nowHour == 19 && nowMinutes >= 15)) {
      // alert('true')
      this.showSrideviNightCard = true
      this.isSrideviNightLoading = true

    } else if (((nowHour == 19) && nowMinutes < 0)) {
      this.showSrideviNightCard = false
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
        this.showSrideviNightCard = false
        // console.log(new Date().getDate())
        // console.log(mMayurDay?.timestamp.toDate().getDate())
      }
    }
  }

  getMadhurNightLoadingOLD(mMadhurNight: DataModel) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()
    // alert(`${nowHour==16 && nowMinutes  >26}  ${nowHour < 18 && nowMinutes < 31} ${(nowHour==16 && nowMinutes  >26)   && (nowHour < 18 && nowMinutes < 31)}`

// alert(nowHour>=16 && nowMinutes  >26)
    // 31
    if ((nowHour == 20 && nowMinutes > 30)) {
      // alert('true')
      this.showMadhurNightCard = true
    } else if (nowHour == 20) {
      this.showMadhurNightCard = true
    } else if (((nowHour == 20) && nowMinutes < 30)) {
      this.showMadhurNightCard = true
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


  getMainBazaarLoading(mMainBazaar: DataModel) {

    const nowHour = this.now.getHours()
    const nowMinutes = this.now.getMinutes()
    if ((nowHour == 21 && nowMinutes > 35)) {
      this.showMainBazaarCard = true
      this.isMainBazaarLoading = true
    }
    if (nowHour >= 21 && this.mMainBazaarMumbai?.timestamp.toDate().getDate() == new Date().getDate()) {
      this.isMainBazaarLoading = false
    }
    if (nowHour >= 23 && nowMinutes >= 40) {

// alert(`slot logic ${nowHour}>=23 && ${nowMinutes}>=47`)
      this.isMainBazaarCloseLoading = true
      this.isMainBazaarLoading = true

      if (mMainBazaar?.timestamp.toDate().getDate() == new Date().getDate() && (mMainBazaar?.closing_number != null)) {
        this.isMainBazaarLoading = false
        this.isMainBazaarCloseLoading = false
        this.showMainBazaarCard = false
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
          // this.timeBazaarLoading(this.mTimeBazaar)
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
          this.isMilanLoading(this.mMilanDay)

//           const { updatedOpenLoading, updatedCloseLoading, updatedLoadingCard } =   this.showMarketLoading(this.mMilanDay, this.isisMilanDayLoading, 14, 50, 16, 45, this.isMilanDayCloseLoading, this.showMilanDayCard)
// alert(updatedOpenLoading + updatedCloseLoading +updatedLoadingCard)
// alert()
// // Assign the updated values to the global variables
//           this.isMilanDayLoading = updatedOpenLoading;
//           this.isMilanDayCloseLoading = updatedCloseLoading;
//           this.showMilanDayCard = updatedLoadingCard;
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


  isLoading() {
    return this.isVidharbhaDayLoading || this.isVidharbhaDayCloseLoading ||
      this.isMayurDayLoading || this.isMayurDayClosingLoading ||
      this.isVidharbhaNightLoading || this.isVidharbhaDayCloseLoading ||
      this.showJantaBazaarCard || this.showVidharbhaDayCard ||
      this.showTimeBazaarCard || this.showKalyanLoadingCard || this.showMilanDayCard ||
      this.showVidharbhaNightCard || this.showSrideviNightCard || this.showMadhurNightCard || this.showMilanNightCard
      || this.showMainBazaarCard
  }
}

//MORNING
