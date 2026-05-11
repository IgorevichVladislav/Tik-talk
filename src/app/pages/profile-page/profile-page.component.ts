import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {combineLatest, filter, switchMap, tap} from 'rxjs';
import {Store} from '@ngrx/store';

import {
  Profile,
  profileActions,
  selectAccount,
  selectProfile,
  selectSubscribersById, selectSubscriptionsEntity,
} from '@tt/data-access/profile';
import {ButtonComponent, SvgIconComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {PostFeedComponent, ProfileHeaderComponent} from '@tt/common-ui';
import {NavigationList} from '@tt/data-access/shared';

@Component({
  selector: 'tt-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    ButtonComponent,
    RouterLink,
    TtAvatarCircleComponent,
    SvgIconComponent,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {"class": "tt-profile-page"}
})
export class ProfilePageComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  private readonly subscriptionsEntity = this.store.selectSignal(selectSubscriptionsEntity);
  readonly isMyPage = signal<boolean>(false);
  readonly subscriptionId = signal<number | null>(null);

  readonly myProfile$ = this.store.select(selectProfile);
  readonly subscribers = this.store.selectSignal(selectSubscribersById(6));

  readonly profile$ = combineLatest([this.route.params, this.myProfile$])
    .pipe(
      filter(([_, profile]) => profile?.id !== undefined),
      tap(profile => profile.map(res => console.log(res?.id))),
      switchMap(([{profileId}, profile]) => {
        const myId = profile?.id;
        const isMyRoute = profileId === 'me';

        const accountId = isMyRoute ? myId! : Number(profileId);
        const isMyProfile = accountId === myId;

        this.isMyPage.set(isMyProfile);
        this.subscriptionId.set(accountId);

        this.store.dispatch(profileActions.getSubscribersById({account_id: accountId}));

        if (isMyProfile) return this.store.select(selectProfile);

        this.store.dispatch(profileActions.getAccount({accountId: accountId}));

        return this.store.select(selectAccount);
      }))

  readonly profileActionRedirect = computed<NavigationList>(() => {
    if (this.isMyPage()) {
      return {
        description: 'Редактировать',
        icon: 'settings',
        link: ['/profile', 'me', 'settings']
      }
    }

    return {
      description: 'Написать',
      icon: 'send-message',
      link: ['']
    }
  });

  private readonly isSubscriptionProfile = computed(() => {
    const id = this.subscriptionId();
    if (!id) return;

    return !!this.subscriptionsEntity()[id];
  })

  accountActionRedirect(profile: Profile) {
    if (this.isSubscriptionProfile()) {
      return {
        icon: 'subscriber',
        action: () => this.store.dispatch(profileActions.unsubscribe({account_id: profile.id}))
      }
    }

    return {
      icon: 'subscribe',
      action: () => this.store.dispatch(profileActions.subscribe({profile}))
    }
  }
}
