import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {combineLatest, map, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';

import {
  profileActions,
  selectAccount,
  selectProfile,
  selectSubscribers,
  selectSubscribersLimit
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

  readonly subscribersLimit = this.store.selectSignal(selectSubscribersLimit(6));
  readonly subscribers = this.store.selectSignal(selectSubscribers);

  myId$ = this.store.select(selectProfile).pipe(map(p => p?.id));

  profile$ = combineLatest([this.route.params, this.myId$])
    .pipe(switchMap(([{profileId}, myId$]) => {

      if (profileId === 'me' || Number(profileId) === myId$) {
        this.isMyPage.set(true);
        return this.store.select(selectProfile)
      }

      this.isMyPage.set(false);
      this.store.dispatch(profileActions.getAccount({accountId: Number(profileId)}));

      return this.store.select(selectAccount);
    }))

  profileActionRedirect = computed<NavigationList>(() => {
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
