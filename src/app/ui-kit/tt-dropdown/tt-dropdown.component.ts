import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

import {ButtonComponent} from '../button';
import {ClickOutsideDirective} from '@tt/directives/click-outside.directive';

export interface TtDropdownList {
  icon?: string | null;
  description: string;
  action: () => void;
  disabled?: boolean;
  hoverColor?: string;
}

@Component({
  selector: 'tt-dropdown',
  imports: [
    ButtonComponent
  ],
  templateUrl: './tt-dropdown.component.html',
  styleUrl: './tt-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-dropdown'},
  hostDirectives: [ClickOutsideDirective]
})
export class TtDropdownComponent {
  dropdownList = input<TtDropdownList[]>([]);

  itemClicked = output<TtDropdownList>();

  isOpen = input<boolean>(false);

  onItemClick(item: TtDropdownList) {
    if (item.disabled) return;

    item.action();

    return this.itemClicked.emit(item);
  }
}
