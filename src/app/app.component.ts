import { Component, OnInit } from '@angular/core';
import { Meta } from "@angular/platform-browser";
import {NgxUiLoaderConfig, NgxUiLoaderService, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  deferredPrompt: any;
  showInstallButton: boolean = false;

  title = 'Satta150 | VidharbhaSatta | MATKA  | satta150 |Vidharbha Satta';

  constructor(private meta: Meta,
              private ngxLoader: NgxUiLoaderService) {

    // const pageTitle =' SATTA 150 | satta150 | | SattaMatka | Vidharbha Satta';
    // const pageDescription = `SATTA150 | KALYAN MATKA | MATKA RESULT | SATTA MATKA | MATKA PANNA | TODAY | SATKA MATKA | VIDHARBHASATTA | MATKA RESULTS | MATKA CHART | MATKA JODI | FULL RATE GAME | MATKA WAPKA | ALL MATKA RESULT LIVE ONLINE`
    //
    // this.meta.updateTag({ name: 'title', content: pageTitle });
    // this.meta.updateTag({ name: 'description', content: pageDescription });
    // // You can also set other meta tags like keywords, og:image, etc.
    // // Example:
    // this.meta.updateTag({ name: 'keywords', content: 'satta 150, vidharbhasatta,  sattamatka, matka, satta150, vidharbhasatta.in, satta150.com' });
    // this.meta.updateTag({ property: 'og:title', content: pageTitle });
    // this.meta.updateTag({ property: 'og:description', content: pageDescription });

    // window.addEventListener('beforeinstallprompt', (event: Event) => {
    //   event.preventDefault();
    //   this.deferredPrompt = event;
    //   this.showInstallButton = true; // Show the install button
    // });

  }
  ngOnInit(): void {
    // this.ngxLoader.start();
    // setTimeout(() => {
      // this.ngxLoader.stop(); // stop foreground spinner of the master loader with 'default' taskId
    // }, 2000);
  // if(window)  window.addEventListener('beforeinstallprompt', (event) => {
  //   console.log('window found')
  //     event.preventDefault();
  //     this.deferredPrompt = event;
  //     this.showInstallButton = true; // Show the install button
  //   });
  }

  addToHomeScreen() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false; // Hide the install button after prompt
      });
    }
  }
}
