import { c } from './index.js';
import { Game } from './game.js';

export class Vector2 {
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

abstract class Key {
    static readonly KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    protected id: number;
    protected name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public update(): void {
        
    }

    public static onclick(key: HTMLElement): void {
        console.log(key.id);
    }
}

class BlackKey extends Key {

    public update(): void {
    }
}

class WhiteKey extends Key {

    public update(): void {
    }
}

export class Piano {

    private readonly NUM_OCTAVES: number = 2;
    private keys: Key[] = [];

    constructor() {
        this.generateKeys();
    }

    public update(): void {
        // this.keys.forEach(key => {
        //     key.update();
        // });
    }

    private generateKeys(): void {
        let id = 0;
        let keyCount = 0;

        let piano: HTMLElement = document.getElementById("piano");

        for (let i = 0; i < this.NUM_OCTAVES; i++) {
            Key.KEY_NAMES.forEach(keyName => {
                let key = document.createElement("li");
                key.id = keyName + i;
                key.classList.add("unpressed");

                if (keyCount == 0) {
                    key.classList.add("key-left-end");
                }

                if (keyName.includes("#")) {
                    key.classList.add("black-key");
                } else {
                    key.classList.add("white-key");
                }

                key.onclick = e => {
                    Key.onclick(e.target as HTMLElement);
                }

                piano.appendChild(key);
                keyCount++;
            });
        }
    }
}