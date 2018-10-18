/*
 * Unit Tests
 *
 */

// Dependencies
const helpers = require("./../lib/helpers");
const assert = require("assert"); //Allows us to write simple syntax that asserts that one thing should equal something else otherwise it will create an assertion error
const logs = require("./../lib/logs");
const exampleDebuggingProblem = require("./../lib/exampleDebuggingProblem");

// Holder for tests
let unit = {};

// Assert that getANumber function is returning a number
unit["helpers.getANumber should return a number"] = function(done) {
  let val = helpers.getANumber();
  assert.equal(typeof val, "number");
  done();
};

// Assert that getANumber function is returning a 1
unit["helpers.getANumber should return 1"] = function(done) {
  let val = helpers.getANumber();
  assert.equal(val, 1);
  done();
};

// Assert that getANumber function is returning a 2
unit["helpers.getANumber should return 2"] = function(done) {
  let val = helpers.getANumber();
  assert.equal(val, 2);
  done();
};

// logs.list should callback an array and a false error
unit[
  "logs.list should callback a false error and an array of log names"
] = function(done) {
  logs.list(true, function(err, logFileNames) {
    assert.equal(err, false);
    assert.ok(logFileNames instanceof Array);
    assert.ok(logFileNames.length > 0);
    done();
  });
};

// logs.truncate should not throw if the loggedId doesn't exist
unit[
  "logs.truncate should not throw if the loggedId doesn't exist. It should callback an error instead"
] = function(done) {
  assert.doesNotThrow(function() {
    logs.truncate("I do not exist", function(err) {
      assert.ok(err);
      done();
    });
  }, TypeError);
};

// exampleDebuggingProblem.init should not throw(but it does)
unit["exampleDebuggingProblem.init should not throw when called"] = function(
  done
) {
  assert.doesNotThrow(function() {
    exampleDebuggingProblem.init();
    done();
  }, TypeError);
};

// Export the tests to the runner
module.exports = unit;
