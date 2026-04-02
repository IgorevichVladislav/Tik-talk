import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TtAvatarCircleComponent} from '@tt/ui-kit';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-profile-header',
  imports: [
    TtAvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-profile-header',
    '[class.tt-profile-header__profile-info--vertical]': `positionInfo() === 'vertical'`,
    '[class.tt-profile-header__profile-info--horizontal]': `positionInfo() === 'horizontal'`,
  }
})
export class ProfileHeaderComponent {
  readonly profile = input<Profile>();
  readonly positionInfo = input<'horizontal' | 'vertical'>('horizontal');
}
