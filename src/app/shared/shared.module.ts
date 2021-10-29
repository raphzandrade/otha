// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';



@NgModule({
  declarations: [
  ],
  exports: [ComponentsModule, DirectivesModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
