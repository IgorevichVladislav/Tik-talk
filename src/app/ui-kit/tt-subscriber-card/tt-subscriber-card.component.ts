import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TtAvatarCircleComponent} from '@tt/ui-kit';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-subscriber-card',
  imports: [
    TtAvatarCircleComponent,
  ],
  templateUrl: './tt-subscriber-card.component.html',
  styleUrl: './tt-subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-subscriber-card'
  }
})
export class TtSubscriberCardComponent {
  profile = input.required<Profile>();
}
