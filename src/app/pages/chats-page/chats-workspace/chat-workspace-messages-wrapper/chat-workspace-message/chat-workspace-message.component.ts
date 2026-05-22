import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';

import {chatActions, ChatMessage} from '@tt/data-access/chats';
import {TtAvatarCircleComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-chat-workspace-message',
  imports: [
    TtAvatarCircleComponent,
    DatePipe
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

  readonly chatMessage = input.required<ChatMessage>();

  get isMyMessage() {
    return this.chatMessage().isMySide;
  };

  ngOnInit() {
    this.store.dispatch(chatActions.getMessage({message_id: this.chatMessage().id}));
  }
}
