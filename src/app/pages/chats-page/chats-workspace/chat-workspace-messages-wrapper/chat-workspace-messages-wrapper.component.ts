import {
  afterNextRender, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  viewChild
} from '@angular/core';
import {Store} from '@ngrx/store';

import {ChatWorkspaceMessageComponent} from './chat-workspace-message';
import {SubmittedValue, TtTextInputComponent} from '@tt/ui-kit';
import {Chat, chatActions} from '@tt/data-access/chats';
import {selectProfile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessageComponent,
    TtTextInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-chat-workspace-messages'}
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly injector = inject(Injector);
  private readonly messagesWrapper = viewChild('chatMessagesWrapper', {read: ElementRef});

  readonly chat = input.required<Chat>();
  readonly me = this.store.selectSignal(selectProfile);

  ngAfterViewInit() {
    effect((onCleanup) => {
        const messagesCount = this.chat().messages?.length;
        const messagesWrapper = this.messagesWrapper();
        if (!messagesWrapper || messagesCount === 0) return;

        const scroll = afterNextRender(() => {
          const element = messagesWrapper?.nativeElement;
          element.scrollTop = element.scrollHeight;
        }, {injector: this.injector});
        onCleanup(() => scroll.destroy());
      }, {injector: this.injector}
    )
  }

    createChatMessage(event: SubmittedValue, chatId: number) {
    const chat_id = chatId;
    if (!chat_id) return;

    this.store.dispatch(chatActions.sendMessage({chat_id, message: event.text as string}));
  }
}
