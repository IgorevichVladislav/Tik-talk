import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {ProfileCardComponent} from '@tt/common-ui';
import {profileActions, selectTestAccounts} from '@tt/data-access/profile';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-search-page'},
})
export class SearchPageComponent implements OnInit {
  private readonly store = inject(Store);

  readonly pageMode = input<'search' | 'subscribers' | 'subscriptions'>('search');
  testAccountsStorage = this.store.selectSignal(selectTestAccounts);

  ngOnInit() {
    this.store.dispatch(profileActions.getTestAccounts());
  }
}
