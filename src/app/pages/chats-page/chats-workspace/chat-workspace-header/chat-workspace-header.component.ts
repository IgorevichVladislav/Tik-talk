import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-chat-workspace-header',
  imports: [
    ButtonComponent,
    TtAvatarCircleComponent,
    RouterLink
  ],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-chat-workspace-header'}
})
export class ChatWorkspaceHeaderComponent {
  companion = input.required<Profile>();
}
