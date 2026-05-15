import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ChatsListComponent} from '@tt/pages/chats-page/chats-list/chats-list.component';
import {ChatsWorkspaceComponent} from '@tt/pages/chats-page/chats-workspace/chats-workspace.component';

@Component({
  selector: 'tt-chats-page',
  imports: [
    ChatsListComponent,
    ChatsWorkspaceComponent
  ],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPageComponent {

}
