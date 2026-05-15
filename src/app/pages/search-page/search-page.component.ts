import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, fromEvent} from 'rxjs';
import {Store} from '@ngrx/store';

import {ProfileCardComponent} from '@tt/common-ui';
import {
  profileActions, selectAccounts, selectSubscribers, selectSubscriptions,
} from '@tt/data-access/profile';
import {ProfileFilterComponent} from '@tt/pages/search-page/components/profile-filter/profile-filter.component';
import {SearchPageMode} from '@tt/data-access/shared/interface/search-page-mode.interface';

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
})
export class SearchPageComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly r2 = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly pageMode = input<SearchPageMode>('search');

  private readonly userAccounts = this.store.selectSignal(selectAccounts);
  private readonly subscribersAccounts = this.store.selectSignal(selectSubscribers);
  private readonly subscriptionsAccounts = this.store.selectSignal(selectSubscriptions);

  constructor() {
    effect(() => {
      const pageMode = this.pageMode();
      if (pageMode === 'subscribers') {
        this.store.dispatch(profileActions.getSubscribers({}));
      } else if (pageMode === 'subscriptions') {
        this.store.dispatch(profileActions.getSubscriptions({}));
      } else {
        this.store.dispatch(profileActions.getAccounts({}));
      }
    });
  }

  ngAfterViewInit() {
    this.resizeSearchPage();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resizeSearchPage())
  }

  readonly getRenderAccounts = computed(() => {
    const pageMode = this.pageMode();
    if (pageMode === 'subscribers') {
      return this.subscribersAccounts();
    } else if (pageMode === 'subscriptions') {
      return this.subscriptionsAccounts();
    } else {
      return this.userAccounts();
    }
  });

  private resizeSearchPage() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
