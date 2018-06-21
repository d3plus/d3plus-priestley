/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

import {min, max, range} from "d3-array";
import {nest} from "d3-collection";
import {scalePoint} from "d3-scale";

import {Axis, date} from "d3plus-axis";
import {accessor, assign, configPrep, elem} from "d3plus-common";
import {Rect} from "d3plus-shape";
import {Viz} from "d3plus-viz";

/**
    @function constructAriaLabel
    @desc Returns value for aria-label property of Shapes.
    @private
*/
function constructAriaLabel(d, i) {
  return this._drawLabel(d, i) + ", " + d.data.start + " - " + d.data.end + ".";
} 

/**
    @class Priestley
    @extends external:Viz
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
    this._axis = new Axis().align("end").orient("bottom");
    this._axisConfig = {scale: "time"};
    this._axisTest = new Axis().align("end").gridSize(0).orient("bottom");
    this.end("end");
    this.start("start");

  }

  /**
      @memberof Priestley
      @desc Extends the render behavior of the abstract Viz class.
      @private
  */
  render(callback) {

    super.render(callback);

    if (!this._filteredData) return this;

    const data = this._filteredData.map((data, i) => ({
      __d3plus__: true,
      data,
      end: this._axisConfig.scale === "time" ? date(this._end(data, i)) : this._end(data, i),
      i,
      id: this._id(data, i),
      start: this._axisConfig.scale === "time" ? date(this._start(data, i)) : this._start(data, i)
    })).filter(d => d.end - d.start > 0).sort((a, b) => a.start - b.start);

    let nestedData;
    if (this._groupBy.length > 1 && this._drawDepth > 0) {
      const dataNest = nest();
      for (let i = 0; i < this._drawDepth; i++) dataNest.key(d => this._groupBy[i](d.data, d.i));
      nestedData = dataNest.entries(data);
    }
    else nestedData = [{values: data}];

    let maxLane = 0;
    nestedData.forEach(g => {
      let track = [];
      g.values.forEach(d => {
        track = track.map(t => t <= d.start ? false : t);
        const i = track.indexOf(false);
        if (i < 0) {
          d.lane = maxLane + track.length;
          track.push(d.end);
        }
        else {
          track[i] = d.end;
          d.lane = maxLane + i;
        }
      });
      maxLane += track.length;
    });

    const axisConfig = {
      domain: [min(data, d => d.start) || 0, max(data, d => d.end) || 0],
      height: this._height - this._margin.top - this._margin.bottom,
      width: this._width - this._margin.left - this._margin.right
    };

    const transform = `translate(${this._margin.left}, ${this._margin.top})`;

    this._axisTest
      .config(axisConfig)
      .config(this._axisConfig)
      .select(elem("g.d3plus-priestley-axis-test", {parent: this._select, enter: {opacity: 0}}).node())
      .render();

    this._axis
      .config(axisConfig)
      .config(this._axisConfig)
      .select(elem("g.d3plus-priestley-axis", {parent: this._select, enter: {transform}, update: {transform}}).node())
      .render();

    const axisPad = this._axisTest._padding;

    const xScale = this._axis._d3Scale;

    const yScale = scalePoint()
      .domain(range(0, maxLane, 1))
      .padding(0.5)
      .rangeRound([this._height - this._margin.bottom - this._axisTest.outerBounds().height - axisPad, this._margin.top + axisPad]);

    const step = yScale.step();

    this._shapes.push(new Rect()
      .data(data)
      .duration(this._duration)
      .height(step >= this._padding * 2 ? step - this._padding : step > 2 ? step - 2 : step)
      .label((d, i) => this._drawLabel(d.data, i))
      .select(elem("g.d3plus-priestley-shapes", {parent: this._select}).node())
      .width(d => {
        const w = Math.abs(xScale(d.end) - xScale(d.start));
        return w > 2 ? w - 2 : w;
      })
      .x(d => xScale(d.start) + (xScale(d.end) - xScale(d.start)) / 2)
      .y(d => yScale(d.lane))
      .config(configPrep.bind(this)(this._shapeConfig, "shape", "Rect"))
      .config({ariaLabel: constructAriaLabel.bind(this)})
      .render());

    return this;

  }

  /**
      @memberof Priestley
      @desc If *value* is specified, sets the config method for the axis and returns the current class instance. If *value* is not specified, returns the current axis configuration.
      @param {Object} [*value*]
      @chainable
  */
  axisConfig(_) {
    return arguments.length ? (this._axisConfig = assign(this._axisConfig, _), this) : this._axisConfig;
  }

  /**
      @memberof Priestley
      @desc If *value* is specified, sets the end accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current end accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  end(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._end = _;
      else {
        this._end = accessor(_);
        if (!this._aggs[_]) this._aggs[_] = a => max(a);
      }
      return this;
    }
    else return this._end;
  }

  /**
      @memberof Priestley
      @desc If *value* is specified, sets the start accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current start accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  start(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._start = _;
      else {
        this._start = accessor(_);
        if (!this._aggs[_]) this._aggs[_] = a => min(a);
      }
      return this;
    }
    else return this._start;
  }

}
