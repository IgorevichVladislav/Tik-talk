import {Directive, ElementRef, inject} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
import {filter, fromEvent} from 'rxjs';

@Directive({
  selector: '[ttClickOutside]',
})
export class ClickOutsideDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

ttClickOutside = outputFromObservable(
  fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => !this.elementRef.nativeElement.contains(event.target as Node))
    )
);
}
