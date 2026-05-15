import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';

import {ChatBtnComponent} from '../chat-btn/chat-btn.component';
import {TtInputComponent} from '@tt/ui-kit';
import {chatActions, selectChats} from '@tt/data-access/chats';

@Component({
  selector: 'tt-chats-list',
  imports: [
    TtInputComponent,
    ChatBtnComponent,
    ReactiveFormsModule
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-chats-list'}
})
export class ChatsListComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder)

  readonly chats = this.store.selectSignal(selectChats);

  filterChat = this.fb.group({
    firstName: '',
    lastName: '',
  })

  ngOnInit() {
    this.store.dispatch(chatActions.getChats());
  }
}
