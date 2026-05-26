import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[trimSpaces]',
  standalone: true,
  host: {
    '(keydown)': 'onKeyDown($event)',
    '(blur)': 'onBlur()',
  },
})
export class TrimSpacesDirective {
  private readonly ngControl = inject(NgControl, { optional: true });

  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === ' ' && input.selectionStart === 0) {
      event.preventDefault();
    }
  }

  onBlur() {
    const control = this.ngControl?.control;

    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  }
}
