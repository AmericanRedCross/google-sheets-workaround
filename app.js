const settings = require('./settings.js');

const fs = require('fs');
const path = require('path');

const async = require('async');
const needle = require('needle');


function grabSheets(cb){
  
  function grab(item, callback){
    console.log("fetching: ", item.url);
    var fileName = item.name + ".csv";
    var needleOptions = {
      follow_max : 10    // follow up to ten redirects
    }
    needle.get(item.url, needleOptions, function(error, response) {
      if (!error && response.statusCode == 200){
        var outputFile = path.join(__dirname,'files',fileName);
        if (fs.existsSync(outputFile)) {
          fs.unlinkSync(outputFile);
        }
        console.log("writing: ", fileName);
        fs.writeFileSync(outputFile, response.body, 'utf8');
        callback(null, fileName);
      } else {
        callback(error)
      }
    });
  }
  
  async.mapLimit(settings.urls, 1, grab, cb);
  
}

grabSheets(function(err, results){
  console.log("err: ", err)
  console.log("results: ", results)
  
})