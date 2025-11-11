import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  private keycloakUrl = 'http://localhost:8080/realms/realm-demo/protocol/openid-connect/token';
  private clientId = 'demo';
  private clientSecret = 'passer'; // retire si client public

  constructor(private keycloak: KeycloakService, private http: HttpClient) {}

  /**
   * Login classique Keycloak (redirection)
   */
  login(): Promise<void> {
    return this.keycloak.login();
  }

  /**
   * Login via credentials (Ressource Owner Password Grant)
   */
  loginWithCredentials(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret) // retire si client public
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(this.keycloakUrl, body).pipe(
      tap(tokens => {
        // Stockage local
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);

        // 🔹 Injection du token dans KeycloakService pour AuthGuard
        this.setToken(tokens.access_token, tokens.refresh_token, tokens.expires_in);
      })
    );
  }

  /**
   * Met à jour le token dans KeycloakService
   */
  setToken(accessToken: string, refreshToken?: string, expiresIn?: number) {
    const kc = this.keycloak.getKeycloakInstance();
    kc.token = accessToken;
    if (refreshToken) kc.refreshToken = refreshToken;
    if (expiresIn) {
      kc.tokenParsed = kc.tokenParsed || {};
      kc.tokenParsed['exp'] = Math.floor(Date.now() / 1000) + expiresIn;
    }
  }

  /**
   * Logout via Keycloak
   */
  logout(): Promise<void> {
    return this.keycloak.logout(window.location.origin);
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  /**
   * Récupère le username depuis le token
   */
  getUsername(): string {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    return tokenParsed ? tokenParsed['preferred_username'] || tokenParsed['email'] : '';
  }

  /**
   * Rafraîchit le token si nécessaire
   */
  refreshToken(minValidity: number = 30): Promise<boolean> {
    return this.keycloak.updateToken(minValidity)
      .then(refreshed => refreshed)
      .catch(err => {
        console.warn('Token non rafraîchi', err);
        return false;
      });
  }
}
