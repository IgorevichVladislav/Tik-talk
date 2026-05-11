import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';

import {
  ButtonComponent,
  TtAvatarCircleComponent,
  TtDropdownComponent,
  TtDropdownList,
  TtTextInputComponent
} from '@tt/ui-kit';
import {Post} from '@tt/data-access/post/post.interface';
import {CommentComponent} from './comment/comment.component';
import {commentActions} from '@tt/data-access/comments/store/actions';
import {CommentCreateDto} from '@tt/data-access/comments/comment.interface';
import {postActions} from '@tt/data-access/post/store';
import {selectProfile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-post',
  imports: [
    TtAvatarCircleComponent,
    TtTextInputComponent,
    ButtonComponent,
    CommentComponent,
    DatePipe,
    TtDropdownComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post',
  }
})
export class PostComponent {
  private readonly store = inject(Store);

  isOpenSettings = signal<boolean>(false);

  private readonly myProfile = this.store.selectSignal(selectProfile);
  readonly post = input<Post>();

  dropdownPostList: TtDropdownList[] = [{
    icon: 'edit',
    hoverColor: 'var(--primary-color)',
    description: 'Редактировать',
    action: () => this.store.dispatch(postActions.updatePost({
        post_id: this.post()!.id,
        updateDto: {
          title: this.post()!.title,
          content: this.post()!.content
        }
      }
    ))
  },
    {
      icon: 'delete',
      description: 'Удалить',
      action: () => this.store.dispatch(postActions.deletePost({post_id: this.post()!.id}))
    }
  ];

  createText(text: string) {
    const post = this.post();
    if (!post) return;

    const dto: CommentCreateDto = {
      text: text,
      authorId: post.author.id,
      postId: post.id,
      commentId: null
    }
    this.store.dispatch(commentActions.createComment({dto}));
  }

  isMyLike = computed(() => {
    const profileId = this.myProfile()?.id;
    const likesUsers = this.post()?.likesUsers;
    if (!profileId || !likesUsers) return false;

    return likesUsers.includes(profileId);
  });

  likeIcon = computed(() => {
    return `like${this.isMyLike() ? '-filled' : ''}`;
  });

  toggleLike() {
    const post = this.post();

    if (!post) return;

    if (this.isMyLike()) {
      this.store.dispatch(postActions.deleteLike({post_id: post.id}));
    } else {
      this.store.dispatch(postActions.createLike({post_id: post.id}));
    }
  }
}
