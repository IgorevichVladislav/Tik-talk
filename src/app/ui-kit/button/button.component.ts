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
  host: {
    class: 'tt-button',
    '[attr.data-mode]': 'mode()',
  }
})
export class ButtonComponent {
  readonly type = input<ButtonType>("button");
  readonly mode = input<'default' | 'black'>('default');
  readonly icon = input<string | null>(null);
}
