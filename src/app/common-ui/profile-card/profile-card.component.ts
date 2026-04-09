import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {Profile, ProfileService} from '@tt/data-access/profile';
import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'tt-profile-card',
  imports: [
    ButtonComponent,
    TtAvatarCircleComponent,
    RouterLink,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-profile-card'}
})
export class ProfileCardComponent {
  private readonly profileService = inject(ProfileService);

  isSubscriptionProfile = signal<boolean>(false);

  readonly profile = input.required<Profile>();

  getSubscriptionAction = computed(() => {
    const id = this.profile().id;

    if (this.isSubscriptionProfile()) {
      return {
        description: 'Написать',
        icon: 'send-message',
      }
    }

    return {
      description: 'Подписаться',
      icon: 'subscribe',
    }
  })

  async subscribe(id: number) {
    return await firstValueFrom(this.profileService.subscribe(id));
  }

  async unsubscribe(id: number) {
    return await firstValueFrom(this.profileService.unsubscribe(id));

  }

}
