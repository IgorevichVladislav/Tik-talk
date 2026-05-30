import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
import {chatActions} from '@tt/data-access/chats';
import {UiAction} from '@tt/shared/constants';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

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
        const isMyProfile = accountId === myId && profileId === 'me';

        this.isMyPage.set(isMyProfile);
        this.subscriptionId.set(accountId);

        this.store.dispatch(profileActions.getSubscribersById({account_id: accountId}));

        if (isMyProfile) return this.store.select(selectProfile);

        this.store.dispatch(profileActions.getAccount({accountId: accountId}));

        return this.store.select(selectAccount);
      }))

  readonly profileButtonInfo = computed(() => {
    if (this.isMyPage()) {
      return {
        description: UiAction.Edit,
        icon: 'settings',
      }
    }

    return {
      description: UiAction.Write,
      icon: 'send-message',
    }
  });

  onProfileActionClick(userId: number) {
    if (this.isMyPage()) {
      this.router.navigate(['/profile', 'me', 'settings']);
      return;
    }
    this.store.dispatch(chatActions.createPersonalChat({user_id: userId}));
    //todo После dispatch идет перенаправление пользователя в активный чат через effect.
    return;
  }

  readonly isSubscriptionProfile = computed(() => {
    const id = this.subscriptionId();
    if (!id) return;

    return !!this.subscriptionsEntity()[id];
  });

  toggleSubscription(profile: Profile) {
    if (this.isSubscriptionProfile()) {
      this.store.dispatch(profileActions.unsubscribe({account_id: profile.id}))
    }

    this.store.dispatch(profileActions.subscribe({profile}))
  }
}
