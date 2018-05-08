# Smart Widget UI Starter Kit (Angular)

Dit is een starter kit om een Angular 5+ front-end te bouwen voor een ACPaaS UI Smart Widget. Om meer te leren over Smart Widgets en de richtlijnen te weten om deze starter kit te gebruiken kijk dan naar de [Smart Widget index pagina](https://github.com/digipolisantwerp/smart-widgets).

Om een nieuwe widget front-end te maken:

1. Kloon deze repo.

   `git clone https://github.com/digipolisantwerp/starter-kit_widget_angular.git`

2. Implementeer je widget in de `src` map.

3. Implementeer een voorbeeld van het gebruik van je widget in de `example` map.

   - Als jouw widget gebruikt kan worden met en zonder een BFF, gelieve dan een voorbeeld van elk te geven.

4. Schrijf enkele tests voor jouw widget door `.spec.ts files` toe te voegen aan de `src` map.

   - Test eenmalig met `npm test`, en met `npm run test-watch` in *watch* modus.

5. Pas alle relevante bestanden aan om de referenties naar `starter-kit`, `Starter Kit` en `example` te vervangen.

   - `package.json`: ACPaaS UI componenten waarvan je afhankelijk bent horen in `dependencies` te gaan
   - `.angular-cli.json`
   - Andere bestanden met bovenstaande termen...
   - Verwijder `package-lock.json` en draai `npm install` om het opnieuw te genereren.

6. Plaats geschikte README.md en CONTRIBUTING.md bestanden.

   - Vervang `README.md` door `README.example.md` en pas het aan.
   - Hernoem `CONTRIBUTING.example.md` naar `CONTRIBUTING.md` en pas het aan.

7. Push jouw widget naar een nieuwe repo.

8. Volg de instructies uit de [Smart Widgets contributing pagina](https://github.com/digipolisantwerp/starter-kit_widget_angular/blob/master/CONTRIBUTING.md) om Digipolis op de hoogte te stellen van jouw widget en die te publiceren.

## Bijdragen aan deze starter kit

Wens je wijzigingen te maken aan deze starter kit, kom dan even langs op het [#acpaas-ui-dev slack channel](https://dgpls.slack.com/messages/C4S2D7KTK) of maak een github issue.

## Licentie

Dit project is gepubliceerd onder de [MIT licentie](LICENSE.md).
