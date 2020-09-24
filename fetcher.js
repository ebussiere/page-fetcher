const fs = require('fs');
const request = require('request');

'use strict';

const inputArgs = function() {
  return process.argv.slice(2);
};

function getPage() {
  let userArgs = inputArgs();
  let site = userArgs[0];
  let path = userArgs[1];
  request(`${site}`, (error, response, body) => {
    fs.writeFile(`${path}`, body, function(err) {
      fs.stat(`${path}`, (err, stat) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${stat.size} bytes to ${path}`);
      });
    });
  });
}
getPage();