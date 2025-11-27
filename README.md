# StableStabler

## Spielprinzip
Erkenntnis:
- Eine Physiks Library raussuchen
  - Libs:
  - Phaser.io: https://phaser.io/
  - Matter.js: https://brm.io/matter-js/
  - Pixijs: https://pixijs.com/
    - Damit man den Wurf des Blocks, sowie die Bewegung des Turms darstellen können
- Es gibt eine Art von Blöcken
- Man startet ohne Block (nur Fundament)
- Unsichtbare Linie um Game Over zu tracken
- Die Blöcke und das Spielfeld werden prozentual an den Bildschirm angepasst
    - Blöcke: 100/8,5.
- onMount wird die Hälfte des Bildschirms auf Desktop und die komplette Breite / Höhe auf Mobil ausgelesen (Logik finden)
- Blöcke werden nicht entfernt (wenn diese außerhalb des VPs sind)
-

## Spielregeln
- Wann verliert man:
    - Wenn ein Block durch die unsichtbare Linie fällt
        - Turm fällt
        - oder man wirft daneben
- Countdown zum abwerfen des Fragments (10sek)
- Es sind maximal 3 Blöcke im VP (siehe Skizze)
- Der Kran und der nächste Block sind vollständig sichtbar (der der am Kran hängt)
- Pro Wurf geht's ein Hoch
- Das Fundament ist die Hälfte eines Fragments, demnach ist immer die Hälfte des letzten Fragments am unteren Bildschirmrand zu sehen
- Nach loslassen des Blocks wird intern ein Countdown runtergezählt, erst nach Ablauf kann ein neuer Block platziert werden

## Multiplayer

### Ideen
- Max 4 Spieler. Die größe der Blöcke bleibt entsprechend VPs identisch (100/8.5)
-
- Spieler abonnieren WebSocket
    - **Erste Ausbaustufe:**
        - Der Client sendet ein Event, wenn ein Block erfolgreich nach dem Cooldown steht
        - Die anderen Clients werden darüber informiert.
            - Der Counter der anderen Spieler wird angepasst
            - (Einfache Zahl im VP der Gegner)
    - **Zweite Ausbaustufe:
        - Wir malen Balken rein, in der Höhe der anderen Spieler
    - **Dritte Ausbaustufe:
        - Wir stellen die Türme der anderen Spieler im Browser dar.
        - Die Physik predicted den Status des Blocks auf unserem Client
            - Dafür müssen wir die Position des Krans tracken. Damit es möglich ist, den Spielstand der Gegner zu spiegeln.

### Spiel
- Man gewinnt wenn
    - Man nach ablaufen des Countdowns die höchste Punktzahl hat
    - Wenn ich 4 höher bin als die anderen
    - (Alternativ mit erreichen einer Linie)

### Backend (Was braucht das Backend)

- REST
    - GET / POST => Scoreboard, Highscore etc.

**Erste Ausbaustufe:
- Der Counter des Spielers muss an den Server gesendet werden
- Counter der anderen Spieler müssen abgeholt werden

Dritte Ausbaustufe:
- Zusätzlich:
    - Position / Richtung müssen an den Server und an die Clients geschickt werden
    -

### Frontend

- Single-Player
- Multi-Player
- Spiel starten
- Gamemodus muss als Component mit Props zur Verfügung stehen
- HIghscore Leaderboard
- Raumnamen generieren, damit Kommunikation zum BE eindeutig ist 

