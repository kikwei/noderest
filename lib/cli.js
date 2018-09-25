/*
 * CLI-Related Tasks
 * 
 */

// Dependencies
const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');

class _events extends events {};
let e = new _events();

// Instantiate the CLI module object
let cli = {};

// Input processor
cli.processInput = function(str) {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    // Only process the input if the user wrote something. Otherwise ignore
    if (str) {
        // Codify the unique strings that identify the unique questions allowed to be asked
        let uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        // Find a match of what the user sent....Go thru the possible inputs and emit an event when a match is found
        let matchFound = false;
        let counter = 0;
        uniqueInputs.some(function(input) {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                // Emit an event matching the unique input, and include the full string given by the user
                e.emit(input, str);
                return true;
            }
        });

        // If no match is found, tell the user try again
        if (!matchFound) {
            console.log('Sory try again');
        }
    }
}

// Init script
cli.init = function() {
    // Send the start message to the console, in dark blue
    console.log('\x1b[34m%s\x1b[0m', `The CLI is running`);

    // Start the interface
    let _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input separately
    _interface.on('line', function(str) {
        cli.processInput(str);

        // Re-initialize the prompt afterwards
        _interface.prompt();
    });

    // If the user stops the CLI, kill the associated process
    _interface.on('close', function() {
        process.exit(0);
    });
};




// Export the module
module.exports = cli;