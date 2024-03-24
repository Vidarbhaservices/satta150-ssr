import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DatePipe, WeekDay} from "@angular/common";
import {ref} from "@angular/fire/storage";
import {ActivatedRoute} from "@angular/router";

export interface WeekModel {
    startDate: string
    week: string
    sr: string
    endDate: string|Date|any
    Mon_opening: string
    Mon_dp?: boolean
    Tue_dp?: boolean
    Wed_dp?: boolean
    Thu_dp?: boolean
    Fri_dp?: boolean
    Sat_dp?: boolean
    Sun_dp?: boolean
    Mon_openingDigit: string
    Mon_closing: string
    Mon_closingDigit: string
    Tue_openingDigit: string
    Tue_opening: string
    Tue_closing: string
    Tue_closingDigit: string
    Wed_opening: string,
    Wed_openingDigit: string,
    Wed_closing: string,
    Wed_closingDigit: string,
    Thu_opening: string
    Thu_openingDigit: string
    Thu_closing: string
    Thu_closingDigit: string
    Fri_opening: string
    Fri_openingDigit: string
    Fri_closing: string
    Fri_closingDigit: string
    Sat_opening: string
    Sat_openingDigit: string
    Sat_closing: string
    Sat_closingDigit: string
    Sun_opening: string
    Sun_openingDigit: string
    Sun_closing: string
    Sun_closingDigit: string

}

@Component({
    selector: 'app-my-panel',
    templateUrl: './my-panel.component.html',
    styleUrls: ['./my-panel.component.scss']
})
export class MyPanelComponent {
    tableData: WeekModel[] = []
    date = new Date()
    title?: string
    slot: any
showSunday=false
    constructor(private readonly mFirestore: AngularFirestore,
                private readonly route: ActivatedRoute,

                private readonly datePipe: DatePipe) {
        this.route.params.subscribe(param => {
            this.slot = param['id']
            // alert(this.slot)
            if (this.slot == 'vidharbha-day') {
                this.title = "Vidharbha Morning"
            this.showSunday=true
            }
            if (this.slot == 'vidharbha-night') {
                this.title = "Vidharbha Night"
                this.showSunday=true
            }
            else if (this.slot == 'mayur-day') this.title = "Janta Bazaar"
            else if (this.slot == 'sridevi') {
                this.title = "Sridevi"
                this.showSunday=true
            }
            else if (this.slot == 'mayur-day') {
                this.title = "Janta Bazaar"
                this.showSunday=true
            }
            else if (this.slot == 'madhur-morning') {
                this.title = "Madhur Morning"
                this.showSunday =true
            }
            else if (this.slot == 'time-bazaar') this.title = "Time Bazar"
            else if (this.slot == 'milan-day') this.title = "Milan Day"
            else if (this.slot == 'kalyan') this.title = "Kalyan"
            else if (this.slot == 'sridevi-night') this.title = "Sridevi Night"
            else if (this.slot == 'madhur-night') this.title = "Madhur Night"
            else if (this.slot == 'milan-night') this.title = "Milan Night"
            else if (this.slot == 'main-bazaar-mumbai') this.title = "Main Bazaar"
        })
        this.tableData = []

        this.mFirestore.collection<WeekModel>(this.slot + '-week', ref => ref.orderBy('endDate', 'asc')).valueChanges().subscribe(res => {
            // alert(this.datePipe.transform(this.date, 'w'))
            this.tableData = []

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

function hasSameTwoDigits(str: string): boolean {
    // Check if the string has exactly three digits
    if (str.length !== 3 || !/^\d+$/.test(str)) {
        return false;
    }

    // Convert the string to an array of individual digits
    const digits = str.split('').map(Number);

    // Check if any two digits are the same
    if (digits[0] === digits[1] || digits[1] === digits[2] || digits[0] === digits[2]) {
        return true;
    }

    return false;
}
// Function to convert string to date
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


