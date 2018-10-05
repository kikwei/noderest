/*
 * Library for storing and editing data
 * 
 */

// Dependencies
const fs = require(`fs`); //provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
const path = require(`path`); //used to normalize the paths to different directories
const helpers = require(`./helpers`);

// Container for the module(to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, `/../.data`); //__dirname nodejs constant => directory where we are right now.

// Write data to a file
lib.create = function(dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + `/` + dir + `/` + file + `.json`, `wx`, function(
    err,
    fileDescriptor
  ) {
    //fileDescriptor -> way to uniquely identify a specific file.
    if (!err && fileDescriptor) {
      // Convert data to string so as to write it to the file
      const stringData = JSON.stringify(data);

      // Write to a file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback(`Error closing new file`);
            }
          });
        } else {
          callback(`Error writing to new file`);
        }
      });
    } else {
      callback(err + fileDescriptor);
    }
  });
};

// Read data from file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + `/` + dir + `/` + file + `.json`, `utf-8`, function(
    err,
    data
  ) {
    if (!err && data) {
      const parsedData = helpers.parsejsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

//update data inside a file
lib.update = function(dir, file, data, callback) {
  //Open the file for writing
  fs.open(lib.baseDir + `/` + dir + `/` + file + `.json`, `r+`, function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      //Convert the data to string
      const stringData = JSON.stringify(data);

      //Truncate the file
      fs.ftruncate(fileDescriptor, function(err) {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback(`Error while closing file`);
                }
              });
            } else {
              callback(`Error updating file`);
            }
          });
        } else {
          callback(`Eroor truncating file`);
        }
      });
    } else {
      callback(`Could not open file for updating, it may not exist yet.`);
    }
  });
};

//Delete a file
lib.delete = function(dir, file, callback) {
  //unlinking the file
  fs.unlink(lib.baseDir + `/` + dir + `/` + file + `.json`, function(err) {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`);
    }
  });
};

// List all items in a given directory
lib.lists = function(dir, callback) {
  fs.readdir(`${lib.baseDir}/${dir}`, function(err, data) {
    if (!err && data && data.length > 0) {
      let trimmedFileNames = [];
      data.forEach(function(fileName) {
        trimmedFileNames.push(fileName.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

// Export the module
module.exports = lib;
