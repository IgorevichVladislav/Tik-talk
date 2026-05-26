import {ChangeDetectionStrategy, Component, computed, effect, inject, input} from '@angular/core';
import {Store} from '@ngrx/store';

import {PostComponent} from '../post/post.component';
import {PostCreateDto} from '@tt/data-access/post/post.interface';
import {postActions, selectPost, selectPosts} from '@tt/data-access/post/store';
import {Profile, selectProfile} from '@tt/data-access/profile';
import {SubmittedValue, TtTextInputComponent} from '@tt/ui-kit';
import {AutoResizeDirective} from '@tt/directives';

@Component({
  selector: 'tt-post-feed',
  imports: [
    TtTextInputComponent,
    PostComponent,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'tt-post-feed'},
  hostDirectives: [AutoResizeDirective]
})
export class PostFeedComponent {
  private readonly store = inject(Store);

  readonly profile = input<Profile>();

  private readonly me = this.store.selectSignal(selectProfile);
  readonly posts = this.store.selectSignal(selectPosts);
  readonly post = this.store.selectSignal(selectPost);

  isMePostInput = computed(() => {
    const me = this.me();
    const profile = this.profile();

    if (!me || !profile) return;

    return me.id === profile.id;
  });

  constructor() {
    effect(() => {
      this.store.dispatch(postActions.getPosts({user_id: this.profile()!.id}));
    });
  }

  onCreatePost(event: SubmittedValue) {
    const authorId = this.profile()?.id;
    if (!authorId) return;

    const dto: PostCreateDto = {
      title: 'Посты Reptail',
      content: event.text,
      authorId
    }
    this.store.dispatch(postActions.submitPost({dto, image: event.file ?? null}));
  }
}
