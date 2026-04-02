import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from '@tt/data-access/auth';
import {ButtonComponent, SvgIconComponent, TtErrorComponent} from '@tt/ui-kit';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-login-page',
  imports: [
    ButtonComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    TtErrorComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-login-page',
  }
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isPasswordVisible = signal<boolean>(false);
  readonly isFormValid = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl<string>('',
      {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl<string>('',
      {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}),
  })

  loginFormSubmit() {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();
    this.isFormValid.set(true);

    if (this.loginForm.invalid) return

    console.log(this.loginForm.value);

    this.authService.loginForAccessToken(this.loginForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['']));
  }
}
