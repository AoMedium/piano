import { Game } from "./game.js";
import { KeyManager, Piano, Key } from "./models.js";


export class PlayerController {

    private piano: Piano;

    constructor(piano: Piano) {
        this.piano = piano;
        this.setupListener();
    }

    private setupListener() {
        let repeatAllowed: boolean;

        window.addEventListener('keydown', (event) => {
            // https://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript

            if (event.repeat != undefined) {
                repeatAllowed = !event.repeat;
            }
            if (!repeatAllowed) return;
            repeatAllowed = false;


            switch (event.key) {
                case "/":
                    Game.togglePause();
                    break;
            }

            this.piano.keys.forEach((key: Key) => {
                if (key.hasKeyCode(event.key)) {
                    KeyManager.keyDown(key.id);
                }
            });
        });

        window.addEventListener('keyup', (event) => {
            repeatAllowed = true;

            this.piano.keys.forEach((key: Key) => {
                if (key.hasKeyCode(event.key)) {
                    KeyManager.keyUp(key.id);
                }
            });
        });
    }
}