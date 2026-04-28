import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {PostComment} from '@tt/data-access/comments/comment.interface';
import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-comment',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-comment'},
})
export class CommentComponent {
  comment = input<PostComment>();
}
