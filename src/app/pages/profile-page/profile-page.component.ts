import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {combineLatest, filter, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';

import {
  profileActions,
  selectAccount,
  selectProfile,
  selectSubscribersById,
} from '@tt/data-access/profile';
import {ProfileHeaderComponent} from '@tt/common-ui';
import {ButtonComponent, SvgIconComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {NavigationList} from '@tt/data-access/shared';
import {PostFeedComponent} from '../../common-ui/post';

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

  readonly isMyPage = signal<boolean>(false);

  readonly myProfile$ = this.store.select(selectProfile);
  readonly subscribers = this.store.selectSignal(selectSubscribersById(6));

  readonly profile$ = combineLatest([this.route.params, this.myProfile$])
    .pipe(
      filter(([_, profile]) => profile?.id !== undefined),
      switchMap(([{profileId}, profile]) => {
        const myId = profile?.id;
        const isMyRoute = profileId === 'me';

        const accountId = isMyRoute ? myId! : Number(profileId);
        const isMyProfile = accountId === myId;

        this.isMyPage.set(isMyProfile);

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
  })
}
