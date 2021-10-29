import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { ButtonDirective } from './button/button.directive';
import { CardDirective } from './card/card.directive';


@NgModule({
  declarations: [
    ButtonDirective,
    CardDirective,
  ],
  exports: [ButtonDirective, CardDirective],
  imports: [
    CommonModule,
  ]
})
export class DirectivesModule { }
