# Morituri te salutant

2D browser game built with HTML5 Canvas, featuring enemy waves, a boss fight, and mobile controls.

## Features

- 2D side-scroller gameplay on HTML5 Canvas
- Multiple enemy classes (for example Orc Warrior, Orc Shaman, and Endboss)
- Collectibles for score and block energy
- UI for health, score, and boss health
- Keyboard and touch controls
- Portrait-mode overlay on mobile (prompt to rotate to landscape)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (modular class structure)
- Nginx (Docker deployment)

## Project Structure (Excerpt)

- `index.html` - Entry point with canvas and script imports
- `style.css` - Styling for layout, UI, and mobile controls
- `js/game.js` - Initialization, input handling, orientation logic
- `models/` - Core game logic (world, character, enemies, renderers, etc.)
- `level/Level1.js` - Level data
- `img/`, `audio/` - Assets

## Run Locally

### Option 1: Open in Browser (quick testing only)

1. Clone the repository
2. Open `index.html` in your browser

Note: Some browsers may restrict features when opened directly via `file://`. A local server is more reliable.

### Option 2: Local HTTP Server (recommended)

Example with Python:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Run with Docker

Build and run:

```bash
docker build -t morituri .
docker run --rm -p 8080:80 morituri
```

Then open:

```text
http://localhost:8080
```

## Docker Compose

The project includes a production-oriented `docker-compose.yml` with Traefik labels.

Important:

- The external network `web` must exist on the target system.
- The host rule is configured for `morituri.mischner.dev`.

If you want to test locally without Traefik, use the Docker run command from the section above.

## Controls

Desktop:

- `A` = move left
- `D` = move right
- `W` = jump
- `E` = block
- `Space` = attack

Mobile:

- On-screen buttons for left, right, jump, attack, and block
- In portrait orientation, an overlay prompts users to switch to landscape

## Gameplay Notes

- Blockstones increase your block energy.
- Scorestones give points and improve your score.

## Legal Notice

Imprint page:

- `impressum.html`
