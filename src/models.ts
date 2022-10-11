import { c } from './index.js';
import { Game } from './game.js';

abstract class Key {

}

class BlackKey extends Key {

}

class WhiteKey extends Key {
    static readonly KEY_NAMES = ["C", "D", "E", "F", "G", "A", "B"]
}

export class Piano {

    private readonly NUM_OCTAVES: number = 2;
    private keys: Key[];

    constructor() {

    }

    public update(): void {

    }

    private generateKeys(): void {
        for (let i = 0; i < this.NUM_OCTAVES; i++) {
            
        }
    }
}