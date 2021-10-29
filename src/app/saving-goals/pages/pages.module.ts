// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pages
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { SimulationPageComponent } from './simulation-page/simulation-page.component';


// modules
import { SavingGoalsPagesRoutingModule } from './pages.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [SelectionPageComponent, SimulationPageComponent],
  imports: [
    CommonModule,
    SavingGoalsPagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: []
})
export class SavingGoalsPagesModule { }
