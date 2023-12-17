import Player from "./Player.js";
import PlayerState from "./PlayerState.js";

class PlayerStateIdle extends PlayerState {
  constructor(player: Player) {
    super(player);
  }

  public handleChangeState(): void {
    console.log("Player state : idle");
  }

  public draw(): void {
    console.log("Draw player idle");
  }
}

export default PlayerStateIdle;
