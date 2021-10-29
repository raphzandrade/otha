import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './header/header.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';


// modules
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
