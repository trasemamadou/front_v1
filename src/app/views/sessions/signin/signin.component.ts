import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { KeycloakAuthService } from 'app/shared/services/keycloak-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: UntypedFormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private keycloakAuth: KeycloakAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
      agreed: new UntypedFormControl(false, Validators.requiredTrue)
    });
  }

  signin() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const { email, password } = this.signinForm.value;

    // Appelle ton service qui fait le login Keycloak en mode “Resource Owner Password Credentials”
    this.keycloakAuth.loginWithCredentials(email, password).subscribe({
      next: (tokens) => {
        console.log('✅ Connexion réussie !', tokens);
        this.loading = false;
        this.router.navigate(['/dashboard/analytics']); // redirection après login
      },
      error: (err) => {
        console.error('❌ Échec de connexion', err);
        this.loading = false;
        this.errorMsg = 'Nom d’utilisateur ou mot de passe incorrect';
      }
    });
  }
}
