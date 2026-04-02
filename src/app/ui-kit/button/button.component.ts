import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {SvgIconComponent} from '../svg-sprite/index';

type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'tt-button',
  imports: [
    SvgIconComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-button'}
})
export class ButtonComponent {
  type = input<ButtonType | null>("button");
  icon = input<string | null>(null);
}
