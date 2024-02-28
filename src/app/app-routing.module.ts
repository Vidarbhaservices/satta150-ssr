import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyPanelComponent} from "./my-panel/my-panel.component";
import {MainComponent} from "./main/main.component";
import {AllCardsListComponent} from "./all-cards-list/all-cards-list.component";
import {DailyChartComponent} from "./daily-chart/daily-chart.component";
import {PanelChartComponent} from "./panel-chart/panel-chart.component";
import {JodiPanelComponent} from "./jodi-panel/jodi-panel.component";
import {MatkaJodiCountChartComponent} from "./pages/matka-jodi-count-chart/matka-jodi-count-chart.component";
import {DhanvarshaComponent} from "./pages/dhanvarsha/dhanvarsha.component";

const routes: Routes = [

  {
    path: '',
    component: MainComponent
  },
  // {
  //   path: '220-cards',
  //   component: AllCardsListComponent
  // },
  // {
  //   path: 'xpanel',
  //   component: PanelChartComponent
  // },

  {
    path: 'daily-chart',
    component: DailyChartComponent
  },
  {
    path: 'panel',
    component: MyPanelComponent
  },
  {
    path: 'jodi',
    component: JodiPanelComponent
  },
  {
    path: 'panel/:id',
    component: MyPanelComponent
  }, {
    path: 'jodi/:id',
    component: JodiPanelComponent
  },
  {
    path:'matka-jodi-count-chart',
    component:MatkaJodiCountChartComponent
  },
  {
    path:'dhanvarsha',
    component:DhanvarshaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
