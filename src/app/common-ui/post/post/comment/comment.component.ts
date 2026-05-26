import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';

import {PostComment} from '@tt/data-access/comments/comment.interface';
import {ButtonComponent, TtAvatarCircleComponent, TtDropdownComponent, TtDropdown} from '@tt/ui-kit';
import {commentActions} from '@tt/data-access/comments/store';
import {selectProfile} from '@tt/data-access/profile';
import {UiAction} from '@tt/shared';

@Component({
  selector: 'tt-comment',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent,
    DatePipe,
    TtDropdownComponent,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-comment'},
})
export class CommentComponent {
  private readonly store = inject(Store);

  private readonly me = this.store.selectSignal(selectProfile);
  comment = input<PostComment>();

  isOpenSettings = signal<boolean>(false);

  isMyCommentSettings = computed(() => {
    const commentId = this.comment()?.author.id;
    const meId = this.me()?.id;
    if (!commentId || !meId) return;

    return commentId === meId;
  })

  dropdownPostList: TtDropdown[] = [{
    icon: 'edit',
    description: UiAction.Edit,
    action: () => this.store.dispatch(commentActions.updateComment({
        commentId: this.comment()!.id,
        text: this.comment()!.text
      }
    ))
  },
    {
      icon: 'delete',
      description: UiAction.Delete,
      action: () => this.store.dispatch(commentActions.deleteComment({commentId: this.comment()!.id})),
      hoverColor: 'error'
    }
  ]
}
