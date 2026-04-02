import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';

import {SvgIconComponent, TtAvatarCircleComponent, TtSubscriberCardComponent} from '@tt/ui-kit';
import {profileActions, ProfileService, selectProfile} from '@tt/data-access/profile';
import {AuthService} from '@tt/data-access/auth';
import {ClickOutsideDirective} from '@tt/directives/click-outside.directive';

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
  private readonly profileService = inject(ProfileService);
  private readonly store = inject(Store);
  readonly router = inject(Router);

  showFooterMenu = signal<boolean>(false);

  me = this.store.selectSignal(selectProfile);
  subscribers = toSignal(this.profileService.getSubscribers(3));

  ngOnInit() {
    this.store.dispatch(profileActions.getMe())
  }

  menuItems = [
    {
      description: 'Моя страница',
      icon: 'home',
      link: ['/post']
    },
    {
      description: 'Чаты',
      icon: 'chat',
      link: ['/chats']
    },
    {
      description: 'Поиск',
      icon: 'search',
      link: ['/search']
    }
  ];

  get logout() {
    return firstValueFrom(this.authService.logout());
  }
}
