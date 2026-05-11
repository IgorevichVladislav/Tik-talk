import {ChangeDetectionStrategy, Component, effect, inject, input, viewChild} from '@angular/core';
import {Store} from '@ngrx/store';

import {PostComponent} from '../post/post.component';
import {Profile} from '@tt/data-access/profile';
import {PostCreateDto} from '@tt/data-access/post/post.interface';
import {postActions, selectPosts} from '@tt/data-access/post/store';
import {TtDropdownComponent, TtTextInputComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-post-feed',
  imports: [
    TtTextInputComponent,
    PostComponent,
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

  dropDown = viewChild<TtDropdownComponent>(TtDropdownComponent);

  constructor() {
    effect(() => {
      this.store.dispatch(postActions.getPosts({user_id: this.profile()!.id}));
    });
  }

  ngAfterViewInit() {
    console.log(this.dropDown(), 'dropdown')

  }

  onCreatePost(text: string) {
    const authorId = this.profile()?.id;
    if (!authorId) return;

    const dto: PostCreateDto = {
      title: 'Посты Reptail',
      content: text,
      authorId
    }
    this.store.dispatch(postActions.createPost({dto}))
  }
}
