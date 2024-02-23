import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser} from "@angular/common";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Meta, Title} from "@angular/platform-browser";
 import {SwUpdate} from "@angular/service-worker";

export interface HourlyModel {
    timestamp: number
    date: string
    m10am?: string
    m10amDigit?: string
    m11am?: string
    m11amDigit?: string
    m12am?: string
    m12amDigit?: string
    m1pm?: string
    m1pmDigit?: string
    m2pm?: string
    m2pmDigit?: string
    m3pm?: string
    m3pmDigit?: string
    m4pm?: string
    m4pmDigit?: string
    m5pm?: string
    m5pmDigit?: string
    m6pm?: string
    m6pmDigit?: string
    m7pm?: string
    m7pmDigit?: string
    m8pm?: string
    m8pmDigit?: string
    resultTime: string
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    date = new Date()
    formattedDate: string
    hourlyData: HourlyModel | null | undefined
    deferredPrompt: any;
    showInstallButton: boolean = false;
    title = '  Satta 150 | VidharbhaSatta  | SATTAMATKA | satta150 | KALYAN';
    constructor(private readonly datePipe: DatePipe,
                private meta: Meta,
                private titleService: Title,
                private swUpdate: SwUpdate,

                private readonly mFirestore: AngularFirestore) {
        this.formattedDate = this.datePipe.transform(this.date!, 'dd-MM-yyyy')!
        // this.setMetaTags()
      // const pageTitle = '  SATTA150 | VIDHARBHASATTA | SATTA 150 | SATTAMATKA  ';
      // this.titleService.setTitle(this.title);
      //
      // const pageDescription = 'Explore Satta150 for the best Satta Matka, Kalyan Matka, Matka Result, Satta, Matka experience. Get accurate results, live updates, and expert tips.  SATTA150 |  Vidharbha satta |  SATTAMATKA | VIDHARBHASATTA | SATTA150';
      // this.meta.updateTag({name: 'title', content: pageTitle});
      // this.meta.updateTag({name: 'description', content: pageDescription});
      // // You can also set other meta tags like keywords, og:image, etc.
      // // Example:
      // this.meta.updateTag({
      //   name: 'keywords',
      //   content: 'satta 150, dpboss , sattamatka, vidharbha satta, matka, satta150, vidharbhasatta.in, satta150.com xxx'
      // });
      // this.meta.updateTag({property: 'og:title', content: pageTitle});
      // this.meta.updateTag({property: 'og:description', content: pageDescription});
    }

    private setupBeforeInstallPrompt(): void {
        try {
            if (window!= undefined && window) {
                window.addEventListener('beforeinstallprompt', (event) => {
                    this.deferredPrompt = event;
                    this.showInstallButton = true;
                });
            }
        } catch (e) {
            console.error(e);
        }
    }


    ngOnInit(): void {
        this.mFirestore.collection('daily').doc<HourlyModel>(this.formattedDate).valueChanges().subscribe(res => {
            this.hourlyData = res
        })
     //   this.setupBeforeInstallPrompt()
        // this.checkForUpdates()

    }

    addToHomeScreen() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    // console.log('User accepted the A2HS prompt');
                } else {
                    // console.log('User dismissed the A2HS prompt');
                }
                this.deferredPrompt = null;
                this.showInstallButton = true; // Hide the install button after prompt
            });
        }
    }

    installPWA(): void {
        if (this.deferredPrompt) {
            // Show the install prompt
            this.deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                this.deferredPrompt = null;
            });
        }
    }

    private checkForUpdates(): void {
        try {
            this.swUpdate.checkForUpdate().then(() => {
                if (window) window.location.reload(); // Reload the page to apply updates and clear caches
            });
        } catch (e) {
            console.error(e);
        }
    }

    private setMetaTags() {
      const pageTitle = ' SATTA150 | VIDHARBHASATTA | SATTA 150 | SATTAMATKA  ';
      this.titleService.setTitle(this.title);

      const pageDescription = 'Explore Satta150 for the best Satta Matka, Kalyan Matka, Matka Result, Satta, Matka experience. Get accurate results and live updates. SATTA150 | SATTAMATKA | VIDHARBHASATTA | SATTA150';
      this.meta.updateTag({name: 'title', content: pageTitle});
      this.meta.updateTag({name: 'description', content: pageDescription});
      // You can also set other meta tags like keywords, og:image, etc.
      // Example:
      this.meta.updateTag({
        name: 'keywords',
        content: 'satta 150, dpboss , sattamatka, vidharbha satta, matka, satta150, vidharbhasatta.in, satta150.com'
      });
      this.meta.updateTag({property: 'og:title', content: pageTitle});
      this.meta.updateTag({property: 'og:description', content: pageDescription});
    }




    get10() {
        return this.hourlyData?.m10am || ''
    }

    get10digit() {
        return this.hourlyData?.m10amDigit?.toString() || '0'
    }

    get11() {
        return this.hourlyData?.m11am || ''
    }

    get11digit() {
        return this.hourlyData?.m11amDigit?.toString() || '0'
    }

    get12() {
        return this.hourlyData?.m12am || ''
    }

    get12digit() {
        return this.hourlyData?.m12amDigit?.toString() || '0'
    }

    get1() {
        return this.hourlyData?.m1pm || ''
    }

    get1digit() {
        return this.hourlyData?.m1pmDigit?.toString() || '0'
    }

    get2() {
        return this.hourlyData?.m2pm || ''
    }

    get2digit() {
        return this.hourlyData?.m2pmDigit?.toString() || '0'

    }

    get3() {
        return this.hourlyData?.m3pm || ''
    }

    get3digit() {
        return this.hourlyData?.m3pmDigit?.toString() || '0'
    }

    get4() {
        return this.hourlyData?.m4pm || ''
    }

    get4digit() {
        return this.hourlyData?.m4pmDigit?.toString() || '0'
    }

    get5() {
        return this.hourlyData?.m5pm || ''
    }

    get5digit() {
        return this.hourlyData?.m5pmDigit?.toString() || '0'
    }

    get6() {
        return this.hourlyData?.m6pm || ''
    }

    get6digit() {
        return this.hourlyData?.m6pmDigit?.toString() || '0'
    }

    get7() {
        return this.hourlyData?.m7pm || ''
    }
    get8() {
        return this.hourlyData?.m8pm || ''
    }

    get7digit() {
        return this.hourlyData?.m7pmDigit?.toString() || '0'
    }
    get8digit() {
        return this.hourlyData?.m8pmDigit?.toString() || '0'
    }
}
