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
}

export class KeyManager {

    private static _timeline: Timeline;

    static set timeline(timeline: Timeline) {
        KeyManager._timeline = timeline;
    }

    public static onmousedown(key: HTMLElement): void {
        console.log(key.id + " down");

        let bounds: DOMRect = key.getBoundingClientRect();
        KeyManager._timeline.addNewNote(new NoteRect(key.id, bounds.x, bounds.width, bounds.y));
    }
    public static onmouseup(key: HTMLElement): void {
        console.log(key.id + " up");

        KeyManager._timeline.stopPlayingNote(key.id);
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

                key.onmousedown = e => {
                    KeyManager.onmousedown(e.target as HTMLElement);
                }

                key.onmouseup = e => {
                    KeyManager.onmouseup(e.target as HTMLElement);
                }

                piano.appendChild(key);
                keyCount++;
            });
        }
    }
}

export class NoteRect {
    public readonly id: string;
    private _xPos: number;
    private _startY: number;
    private _endY: number;
    private readonly _width: number;

    private _isPlaying: boolean = true;

    constructor(id: string, xPos: number, width: number, startY: number) {
        this.id = id;
        this._xPos = xPos;
        this._width = width;
        this._startY = startY;
        this._endY = startY;
    }
    
    public update(scrollRate: number): void {
        c.fillRect(this._xPos, this._endY, this._width, this._startY - this._endY);

        if (!this._isPlaying) {
            this._startY -= scrollRate;
        }
        this._endY -= scrollRate;
    }

    public stopPlaying(): void {
        this._isPlaying = false;
    }

    get endHeight(): number {
        return this._endY;
    }
}

export class Timeline {
    private _noteRects: NoteRect[] = [];
    private _scrollRate: number = 5;

    constructor() {

    }

    public update(): void {
        this._noteRects.forEach((noteRect: NoteRect) => {
            noteRect.update(this._scrollRate);

            // Remove if out of view
            if (noteRect.endHeight < 0) {
                let index = this._noteRects.indexOf(noteRect);
                this._noteRects.splice(index, 1);
            }
            
        });
    }

    public addNewNote(noteRect: NoteRect): void {
        this._noteRects.push(noteRect);
    }

    public stopPlayingNote(id: string): void {
        this._noteRects.forEach((noteRect: NoteRect) => {
            if (noteRect.id == id) {
                noteRect.stopPlaying();
            }
        });
    }
}