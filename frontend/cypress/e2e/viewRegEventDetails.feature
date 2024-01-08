Feature: Visningsruta för detaljerad vy av event i lista

Det ska finnas en klickbar lista med den inloggade användarens registrerade event på hemsidan. När man klickar på ett av eventen i listan ska en ruta visa eventets detaljerade vy. Event kan klickas upp i detaljerad vy samtidigt som samanfattade listan finns att tillgå på hemsidan.

Scenario: Klick på knappen
  Given Jag är inloggad, är på hemsidan och listan finns
  When Jag klickar på ett event
  Then Ska en ruta dyka upp med samma rubrik som eventet och innehålla detaljerad info om eventet
