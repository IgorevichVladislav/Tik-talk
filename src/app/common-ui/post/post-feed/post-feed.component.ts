import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {Store} from '@ngrx/store';

import {TextInputComponent} from '../../text-input';
import {PostComponent} from '../post/post.component';
import {Profile} from '@tt/data-access/profile';
import {postActions, selectPosts} from '@tt/data-access/post/store';

@Component({
  selector: 'tt-post-feed',
  imports: [
    TextInputComponent,
    PostComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post-feed'
  }
})
export class PostFeedComponent {
  private readonly store = inject(Store);

  readonly profile = input<Profile>();
  readonly posts = this.store.selectSignal(selectPosts);

  constructor() {
    effect(() => {
      this.store.dispatch(postActions.getPosts({user_id: this.profile()!.id}));
    });
  }
}
