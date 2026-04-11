import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {Profile, profileActions, selectAccounts, selectSubscriptions} from '@tt/data-access/profile';
import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Router, RouterLink} from '@angular/router';
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
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private readonly accountsList = this.store.selectSignal(selectAccounts);
  private readonly subscriptions = this.store.selectSignal(selectSubscriptions);

  readonly isSubscriptionProfile = computed((): boolean => {
    const profileId = this.profile().id;
    return this.subscriptions().some(subscription => subscription.id === profileId);
  });

  readonly profile = input.required<Profile>();

  getSubscriptionAction = computed(() => {
    const id = this.profile().id;

    if (this.isSubscriptionProfile()) {
      return {
        description: 'Написать',
        icon: 'send-message',
        action: () => {this.router.navigate(['profile/me'])}
      };
    }

    return {
      description: 'Подписаться',
      icon: 'subscribe',
      action: () => this.subscribe(),
    };
  });


  unsubscribe() {
    this.store.dispatch(profileActions.unsubscribe({ account_id: this.profile().id }));
  }

  subscribe() {
    console.log('subscribe clicked', this.profile().id);
    this.store.dispatch(profileActions.subscribe({ account_id: this.profile().id }));
  }

}
