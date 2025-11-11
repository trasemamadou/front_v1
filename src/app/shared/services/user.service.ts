import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private keycloak: KeycloakService) {}

  getProfile() {
    return this.keycloak.loadUserProfile();
  }

  getRoles() {
    return this.keycloak.getUserRoles();
  }

  logout() {
    this.keycloak.logout(window.location.origin);
  }
}
