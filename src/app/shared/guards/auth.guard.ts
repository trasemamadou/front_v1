import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.keycloakService.isLoggedIn().then(async isLoggedIn => {
      if (isLoggedIn) {
        return true; // ✅ L'utilisateur est déjà connecté
      }

      try {
        // 🔹 Essaye de rafraîchir le token si possible
        const refreshed = await this.keycloakService.updateToken(30); // minValidity 30 sec
        if (refreshed) return true;
      } catch (err) {
        console.warn('Token non rafraîchi ou inexistant', err);
      }

      // 🔹 Si toujours pas connecté, redirige vers ton composant SigninComponent
      this.router.navigate(['/sessions/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }).catch(err => {
      console.error('Erreur dans AuthGuard', err);
      this.router.navigate(['/sessions/signin']);
      return false;
    });
  }
}
