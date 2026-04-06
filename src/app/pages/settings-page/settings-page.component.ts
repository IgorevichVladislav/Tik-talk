import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {Store} from '@ngrx/store';

import {profileActions, ProfileUpdate, selectProfile} from '@tt/data-access/profile';
import {ProfileHeaderComponent} from '@tt/common-ui';
import {ButtonComponent, TtInputComponent} from '@tt/ui-kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AvatarUploadComponent} from '../../common-ui/avatar-upload';
import {AuthService} from '@tt/data-access/auth';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

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
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly profile = this.store.selectSignal(selectProfile);

  settingsForm = new FormGroup({
    firstName: new FormControl<string | null>(''),
    lastName: new FormControl<string | null>(''),
    username: new FormControl<string>('', Validators.required),
    description: new FormControl<string | null>(''),
    //avatar: new FormControl<string | null>(''),
    stack: new FormControl<string[] | null>([]),
  })

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

  onSaveSettings() {
    this.settingsForm.markAllAsTouched();
    this.settingsForm.updateValueAndValidity();

    if (this.settingsForm.invalid) return;

    this.store.dispatch(profileActions.updateMe({updateDto: this.settingsForm.getRawValue()}));
  }

  get logout() {
    return firstValueFrom(this.authService.logout());
  }

  get toProfilePage() {
    return this.router.navigate(['/profile', 'me'])
  }
}
