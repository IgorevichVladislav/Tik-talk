import {ChangeDetectionStrategy, Component, effect, inject, viewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AvatarUploadComponent} from './components/avatar-upload';
import {profileActions, selectProfile} from '@tt/data-access/profile';
import {ProfileHeaderComponent} from '@tt/common-ui';
import {ButtonComponent, TtInputComponent} from '@tt/ui-kit';
import {AuthService} from '@tt/data-access/auth';

@Component({
  selector: 'tt-settings-page',
  imports: [
    ProfileHeaderComponent,
    TtInputComponent,
    FormsModule,
    ReactiveFormsModule,
    AvatarUploadComponent,
    ButtonComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-settings-page'
  }
})
export class SettingsPageComponent {
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private readonly avatarUpload = viewChild(AvatarUploadComponent, {read: AvatarUploadComponent});
  readonly profile = this.store.selectSignal(selectProfile);

  readonly settingsForm = new FormGroup({
    firstName: new FormControl<string | null>(''),
    lastName: new FormControl<string | null>(''),
    username: new FormControl<string>('', Validators.required),
    description: new FormControl<string | null>(''),
    stack: new FormControl<string[] | null>([]),
  });

  constructor() {
    effect(() => {
      const profile = this.profile();

      if (!profile) return;
      this.settingsForm.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        description: profile.description,
        stack: profile.stack,
      })
    });
  }

  deleteAvatar() {
    this.store.dispatch(profileActions.deleteAvatar());
  }

  onSaveSettings() {
    this.settingsForm.markAllAsTouched();
    this.settingsForm.updateValueAndValidity();

    if (this.settingsForm.invalid) return;

    const avatarFile = this.avatarUpload()?.avatarFile;

    if (avatarFile) {
      this.store.dispatch(profileActions.uploadAvatar({avatarImage: avatarFile}))
    }

    this.store.dispatch(profileActions.updateMe({updateDto: this.settingsForm.getRawValue()}));
  }

  async logout() {
    await firstValueFrom(this.authService.logout());
  }

  toProfilePage(id: number) {
    return this.router.navigate(['/profile', id])
  }

  splitStack(stack: string[] | string | null): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',')
  }

  joinStack(stack: string[] | string | null): string {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
