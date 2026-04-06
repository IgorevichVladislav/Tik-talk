import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {Store} from '@ngrx/store';

import {SvgIconComponent, TtAvatarCircleComponent, TtSubscriberCardComponent} from '@tt/ui-kit';
import {
  profileActions,
  ProfileService,
  selectProfile, selectSubscribers, selectSubscribersLimit,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-sidebar'},
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);
  readonly router = inject(Router);

  readonly showFooterMenu = signal<boolean>(false);

  readonly me = this.store.selectSignal(selectProfile);
  readonly subscribersLimit = this.store.selectSignal(selectSubscribersLimit(3));

  ngOnInit() {
    this.store.dispatch(profileActions.getMe());
    this.store.dispatch(profileActions.getSubscribers({}));
  }

  menuItems: NavigationList[] = [
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
