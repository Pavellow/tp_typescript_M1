class KeyboardManager {
  private keyStatus: Map<string, boolean>;

  constructor() {
    this.keyStatus = new Map<string, boolean>();
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));

    window.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        event.preventDefault();
      }
    });
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.keyStatus.set(event.key, true);
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keyStatus.set(event.key, false);
  }

  public isKeyPressed(key: string): boolean {
    return this.keyStatus.get(key) || false;
  }

  public getSpecificKeyStatus(): { [key: string]: boolean } {
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
    const status: { [key: string]: boolean } = {};

    keysToCheck.forEach((key) => {
      status[key] = this.keyStatus.get(key) || false;
    });

    return status;
  }
}

export default KeyboardManager;
