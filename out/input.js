import { Game } from "./game.js";
import { KeyManager } from "./models.js";
export class PlayerController {
    constructor(piano) {
        this.piano = piano;
        this.setupListener();
    }
    setupListener() {
        let repeatAllowed;
        window.addEventListener('keydown', (event) => {
            // https://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript
            if (event.repeat != undefined) {
                repeatAllowed = !event.repeat;
            }
            if (!repeatAllowed)
                return;
            repeatAllowed = false;
            switch (event.key) {
                case "/":
                    Game.togglePause();
                    break;
            }
            this.piano.keys.forEach((key) => {
                if (key.hasKeyCode(event.key)) {
                    KeyManager.keyDown(key.id);
                }
            });
        });
        window.addEventListener('keyup', (event) => {
            repeatAllowed = true;
            this.piano.keys.forEach((key) => {
                if (key.hasKeyCode(event.key)) {
                    KeyManager.keyUp(key.id);
                }
            });
        });
    }
}
//# sourceMappingURL=input.js.map