import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'tt-error',
  template: `<ng-content></ng-content>`,
  styleUrl: './tt-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TtErrorComponent {

}
