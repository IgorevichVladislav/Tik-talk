import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '@tt/data-access/profile';
import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-profile-card',
  imports: [
    ButtonComponent,
    TtAvatarCircleComponent
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-profile-card'}
})
export class ProfileCardComponent {
  profile = input.required<Profile>();
}
