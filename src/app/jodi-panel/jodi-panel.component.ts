import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {WeekModel} from "../my-panel/my-panel.component";

@Component({
  selector: 'app-jodi-panel',
  templateUrl: './jodi-panel.component.html',
  styleUrls: ['./jodi-panel.component.scss']
})
export class JodiPanelComponent {
  tableData: WeekModel[] = []
  date = new Date()
  title? : string
  slot:any
  showSunday=false

  constructor(private readonly mFirestore: AngularFirestore,
              private  readonly route:ActivatedRoute,
              private readonly datePipe: DatePipe) {
    this.route.params.subscribe(param=>{
      this.slot = param['id']
      // alert(this.slot)
      if(this.slot =='vidharbha-day') {
        this.title = "Vidharbha Day"
        this.showSunday=true

      }
      if(this.slot =='vidharbha-night') {
        this.title = "Vidharbha Night"
        this.showSunday=true

      }
      else  if(this.slot =='mayur-day') {
        this.title = "Janta Bazaar"
        this.showSunday=true

      }
      else  if(this.slot =='sridevi') {
        this.title = "Sridevi"
        this.showSunday=true
      }
      else  if(this.slot =='madhur-morning') {
        this.title = "Madhur Morning"
        this.showSunday=true

      }
      else  if(this.slot =='time-bazaar') this.title ="Time Bazar"
      else  if(this.slot =='milan-day') this.title ="Milan Day"
      else  if(this.slot =='kalyan') this.title ="Kalyan"
      else  if(this.slot =='sridevi-night') this.title ="Sridevi Night"
      else  if(this.slot =='madhur-night') this.title ="Madhur Night"
      else  if(this.slot =='milan-night') this.title ="Milan Night"
      else  if(this.slot =='main-bazaar-mumbai') this.title ="Main Bazaar"

      else this.title ="Vidharbha Night"
    })
    this.tableData =[]

    this.mFirestore.collection<WeekModel>(this.slot+'-week',ref=>ref.orderBy('week','asc')).valueChanges().subscribe(res => {
      // alert(this.datePipe.transform(this.date, 'w'))
      this.tableData=[]
      res.forEach(week => {
        let d = convertStringToDate(<string>week.endDate!!)
        // console.log(d)
        week.endDate = d!!
        this.tableData.push(week)

// Sorting the array based on endDate
        this.tableData.sort((a, b) =>a.endDate.getTime() - b.endDate.getTime());
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
function convertStringToDate(dateString: string): Date | null {
  const parts = dateString.split('-');

  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);

    // Check if the parsed values are valid
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  // Return null if parsing fails
  return null;
}
