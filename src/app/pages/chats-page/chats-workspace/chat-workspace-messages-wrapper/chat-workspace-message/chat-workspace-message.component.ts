import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {Store} from '@ngrx/store';

import {chatActions, ChatMessage} from '@tt/data-access/chats';
import {ButtonComponent, TtAvatarCircleComponent, TtDropdown, TtDropdownComponent} from '@tt/ui-kit';
import {TimeAgoPipe} from '@tt/pipes/time-age.pipe';
import {DropdownDescription} from '@tt/shared';
import {selectProfile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-chat-workspace-message',
  imports: [
    TtAvatarCircleComponent,
    TimeAgoPipe,
    TtDropdownComponent,
    ButtonComponent
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-chat-workspace-message',
    '[class.tt-chat-workspace-message__my-message]': 'this.isMyMessage'
  },
})
export class ChatWorkspaceMessageComponent {
  private readonly store = inject(Store);

  private readonly me = this.store.selectSignal(selectProfile);

  readonly chatMessage = input.required<ChatMessage>();

  isDropdownSettings = signal<boolean>(false);
  isEditMessage = signal<boolean>(false);

  readonly isMySettings = computed(() => {
    const chatMessage = this.chatMessage();
    return this.me()?.id === chatMessage.userFromId;
  })

  readonly chatMessageSettingsList: TtDropdown[] = [{
    icon: 'edit',
    description: DropdownDescription.Edit,
    action: () => this.store.dispatch(chatActions.patchMessage({
        message_id: this.chatMessage().id,
        text: this.chatMessage().text
      }
    ))
  },
    {
      icon: 'delete',
      description: DropdownDescription.Delete,
      action: () => this.store.dispatch(chatActions.deleteMessage({message_id: this.chatMessage().id})),
      hoverColor: 'error',
    }
  ];

  get isMyMessage() {
    return this.chatMessage().isMySide;
  };
}
