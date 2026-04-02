import {Directive, ElementRef, inject, output} from '@angular/core';

@Directive({
  selector: '[ttClickOutside]',
  host: {
    '(document:click)': 'onclick($event)'
  }
})
export class ClickOutsideDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  onClickOutside = output();

  onclick(event: MouseEvent) {
    const targetElement = this.elementRef.nativeElement.contains(event.target as Element);
    if (!targetElement) {
      this.onClickOutside.emit();
    }
  }
}
