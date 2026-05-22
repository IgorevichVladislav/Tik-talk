import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {Store} from '@ngrx/store';

import {ChatWorkspaceHeaderComponent} from './chat-workspace-header/index';
import {ChatWorkspaceMessagesWrapperComponent} from './chat-workspace-messages-wrapper/index';
import {chatActions, selectChat} from '@tt/data-access/chats';
import {AutoResizeDirective} from '@tt/directives/auto-resize.directive';

@Component({
  selector: 'tt-chats-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent
  ],
  templateUrl: './chats-workspace.component.html',
  styleUrl: './chats-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [AutoResizeDirective]
})
export class ChatsWorkspaceComponent {
  private readonly store = inject(Store);
  chatId = input<number>();

  readonly chat = this.store.selectSignal(selectChat);

  constructor() {
    effect(() => {
      const chat_id = this.chatId();
      if (!chat_id) return;

      this.store.dispatch(chatActions.readPersonalChat({chat_id}));
    });
  }
}
