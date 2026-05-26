import {ChangeDetectionStrategy, Component, inject, input, model, output} from '@angular/core';

import {ButtonComponent} from '../button';
import {ClickOutsideDirective} from '@tt/directives';
import {TtColors} from '@tt/tokens/tt-colors.type';

export interface TtDropdown {
  icon?: string | null;
  description: string;
  action: () => void;
  disabled?: boolean;
  hoverColor?: TtColors;
}

@Component({
  selector: 'tt-dropdown',
  imports: [
    ButtonComponent,
  ],
  templateUrl: './tt-dropdown.component.html',
  styleUrl: './tt-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-dropdown'},
  hostDirectives: [ClickOutsideDirective]
})
export class TtDropdownComponent {
  private readonly clickOutsideDirective = inject(ClickOutsideDirective);

  readonly dropdownList = input<TtDropdown[]>([]);
  readonly itemClicked = output<TtDropdown>();

  readonly isOpen = model<boolean>(false);

  constructor() {
    this.clickOutsideDirective.clickOutside.subscribe(() => {
      if (!this.isOpen()) return;
      this.isOpen.set(false)
    });
  }

  onItemClick(item: TtDropdown) {
    if (item.disabled) return;

    item.action();

    this.itemClicked.emit(item);
    this.isOpen.set(false);
  }
}
