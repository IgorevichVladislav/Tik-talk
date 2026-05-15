import {ChangeDetectionStrategy, Component, computed, inject, input, signal,} from '@angular/core';
import {DatePipe} from '@angular/common';

import {PostComment} from '@tt/data-access/comments/comment.interface';
import {ButtonComponent, TtAvatarCircleComponent, TtDropdownComponent, TtDropdownList} from '@tt/ui-kit';
import {Store} from '@ngrx/store';
import {commentActions} from '@tt/data-access/comments/store';
import {selectProfile} from '@tt/data-access/profile';
import {ClickOutsideDirective} from '@tt/directives/click-outside.directive';

@Component({
  selector: 'tt-comment',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent,
    DatePipe,
    TtDropdownComponent,
    ClickOutsideDirective,
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

  dropdownPostList: TtDropdownList[] = [{
    icon: 'edit',
    description: 'Редактировать',
    action: () => this.store.dispatch(commentActions.updateComment({
        commentId: this.comment()!.id,
        text: this.comment()!.text
      }
    ))
  },
    {
      icon: 'delete',
      description: 'Удалить',
      action: () => this.store.dispatch(commentActions.deleteComment({commentId: this.comment()!.id}))
    }
  ]
}
