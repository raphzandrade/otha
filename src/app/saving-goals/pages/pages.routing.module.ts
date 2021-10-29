import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { SimulationPageComponent } from './simulation-page/simulation-page.component';

const routes: Routes = [
    { path: 'selection', component: SelectionPageComponent },
    { path: 'simulation/:id', component: SimulationPageComponent },
    { path: '**', redirectTo: 'selection'}
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SavingGoalsPagesRoutingModule { }
