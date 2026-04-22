import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {Avatar} from '@tt/data-access/profile';
import {ImgUrlPipe} from '../pipes/index';

@Component({
  selector: 'tt-avatar-circle',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './tt-avatar-circle.component.html',
  styleUrl: './tt-avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-avatar-circle'
  }
})
export class TtAvatarCircleComponent {
  readonly avatarData = input<Avatar | null>(null);

  readonly size = input(32, {
    transform: (value: string) => Number(value),
  });
}
