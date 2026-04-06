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
  type = input<ButtonType>("button");
  mode = input<'default' | 'black'>('default');
  icon = input<string | null>(null);
}
