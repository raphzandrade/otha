import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) { 
    this.highlight('transparent', 'var(--text-gray)');
    this.el.nativeElement.style.fontFamily = "var(--font-primary)";
    this.el.nativeElement.style.fontWeight = "bold";
    this.el.nativeElement.style.borderRadius = "var(--button-border-radius)";
    this.el.nativeElement.style.padding = "0.5rem 1rem";
    this.el.nativeElement.style.border = "0.125rem solid var(--brand-primary)";
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('var(--brand-primary)', 'var(--text-white)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('transparent', 'var(--text-gray)');
  }

  private highlight(backgroundColor: string, color: string) {
    this.el.nativeElement.style.backgroundColor = backgroundColor;
    this.el.nativeElement.style.color = color;
  }
}
