import { Game } from "./game.js";
export class PlayerController {
    constructor() {
        this.setupListener();
    }
    setupListener() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "/":
                    Game.togglePause();
                    break;
            }
        });
    }
}
//# sourceMappingURL=input.js.map