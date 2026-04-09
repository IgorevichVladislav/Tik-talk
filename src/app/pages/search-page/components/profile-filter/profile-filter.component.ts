import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {Store} from '@ngrx/store';

import {TtInputComponent} from '@tt/ui-kit';
import {Profile, profileActions} from '@tt/data-access/profile';
import {SearchPageMode} from '@tt/data-access/shared/interface/search-page-mode.interface';

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

  readonly pageMode = input<SearchPageMode>();
  readonly profile = input<Profile>();

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        const pageMode = this.pageMode();
        const value = this.searchForm.getRawValue();

        if (pageMode === 'subscribers') {
          this.store.dispatch(profileActions.getSubscribers({
            subscribersFilter: {
              ...value,
              firstLastName: value.firstName || value.lastName
            }
          }))
        } else if (pageMode === 'subscriptions') {
          this.store.dispatch(profileActions.getSubscriptions({subscriptionsFilter: value}));
        }
        this.store.dispatch(profileActions.getAccounts({accountsFilter: value}))
      })
  }

  searchForm = this.formBuilder.group({
    firstName: this.formBuilder.control<string>(''),
    lastName: this.formBuilder.control<string>(''),
    stack: this.formBuilder.control<string[]>([]),
    city: this.formBuilder.control<string>(''),
  })

}
