import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, startWith} from 'rxjs';
import {Store} from '@ngrx/store';

import {TtInputComponent} from '@tt/ui-kit';
import {
  profileActions,
  selectSavedSearchProfileFilter, selectSavedSearchSubscribersFilter,
  selectSavedSearchSubscriptionFilter
} from '@tt/data-access/profile';
import {SearchPageMode} from '@tt/shared/constants';

@Component({
  selector: 'tt-profile-filter',
  imports: [
    TtInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filter.component.html',
  styleUrl: './profile-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tt-profile-filter',
  }
})
export class ProfileFilterComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  savedProfileSearchFilters = this.store.selectSignal(selectSavedSearchProfileFilter);
  savedSubscriptionSearchFilters = this.store.selectSignal(selectSavedSearchSubscriptionFilter);
  savedSubscribersSearchFilter = this.store.selectSignal(selectSavedSearchSubscribersFilter);

  readonly pageMode = input<SearchPageMode>(SearchPageMode.Search);

  readonly searchForm = this.formBuilder.group({
    firstName: this.formBuilder.control<string>(''),
    lastName: this.formBuilder.control<string>(''),
    stack: this.formBuilder.control<string[]>([]),
    city: this.formBuilder.control<string>(''),
  })

  constructor() {
    effect(() => {
      const pageMode = this.pageMode();

      if (pageMode === SearchPageMode.Subscribers) {
        this.searchForm.patchValue(this.savedSubscribersSearchFilter(), {emitEvent: false});
      } else if (pageMode === SearchPageMode.Subscriptions) {
        this.searchForm.patchValue(this.savedSubscriptionSearchFilters(), {emitEvent: false});
      } else {
        this.searchForm.patchValue(this.savedProfileSearchFilters(), {emitEvent: false});
      }
    });

    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.getRawValue()),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        const pageMode = this.pageMode();
        const value = this.searchForm.getRawValue();

        if (pageMode === SearchPageMode.Subscribers) {
          this.store.dispatch(profileActions.getSubscribers({
            subscribersFilter: {
              ...value,
              firstLastName: [value.firstName, value.lastName]
                .filter(Boolean)
                .join(' ')
            }
          }))
        } else if (pageMode === SearchPageMode.Subscriptions) {
          this.store.dispatch(profileActions.getSubscriptions({subscriptionsFilter: value}));
        } else {
          this.store.dispatch(profileActions.getAccounts({accountsFilter: value}))
        }
      })
  }
}
