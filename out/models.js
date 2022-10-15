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
    static onclick(key) {
        console.log(key);
    }
}
Key.KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
class BlackKey extends Key {
    update() {
    }
}
class WhiteKey extends Key {
    update() {
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
                key.setAttribute("onclick", "Key.onclick(this)"); // As cannot assign onclick to string in TypeScript
                piano.appendChild(key);
                keyCount++;
            });
        }
    }
}
//# sourceMappingURL=models.js.map