import { Game } from "./game.js";


export class PlayerController {

    constructor() {
        this.setupListener();
    }

    private setupListener() {
        window.addEventListener('keydown', (event) => {

            switch (event.key) {
                case "/":
                    Game.togglePause();
                    break;
            }
        });
    }
}

