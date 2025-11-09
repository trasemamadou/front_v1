# MatxAngularLatestTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## TODO
1. update navigation links
## version
=== Rapport de compatibilité de l'application Angular 14 ===

Node.js: v14.21.3
npm: 8.19.4
TypeScript: 4.7.2
Angular CLI: 14.2.3
Angular Core: 14.2.x
@types/node: 16.18.3
ng-apexcharts: 1.7.4

DevDependencies principales:
- @angular-devkit/build-angular: ^14.2.3
- @angular/compiler-cli: ^14.2.0
- @types/jasmine: ~4.0.0
- jasmine-core: ~4.3.0
- karma: ~6.4.0
- karma-chrome-launcher: ~3.1.0
- karma-coverage: ~2.2.0
- karma-jasmine: ~5.1.0
- karma-jasmine-html-reporter: ~2.0.0

Remarques:
- Ce projet est stable avec Node 14 et Angular 14.
- La version d’@types/node doit rester <=16 pour éviter les erreurs TS2502.
- La CLI Angular 14 est compatible avec Node 14 et TypeScript 4.7/4.8.
- Vérifier les versions de dépendances critiques avant chaque déploiement.

Instructions:
- Pour vérifier les versions installées sur votre machine, utilisez :
  node -v
  npm -v
  ng version
  tsc -v
  npm ls @types/node
  npm ls ng-apexcharts
  npm ls @angular/core
