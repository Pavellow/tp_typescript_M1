abstract class Entite {
  protected _pv!: number;
  protected _pvMax!: number;
  protected _state!: IState;

  constructor(pvParam: number, pvMax: number) {
    this._pv = pvParam;
    this._pvMax = pvMax;
  }

  abstract getPv(): number;
  abstract setPv(pv: number): void;
  abstract getPvMax(): number;
  abstract setPvMax(pvMax: number): void;
  abstract getState(): IState;
  abstract setState(state: IState): void;
}

export default Entite;
