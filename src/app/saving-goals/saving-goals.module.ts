// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SavingGoalsPagesModule } from './pages/pages.module';
import { GoalsService } from './services/goals.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SavingGoalsPagesModule,
  ],
  providers: [GoalsService]
})
export class SavingGoalsModule { }
