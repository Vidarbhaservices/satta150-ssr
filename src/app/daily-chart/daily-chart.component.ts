import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {WeekModel} from "../my-panel/my-panel.component";
import {Timestamp} from "@angular/fire/firestore";
interface DailyChartModel {
  date: string | null;
  timestamp: Timestamp | null;
  m10am_combination: string;
  m10am_combinationDigit: string;
  m11am_combination: string;
  m11am_combinationDigit: string;
  m12am_combination: string;
  m12am_combinationDigit: string;
  m1pm_combination: string;
  m1pm_combinationDigit: string;
  m2pm_combination: string;
  m2pm_combinationDigit: string;
  m3pm_combination: string;
  m3pm_combinationDigit: string;
  m4pm_combination: string;
  m4pm_combinationDigit: string;
  m5pm_combination: string;
  m5pm_combinationDigit: string;
  m6pm_combination: string;
  m6pm_combinationDigit: string;
  m7pm_combination: string;
  m7pm_combinationDigit: string;
  m8pm_combination: string;
  m8pm_combinationDigit: string;
}
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss']
})
export class DailyChartComponent {
  tableData: DailyChartModel[] = []
  date = new Date()
  title? : 'Vidharbha Day' | 'Vidharbha Night'
  slot:any
  constructor(private readonly mFirestore: AngularFirestore,
              private  readonly route:ActivatedRoute,
              private readonly datePipe: DatePipe) {

    this.tableData =[]

    this.mFirestore.collection<DailyChartModel>('daily-chart',ref=>ref.orderBy('timestamp','asc')).valueChanges().subscribe(res => {
      // alert(this.datePipe.transform(this.date, 'w'))
      this.tableData=[]

      res.forEach(week=>{
        this.tableData.push(week)
      })
    })
  }

//{ 'startDate-to-EndDate,opening,digits,close
// }



  getFirstCharacter(str: string): string {
    if (str.length >= 1) {
      return str[0];
    } else {
      return ''
    }
  }

  getSecondCharacter(str: string): string {
    if (str.length >= 2) {
      return str[1];
    } else {
      return ``
    }
  }

  getThirdCharacter(str: string): string {
    if (str.length >= 3) {
      return str[2];
    } else {
      return ''
    }
  }
}
