import Pockets from './Pockets';

class Exchange {

  constructor() {
    this._pockets = new Pockets();
  }

  get pockets() {
    return this._pockets;
  }

  toJSON() {
    const pockets = this.pockets.toJSON();

    return {
      pockets
    };
  }

}

export default new Exchange();
