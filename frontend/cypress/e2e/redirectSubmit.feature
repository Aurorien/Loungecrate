Feature: Add Event Submit leda tillbaka till hemsidan via bekräftande text som visar nya eventet

Submit-knappen på AddEvent-formuläret ska visa en text som indikerar att eventet har lagts till och sedan leda användaren tillbaka till hemsidan där användaren kan se att eventet har tillkommit i listan med användarens event.

Scenario: Klick på Submit
  Given Jag är på Add Event och jag har fyllt i formuläret så att Submit-knappen är enabled
  When Jag klickar på Submit-knappen
  Then Bekräftande text och därefter man slussas till hemsidan och det nya eventet ska finnas med i My events på hemsidan
