import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'realm-demo',
  clientId: 'demo'
};
