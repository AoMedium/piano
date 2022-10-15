import { c } from './index.js';
export class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}
class Key {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    update() {
    }
}
Key.KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export class KeyManager {
    static set timeline(timeline) {
        KeyManager._timeline = timeline;
    }
    static onmousedown(key) {
        console.log(key.id + " down");
        let bounds = key.getBoundingClientRect();
        KeyManager._timeline.addNewNote(new NoteRect(key.id, bounds.x, bounds.width, bounds.y));
    }
    static onmouseup(key) {
        console.log(key.id + " up");
        KeyManager._timeline.stopPlayingNote(key.id);
    }
}
export class Piano {
    constructor() {
        this.NUM_OCTAVES = 2;
        this.keys = [];
        this.generateKeys();
    }
    update() {
        // this.keys.forEach(key => {
        //     key.update();
        // });
    }
    generateKeys() {
        let id = 0;
        let keyCount = 0;
        let piano = document.getElementById("piano");
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
                }
                else {
                    key.classList.add("white-key");
                }
                key.onmousedown = e => {
                    KeyManager.onmousedown(e.target);
                };
                key.onmouseup = e => {
                    KeyManager.onmouseup(e.target);
                };
                piano.appendChild(key);
                keyCount++;
            });
        }
    }
}
export class NoteRect {
    constructor(id, xPos, width, startY) {
        this._isPlaying = true;
        this.id = id;
        this._xPos = xPos;
        this._width = width;
        this._startY = startY;
        this._endY = startY;
    }
    update(scrollRate) {
        c.fillRect(this._xPos, this._endY, this._width, this._startY - this._endY);
        if (!this._isPlaying) {
            this._startY -= scrollRate;
        }
        this._endY -= scrollRate;
    }
    stopPlaying() {
        this._isPlaying = false;
    }
    get endHeight() {
        return this._endY;
    }
}
export class Timeline {
    constructor() {
        this._noteRects = [];
        this._scrollRate = 5;
    }
    update() {
        this._noteRects.forEach((noteRect) => {
            noteRect.update(this._scrollRate);
            // Remove if out of view
            if (noteRect.endHeight < 0) {
                let index = this._noteRects.indexOf(noteRect);
                this._noteRects.splice(index, 1);
            }
        });
    }
    addNewNote(noteRect) {
        this._noteRects.push(noteRect);
    }
    stopPlayingNote(id) {
        this._noteRects.forEach((noteRect) => {
            if (noteRect.id == id) {
                noteRect.stopPlaying();
            }
        });
    }
}
//# sourceMappingURL=models.js.map