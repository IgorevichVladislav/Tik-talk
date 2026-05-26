import {DestroyRef, Directive, ElementRef, inject} from '@angular/core';
import {outputFromObservable, takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, fromEvent} from 'rxjs';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  dr = inject(DestroyRef);

clickOutside = outputFromObservable(
  fromEvent<MouseEvent>(document, 'click')
    .pipe(
      takeUntilDestroyed(this.dr),
      filter(event => !this.elementRef.nativeElement.contains(event.target as Node)))
);
}
