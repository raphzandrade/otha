import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { DefaultLayoutComponent } from './shared/components/default-layout/default-layout.component';

// modules
import { SharedModule } from './shared/shared.module';

const routes: Routes = [{
  path: 'saving-goals', component: DefaultLayoutComponent, loadChildren: () => import('./saving-goals/saving-goals.module').then(m => m.SavingGoalsModule)
}, {
  path: '**', redirectTo: 'saving-goals'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
