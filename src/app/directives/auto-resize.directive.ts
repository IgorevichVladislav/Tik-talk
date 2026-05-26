import {AfterViewInit, DestroyRef, Directive, ElementRef, inject, Renderer2} from '@angular/core';
import {debounceTime, fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Directive({
  selector: '[autoResize]',
  standalone: true,
})

export class AutoResizeDirective implements AfterViewInit {
  private readonly hostElement = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly r2 = inject(Renderer2);

  ngAfterViewInit() {
    this.resizeElement();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resizeElement());
  }

  private resizeElement() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 25;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
