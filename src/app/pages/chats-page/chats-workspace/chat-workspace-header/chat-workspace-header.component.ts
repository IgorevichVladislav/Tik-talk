import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';

import {ButtonComponent, TtAvatarCircleComponent, TtDropdown, TtDropdownComponent} from '@tt/ui-kit';
import {Profile, profileActions, selectSubscriptionsEntity} from '@tt/data-access/profile';
import {UiAction} from '@tt/shared';

@Component({
  selector: 'tt-chat-workspace-header',
  imports: [
    ButtonComponent,
    TtAvatarCircleComponent,
    RouterLink,
    TtDropdownComponent
  ],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-chat-workspace-header'}
})
export class ChatWorkspaceHeaderComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private readonly subscriptionsEntity = this.store.selectSignal(selectSubscriptionsEntity);

  readonly companion = input.required<Profile>();
  isHeaderSettings = signal<boolean>(false);


  readonly isMySubscription = computed(() => {
    return !!this.subscriptionsEntity()[this.companion().id];
  })

  readonly isProfileViewList = computed<TtDropdown[]>(() => {
      const companion = this.companion();
      const isSubscribed = this.isMySubscription();

      return [
        {
          icon: 'subscriber',
          description: UiAction.GoToProfile,
          action: () => this.router.navigate(['/profile', companion.id])
        },
        {
          icon: isSubscribed ? 'unsubscribe' : 'subscribe',
          description: isSubscribed ? UiAction.Unsubscribe : UiAction.Subscribe,
          action: () => {
            if (isSubscribed) {
              this.store.dispatch(profileActions.unsubscribe({account_id: companion.id}))
            } else {
              this.store.dispatch(profileActions.subscribe({profile: companion}))
            }
          },
          hoverColor: isSubscribed ? 'error' : 'primary'
        },
      ]
    }
  )
}
