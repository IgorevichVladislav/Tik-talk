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
import {IconColors} from '@tt/tokens/icon-colors.type';

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
    '[attr.data-icon-color]': 'iconColor()',
    '[class.filled-active]': 'this.filledActive()'
  },
})
export class TtInputComponent implements ControlValueAccessor {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef, {self: true});
  cdr = inject(ChangeDetectorRef);

  readonly input = viewChild('input');

  readonly label = input<string | null>(null);
  readonly type = input<'text' | 'password' | 'number'>('text');
  readonly placeholder = input<string>('Введите данные');
  readonly autocomplete = input<string>('');
  readonly name = input<string>('');

  /** Позволяет подсвечивать border-color, когда данные введены в input и пользователь ушел из формы. Используется для поисковых форм. */
  readonly filledActive = input(false, {transform: booleanAttribute});
  /** Добавляет иконки в input */
  readonly mode = input<'search' | null>(null);
  /** Меняет цвет иконки в input */
  readonly iconColor = input<IconColors>("default");

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
