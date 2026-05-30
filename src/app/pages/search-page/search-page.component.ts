import {ChangeDetectionStrategy, Component, computed, effect, inject, input} from '@angular/core';
import {Store} from '@ngrx/store';

import {ProfileFilterComponent} from './components/profile-filter/profile-filter.component';
import {profileActions, selectAccounts, selectSubscribers, selectSubscriptions} from '@tt/data-access/profile';
import {ProfileCardComponent} from '@tt/common-ui';
import {AutoResizeDirective} from '@tt/directives';
import {SearchPageMode} from '@tt/shared/constants';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFilterComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-search-page'},
  hostDirectives: [AutoResizeDirective]
})
export class SearchPageComponent {
  private readonly store = inject(Store);

  readonly pageMode = input<SearchPageMode>(SearchPageMode.Search);

  private readonly userAccounts = this.store.selectSignal(selectAccounts);
  private readonly subscribersAccounts = this.store.selectSignal(selectSubscribers);
  private readonly subscriptionsAccounts = this.store.selectSignal(selectSubscriptions);

  constructor() {

    effect(() => {
      this.store.dispatch(profileActions.restoreSearchFiltration());

      const pageMode = this.pageMode();
      if (pageMode === SearchPageMode.Subscribers) {
        this.store.dispatch(profileActions.getSubscribers({}));
      } else if (pageMode === SearchPageMode.Subscriptions) {
        this.store.dispatch(profileActions.getSubscriptions({}));
      } else {
        this.store.dispatch(profileActions.getAccounts({}));
      }
    });
  }

  readonly getRenderAccounts = computed(() => {
    const pageMode = this.pageMode();
    if (pageMode === SearchPageMode.Subscribers) {
      return this.subscribersAccounts();
    } else if (pageMode === SearchPageMode.Subscriptions) {
      return this.subscriptionsAccounts();
    } else {
      return this.userAccounts();
    }
  });
}
