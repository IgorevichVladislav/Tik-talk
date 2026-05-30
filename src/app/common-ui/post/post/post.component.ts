import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {EmojiComponent} from '@ctrl/ngx-emoji-mart/ngx-emoji';

import {
  ButtonComponent, ImgUrlPipe, SubmittedValue,
  TtAvatarCircleComponent,
  TtDropdownComponent,
  TtDropdown,
  TtTextInputComponent
} from '@tt/ui-kit';
import {Post} from '@tt/data-access/post/post.interface';
import {CommentComponent} from './comment/comment.component';
import {commentActions} from '@tt/data-access/comments/store/actions';
import {CommentCreateDto} from '@tt/data-access/comments/comment.interface';
import {postActions} from '@tt/data-access/post/store';
import {selectProfile} from '@tt/data-access/profile';
import {selectCommentByPostId} from '@tt/data-access/comments';
import {UiAction} from '@tt/shared/constants';

@Component({
  selector: 'tt-post',
  imports: [
    TtAvatarCircleComponent,
    TtTextInputComponent,
    ButtonComponent,
    CommentComponent,
    DatePipe,
    TtDropdownComponent,
    EmojiComponent,
    ImgUrlPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-post'}
})
export class PostComponent {
  private readonly store = inject(Store);

  isOpenSettings = signal<boolean>(false);

  readonly me = this.store.selectSignal(selectProfile);

  readonly post = input<Post>();

  comments = computed(() => {
    const postId = this.post()?.id;
    if (!postId) return;

    return this.store.selectSignal(selectCommentByPostId(postId))();
  })

  isMyPostSettings = computed(() => {
    const postAuthorId = this.post()?.author.id;
    const meId = this.me()?.id;
    if (!postAuthorId || !meId) return;

    return postAuthorId === meId;
  })

  dropdownPostList = computed<TtDropdown[]>(() => {
      const post = this.post();
      if (!post) return [];

      return [{
        icon: 'edit',
        description: UiAction.Edit,
        action: () => this.store.dispatch(postActions.updatePost({
            post_id: post.id,
            updateDto: {
              title: post.title,
              content: post.content
            }
          }
        ))
      },
        {
          icon: 'delete',
          description: UiAction.Delete,
          hoverColor: 'error',
          action: () => this.store.dispatch(postActions.deletePost({post_id: post.id}))
        }
      ]
    }
  );

  onCreateComment(event: SubmittedValue) {
    const post = this.post();
    const me = this.me();
    if (!post || !me) return;

    const dto: CommentCreateDto = {
      text: event.text,
      authorId: me.id,
      postId: post.id,
      commentId: null
    }

    this.store.dispatch(commentActions.createComment({dto}));
  }

  deletePostImage(image_url: string) {
    const post_id = this.post()?.id;
    if (!post_id) return;

    this.store.dispatch(postActions.deleteImage({post_id, image_url}));
  }

  isMyLike = computed(() => {
    const profileId = this.me()?.id;
    const likesUsers = this.post()?.likesUsers;
    if (!profileId || !likesUsers) return false;

    return likesUsers.includes(profileId);
  });

  likeIcon = computed(() => {
    return `like${this.isMyLike() ? '-filled' : ''}`;
  });

  toggleLike() {
    const post_id = this.post()?.id;

    if (!post_id) return;

    if (this.isMyLike()) {
      this.store.dispatch(postActions.deleteLike({post_id}));
    } else {
      this.store.dispatch(postActions.createLike({post_id}));
    }
  }
}
