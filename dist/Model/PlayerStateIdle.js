import PlayerState from "./PlayerState.js";
class PlayerStateIdle extends PlayerState {
    constructor(player) {
        super(player);
    }
    handleChangeState() {
        console.log("Player state : idle");
    }
    draw() {
        console.log("Draw player idle");
    }
}
export default PlayerStateIdle;
