import {test} from "tape";
import {default as Priestley} from "../src/Priestley.js";

test("Priestley", assert => {

  new Priestley()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
