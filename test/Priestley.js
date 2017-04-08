import zora from "zora";
import {default as Priestley} from "../src/Priestley.js";

export default zora()
  .test("Priestley", function *(assert) {

    yield cb => new Priestley().render(cb);
    assert.ok(true, "function success");

  });
