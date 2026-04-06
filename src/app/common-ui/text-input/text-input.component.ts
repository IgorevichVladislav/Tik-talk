import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Profile} from '@tt/data-access/profile';

type Avatar = Pick<Profile, 'avatarUrl' | 'username' | 'id'>

@Component({
  selector: 'tt-text-input',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-text-input'
  }
})
export class TextInputComponent {
  avatarData = input<Avatar>();
}
