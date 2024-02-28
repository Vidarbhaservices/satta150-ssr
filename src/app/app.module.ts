import { NgModule, isDevMode } from '@angular/core';
import {BrowserModule, provideClientHydration, withHttpTransferCacheOptions} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {HeaderComponent} from "./header/header.component";
import {FaqComponent} from "./faq/faq.component";
import {AllCardsListComponent} from "./all-cards-list/all-cards-list.component";
import {FooterComponent} from "./footer/footer.component";
import {CubeComponent} from "./cube/cube.component";
import {JodiPanelComponent} from "./jodi-panel/jodi-panel.component";
import {MyPanelComponent} from "./my-panel/my-panel.component";
import {MatkaJodiListComponent} from "./matka-jodi-list/matka-jodi-list.component";
import {MainComponent} from "./main/main.component";
import {DailyChartComponent} from "./daily-chart/daily-chart.component";
import {PanelChartComponent} from "./panel-chart/panel-chart.component";
import {CardListComponent} from "./card-list/card-list.component";
import {DisclaimerComponent} from "./disclaimer/disclaimer.component";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import {provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { TableComponent } from './table/table.component';
import { MatkaJodiCountChartComponent } from './pages/matka-jodi-count-chart/matka-jodi-count-chart.component';
import { DhanvarshaComponent } from './pages/dhanvarsha/dhanvarsha.component';
import { MatkaJoidFamilyChartComponent } from './pages/matka-joid-family-chart/matka-joid-family-chart.component';
import { PanelCountChartComponent } from './pages/panel-count-chart/panel-count-chart.component';
import { PanelTotalChartComponent } from './pages/panel-total-chart/panel-total-chart.component';
import { All220CardsComponent } from './pages/all-220-cards/all-220-cards.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#aaa2a2",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  fgsColor: "#e50e0e",
  pbColor: "#e9c5c5",
  logoUrl: "",
  logoPosition: "center-center",
  logoSize: 100,
  delay:500,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.cubeGrid, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 3, // progress bar thickness
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardListComponent,
    MatkaJodiListComponent,
    AllCardsListComponent,
    MainComponent,
    CubeComponent,
    DisclaimerComponent,
    PanelChartComponent,
    FaqComponent,
    MyPanelComponent,
    DailyChartComponent,
    JodiPanelComponent,
    TableComponent,
    MatkaJodiCountChartComponent,
    DhanvarshaComponent,
    MatkaJoidFamilyChartComponent,
    PanelCountChartComponent,
    PanelTotalChartComponent,
    All220CardsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxUiLoaderModule,
        // Import NgxUiLoaderModule with custom configuration globally
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => {
            const functions = getFunctions();

            return functions;
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            // enabled: false,
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:3000',
        }),
        NgOptimizedImage
    ],
  providers: [
    provideClientHydration(),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    DatePipe,
      provideHttpClient(withFetch()),
    provideClientHydration(
        withHttpTransferCacheOptions({
          includePostRequests: false,
        }),
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
