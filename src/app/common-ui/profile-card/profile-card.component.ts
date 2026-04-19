import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';

import {
  Profile,
  profileActions,
  selectSubscriptionsEntity
} from '@tt/data-access/profile';
import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';

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
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private readonly subscriptionsEntity = this.store.selectSignal(selectSubscriptionsEntity);

  readonly profile = input.required<Profile>();

  readonly isSubscriptionProfile = computed((): boolean => {
    const profileId = this.profile().id;

    return !!this.subscriptionsEntity()[profileId];
  });

  private subscribe() {
    const profile = this.profile();
    if (!profile) return;

    this.store.dispatch(profileActions.subscribe({profile: profile}));
  }

  unsubscribe() {
    const profile = this.profile();
    if (!profile) return;

    this.store.dispatch(profileActions.unsubscribe({account_id: profile.id}));
  }

  readonly getSubscriptionAction = computed(() => {
    if (this.isSubscriptionProfile()) {
      return {
        description: 'Написать',
        icon: 'send-message',
        action: () => {
          this.router.navigate(['profile/me'])
        }
      };
    }

    return {
      description: 'Подписаться',
      icon: 'subscribe',
      action: () => this.subscribe(),
    };
  });
}
