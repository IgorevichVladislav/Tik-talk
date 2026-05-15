import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { DatePipe } from '@angular/common';

import {TtAvatarCircleComponent} from '@tt/ui-kit';
import {Chat} from '@tt/data-access/chats';

@Component({
  selector: 'button[chats]',
  imports: [
    TtAvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-chat-btn'}
})
export class ChatBtnComponent {
  readonly chat = input<Chat>();

}
