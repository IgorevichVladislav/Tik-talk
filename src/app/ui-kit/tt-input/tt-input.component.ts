import {
  booleanAttribute,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SvgIconComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-input',
  imports: [
    SvgIconComponent
  ],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TtInputComponent),
    multi: true
  }],
  host: {
    'class': 'tt-input',
    '[attr.data-mode]': 'this.mode()',
    '[class.filled-active]': 'this.filledActive()'
  },
})
export class TtInputComponent implements ControlValueAccessor {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef, {self: true});
  cdr = inject(ChangeDetectorRef);

  input = viewChild('input');

  label = input<string | null>(null);
  type = input<'text' | 'password' | 'number'>('text');
  placeholder = input<string>('Введите данные');
  autocomplete = input<string>('');
  name = input<string>('');

  /** Позволяет подсвечивать border-color, когда данные введены в input и пользователь ушел из формы. Используется для поисковых форм. */
  filledActive = input(false, {transform: booleanAttribute});
  /** Добавляет иконки в input */
  mode = input<'search' | null>(null);

  private onChange = (_: any) => {
  };
  private onTouched = () => {
  };

  value = signal<string | null>(null);
  disabled = signal<boolean>(false);

  writeValue(val: string | null): void {
    this.value.set(val);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
