import { c } from './index.js';
export class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}
export class Key {
    constructor(id, name) {
        this._inputKeyCodes = [];
        this.id = id;
        this.name = name;
    }
    get inputKeyCodes() {
        return this._inputKeyCodes;
    }
    set inputKeyCodes(keyCode) {
        this._inputKeyCodes = keyCode;
    }
    addInputKeyCode(keyCode) {
        this._inputKeyCodes.push(keyCode);
    }
    hasKeyCode(findKeyCode) {
        let foundKey = false; // TODO: better way to return true in anon func?
        this._inputKeyCodes.forEach(keyCode => {
            if (keyCode === findKeyCode) {
                foundKey = true;
            }
        });
        return foundKey;
    }
}
Key.KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
Key.KEY_BINDS = {
    "whiteKeys": {
        "noteRange": {
            "bottomRow": ["A0", "C2"],
            "topRow": ["A1", "G3"]
        },
        "keyCodes": {
            "bottomRow": ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
            "topRow": ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"]
        }
    },
    "blackKeys": {
        "noteRange": {
            "bottomRow": ["G#0", "C#2"],
            "topRow": ["G#1", "F#3"]
        },
        "keyCodes": {
            "bottomRow": ["a", "s", "f", "g", "j", "k", "l", "'"],
            "topRow": ["1", "2", "4", "5", "7", "8", "9", "-", "="]
        }
    }
};
export class KeyManager {
    static set timeline(timeline) {
        KeyManager._timeline = timeline;
    }
    static keyDown(key) {
        let keyId;
        if (key instanceof HTMLElement) {
        }
        else {
            key = document.getElementById(key);
        }
        keyId = key.id;
        let bounds = key.getBoundingClientRect();
        KeyManager._timeline.addNewNote(new NoteRect(keyId, bounds.x, bounds.width, bounds.y));
    }
    static keyUp(key) {
        let keyId;
        if (key instanceof HTMLElement) {
        }
        else {
            key = document.getElementById(key);
        }
        keyId = key.id;
        KeyManager._timeline.stopPlayingNote(keyId);
    }
}
export class Piano {
    constructor() {
        this.NUM_OCTAVES = 3;
        this.keys = []; // TODO: better getter
        this.generateKeys();
        this.bindKeys();
    }
    update() {
        // this.keys.forEach(key => {
        //     key.update();
        // });
    }
    generateKeys() {
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
                    KeyManager.keyDown(e.target);
                };
                key.onmouseup = e => {
                    KeyManager.keyUp(e.target);
                };
                piano.appendChild(key);
                keyCount++;
            });
        }
    }
    bindKeys() {
        let whiteKeys = [];
        let blackKeys = [];
        Key.KEY_NAMES.forEach(keyName => {
            if (keyName.includes("#")) {
                blackKeys.push(keyName);
            }
            else {
                whiteKeys.push(keyName);
            }
        });
        let whiteKeysBinds = Key.KEY_BINDS.whiteKeys;
        let noteRange = whiteKeysBinds.noteRange.bottomRow;
        let startKey = {
            "note": noteRange[0].slice(0, -1),
            "octave": parseInt(noteRange[0].slice(-1)),
        };
        let endKey = {
            "note": noteRange[1].slice(0, -1),
            "octave": parseInt(noteRange[1].slice(-1))
        };
        let startIndex = whiteKeys.indexOf(startKey.note);
        let endIndex = whiteKeys.indexOf(endKey.note);
        let keyIndex = startIndex;
        let octave = startKey.octave;
        console.log(startIndex, endIndex);
        let i = 0;
        while (true) {
            let noteName = whiteKeys[keyIndex] + octave;
            let keyCode = whiteKeysBinds.keyCodes.bottomRow[i];
            let key = new Key(noteName, noteName);
            key.addInputKeyCode(keyCode);
            console.log("bind " + noteName + " with " + keyCode);
            this.keys.push(key);
            if (keyIndex == whiteKeys.length - 1) {
                keyIndex = 0; // wrap to beginning
                octave++;
            }
            else {
                keyIndex++;
            }
            i++;
            if (keyIndex > endIndex && octave >= endKey.octave) {
                break;
            }
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
    get startY() {
        return this._startY;
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
            if (noteRect.startY < 0) {
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