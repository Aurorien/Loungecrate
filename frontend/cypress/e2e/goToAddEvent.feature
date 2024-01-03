Feature: Knapp som leder till formulär

Det ska finnas en knapp på hemsidan med texten Add event. När man klickar på knappen ska man hamna på formulär-sidan Add Event. Knappen ska leda till den plats som indikeras av knappens text.

Scenario: Klick på knappen
  Given Jag är på hemsidan och knappen med finns
  When Jag klickar på knappen
  Then Ska befinna mig på sidan Add event
