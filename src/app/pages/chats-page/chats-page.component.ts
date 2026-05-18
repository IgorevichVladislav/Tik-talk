import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';

import {ChatsListComponent} from '@tt/pages/chats-page/chats-list/chats-list.component';
import {chatActions} from '@tt/data-access/chats';

@Component({
  selector: 'tt-chats-page',
  imports: [
    ChatsListComponent,
    RouterOutlet
  ],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPageComponent implements OnInit {
private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(chatActions.getChats());
  }
}
