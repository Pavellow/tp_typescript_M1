class KeyboardManager {
    keyStatus;
    constructor() {
        this.keyStatus = new Map();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("keydown", function (event) {
            if (event.code === "Space") {
                event.preventDefault();
            }
        });
    }
    onKeyDown(event) {
        this.keyStatus.set(event.key, true);
    }
    onKeyUp(event) {
        this.keyStatus.set(event.key, false);
    }
    isKeyPressed(key) {
        return this.keyStatus.get(key) || false;
    }
    getSpecificKeyStatus() {
        const keysToCheck = [
            "z",
            "q",
            "s",
            "d",
            "a",
            "e",
            " ",
            "Escape",
            "f",
            "ArrowLeft",
            "ArrowRight",
        ];
        const status = {};
        keysToCheck.forEach((key) => {
            status[key] = this.keyStatus.get(key) || false;
        });
        return status;
    }
}
export default KeyboardManager;
