import {ChangeDetectionStrategy, Component, inject, input, output, Renderer2} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar, Profile} from '@tt/data-access/profile';
import {Post, PostCreateDto} from '@tt/data-access/post/post.interface';
import {PostComment, CommentCreateDto} from '@tt/data-access/comments/comment.interface';

@Component({
  selector: 'tt-text-input',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-text-input',
    '[class.tt-text-input__comment]': 'mode() === "comment"'
  }
})
export class TextInputComponent {
  private readonly r2 = inject(Renderer2);

  readonly avatarData = input<Avatar>();
  readonly mode = input<'post' | 'comment'>('post');
  readonly profile = input<Profile>();
  readonly post = input<Post>();
  readonly comment = input<PostComment>();

  text = '';

  readonly onCreatePostHandle = output<PostCreateDto>();
  readonly onCreateCommentHandle = output<CommentCreateDto>();


  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }


  onCreateText() {
    const [post, comment, profile] = [this.post(), this.comment(), this.profile()];
    const mode = this.mode();


    if (mode === 'post') {
      this.onCreatePostHandle.emit({
        title: 'Посты Reptail',
        content: this.text,
        authorId: profile!.id,
        communityId: null
      })
    } else if (mode === 'comment') {
      this.onCreateCommentHandle.emit({
        text: this.text,
        authorId: comment!.author.id,
        postId: comment!.postId,
        commentId: comment!.commentId,
      })
    }
    this.text = '';
  }
}
