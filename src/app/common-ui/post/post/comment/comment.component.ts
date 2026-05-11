import {ChangeDetectionStrategy, Component, inject, input, signal,} from '@angular/core';
import {DatePipe} from '@angular/common';

import {PostComment} from '@tt/data-access/comments/comment.interface';
import {ButtonComponent, TtAvatarCircleComponent, TtDropdownComponent, TtDropdownList} from '@tt/ui-kit';
import {Store} from '@ngrx/store';
import {commentActions} from '@tt/data-access/comments/store';

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

  comment = input<PostComment>();

  isOpenSettings = signal<boolean>(false);

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
