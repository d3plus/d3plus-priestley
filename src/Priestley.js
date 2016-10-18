import {Viz} from "d3plus-viz";

/**
    @class Priestley
    @extends Viz
    @desc Creates a priestley timeline based on an array of data.
*/
export default class Priestley extends Viz {

  /**
      @memberof Priestley
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

  }

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  render(callback) {

    super.render(callback);

    return this;

  }

}
