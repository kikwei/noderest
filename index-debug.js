/*
 * Primary file for the API
 * 
 */

//Dependencies
const server = require("./lib/server");
const workers = require("./lib/workers");
const helpers = require("./lib/helpers");
const cli = require("./lib/cli");
const exampleDebuggingProblem = require("./lib/exampleDebuggingProblem");
// helpers.sendTwilioSms("4158375309", `Hello`, function(err) {
//   console.log(`Error: ${err}`);
// });

// Declare the app
const app = {};

// Init the function
app.init = function() {
  // Start the server
  debugger;
  server.init();
  debugger;

  debugger;
  let foo = 1;
  console.log("Just assigned 1 to foo");
  debugger;

  debugger;
  foo++;
  console.log("Incremented foo by 1");
  debugger;

  foo = foo * foo;
  console.log("Just squared foo");

  foo.toString();
  console.log("Converted foo to a string");
  // Start the exampleDebugInit
  debugger;
  exampleDebuggingProblem.init();
  console.log("Just called the library");
  debugger;

  // Start the workers
  debugger;
  workers.init();
  debugger;

  // Start the CLI, but we make sure it starts last
  debugger;
  setTimeout(function() {
    cli.init();
    debugger;
  }, 50);
};
debugger;

// Execute
debugger;
app.init();
debugger;

// Export the app
module.exports = app;
