import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal
} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, firstValueFrom, map, tap} from 'rxjs';
import {Store} from '@ngrx/store';

import {SvgIconComponent, TtAvatarCircleComponent, TtSubscriberCardComponent} from '@tt/ui-kit';
import {
  profileActions,
  selectProfile, selectSubscribers, selectSubscribersById,
} from '@tt/data-access/profile';
import {AuthService} from '@tt/data-access/auth';
import {ClickOutsideDirective} from '@tt/directives/click-outside.directive';
import {NavigationList} from '@tt/data-access/shared';

@Component({
  selector: 'tt-sidebar',
  imports: [
    SvgIconComponent,
    TtAvatarCircleComponent,
    RouterLink,
    ClickOutsideDirective,
    TtSubscriberCardComponent,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  host: {'class': 'tt-sidebar'},
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly showFooterMenu = signal<boolean>(false);

  readonly me = this.store.selectSignal(selectProfile);
  readonly subscribersLimit = this.store.selectSignal(selectSubscribers(3));

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      ).subscribe(() => this.cdr.markForCheck());
  }

  get isActiveFooter() {
    const id = this.me()?.id;
    const url = this.router.url;

    return url.includes(`/profile/${id}/settings`) || url.includes(`/profile/me/settings`);
  }

  ngOnInit() {
    this.store.dispatch(profileActions.getMe());
    this.store.dispatch(profileActions.getSubscribers({}));
    this.store.dispatch(profileActions.getSubscriptions({}));
  }

  readonly menuItems: NavigationList[] = [
    {
      description: 'Моя страница',
      icon: 'home',
      link: ['/profile', 'me']
    },
    {
      description: 'Чаты',
      icon: 'chat',
      link: ['chats']
    },
    {
      description: 'Поиск',
      icon: 'search',
      link: ['search']
    },
    {
      description: 'Сообщество',
      icon: 'community',
      link: ['community']
    }
  ];

  get logout() {
    return firstValueFrom(this.authService.logout());
  }
}
