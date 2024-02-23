import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {HourlyModel} from "../main/main.component";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit{
  date = new Date()
  formattedDate: string
  formattedTime: string
  hourlyData:any
  resultTime=''
  lastResult=''
  constructor(private readonly datePipe: DatePipe,
              private readonly mFirestore: AngularFirestore) {
    this.formattedDate = this.datePipe.transform(this.date!, 'dd-MM-yyyy')!
    this.formattedTime = this.datePipe.transform(this.date!, 'hh-aa')!
  }


  ngOnInit(): void {
    this.mFirestore.collection('daily').doc<HourlyModel>(this.formattedDate).valueChanges().subscribe(res => {
      this.hourlyData = res
this.resultTime = res?.resultTime ||'10:00AM'
      this.lastResult = this.hourlyData.lastResult
      // alert(JSON.stringify(res))
    })
  }
}
