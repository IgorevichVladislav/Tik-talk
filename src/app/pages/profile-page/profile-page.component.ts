import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {switchMap} from 'rxjs';
import {Store} from '@ngrx/store';

import {ProfileHeaderComponent} from '@tt/common-ui';
import {profileActions, selectAccount, selectProfile} from '@tt/data-access/profile';
import {TtInputComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-profile-page',
  imports: [
    ProfileHeaderComponent,
    TtInputComponent,
    AsyncPipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {"class": "tt-profile-page"}
})
export class ProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  profile$ = this.route.params
    .pipe(switchMap(({profileId}) => {
      if (profileId === 'me') return this.me$;

      this.store.dispatch(profileActions.getAccount({accountId: +profileId}));

      return this.store.select(selectAccount);
    }))

  me$ = this.store.select(selectProfile);

  ngOnInit() {
    this.store.dispatch(profileActions.getMe());
  }
}
