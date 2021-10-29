import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCard]'
})
export class CardDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = "var(--background-white)";
    this.el.nativeElement.style.borderRadius = "var(--card-border-radius)";
    this.el.nativeElement.style.boxShadow = "var(--card-box-shadow)";
  }

}
