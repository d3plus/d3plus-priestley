import assert from "assert";
import {default as Priestley} from "../src/Priestley.js";
import it from "./jsdom.js";

it("Priestley", function *() {

  yield cb => {

    new Priestley().render(cb);

  };

  assert.strictEqual(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
  assert.strictEqual(document.getElementsByClassName("d3plus-Priestley").length, 1, "created <g> container element");

});