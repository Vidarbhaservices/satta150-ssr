import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Timestamp} from "@angular/fire/firestore";

interface Guessing {
    market: Market;
    line1: string;
    line2: string;
    line3: string;
    updatedAt: Timestamp;
}

interface Market {
    id: string,
    name: string
}

@Component({
    selector: 'app-guessing',
    templateUrl: './guessing.component.html',
    styleUrl: './guessing.component.scss'
})
export class GuessingComponent implements OnInit {
    mMadhurDay: Guessing | undefined
    mMadhurNight: Guessing | undefined
    mMilanDay: Guessing | undefined
    mMilanNight: Guessing | undefined
    mKalyan: Guessing | undefined
    mTimebazaar: Guessing | undefined
    mMainBazaar: Guessing | undefined
mNotice:Guessing|undefined
// mMainBazaar:Guessing|undefined


    constructor(private readonly mFirestore: AngularFirestore) {


    }

    ngOnInit(): void {
        this.fetchGuessing()
    }

    private fetchGuessing() {
        this.mFirestore.doc('Guessing/guessing').get().subscribe(res => {
            const data = res.data()
// @ts-ignore
            this.mKalyan = data['kalyan'] as Guessing
// @ts-ignore
            this.mMadhurDay = data['madhur-day'] as Guessing
            // @ts-ignore
            this.mMilanDay = data['milan-day'] as Guessing
// @ts-ignore
            this.mMadhurNight = data['madhur-night'] as Guessing
// @ts-ignore
            this.mTimebazaar = data['timebazaar'] as Guessing
// @ts-ignore
            this.mMainBazaar = data['main-bazaar'] as Guessing
// @ts-ignore
            this.mMilanNight = data['milan-night'] as Guessing
// @ts-ignore
            this.mNotice = data['notice'] as Guessing

        })
    }
}
