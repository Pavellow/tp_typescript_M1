import Player from "./Player.js";

abstract class PlayerState implements IState {
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
  }

  public abstract handleChangeState(): void;
  public abstract draw(): void;
}

export default PlayerState;
