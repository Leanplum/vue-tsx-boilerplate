/* eslint-disable no-console */

var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');
var pbjs = require('protobufjs/cli/pbjs');
var pbts = require('protobufjs/cli/pbts');

function convertProtos(inputPaths, outputPath) {
  return new Promise(function(resolve, reject) {
    var indexJsFileName = path.join(outputPath, 'index.js');
    var indexTsFileName = path.join(outputPath, 'index.d.ts');

    fs.emptyDirSync(outputPath);
    inputPaths.forEach((path) => fs.copySync(path, outputPath));

    var protoInputPath = path.join(outputPath, '*.proto');

    console.log('Converting [%s] to .ts files at [%s] ...', protoInputPath, outputPath);
    pbjs.main(
      [
        '--target',
        'static-module',
        '--wrap',
        'commonjs',
        '--no-create',
        '--no-verify',
        '--no-delimited',
        '--force-message',
        protoInputPath
      ],
      function(jsError, jsOutput) {
        if (jsError) {
          reject(jsError);
          return;
        }

        console.log('  Create [%s]', indexJsFileName);
        fs.writeFileSync(indexJsFileName, jsOutput, 'utf-8');

        pbts.main([indexJsFileName], function(tsError, tsOutput) {
          if (tsError) {
            reject(tsError);
            return;
          }

          console.log('  Create [%s]', indexTsFileName);
          fs.writeFileSync(indexTsFileName, tsOutput, 'utf-8');

          rimraf(protoInputPath, function() {
            console.log('  Complete!');
            resolve();
          });
        });
      }
    );
  });
}

module.exports = convertProtos([path.resolve(__dirname, '../proto')], path.resolve(__dirname, '../src/proto')).catch(
  function(err) {
    console.error(err);
    process.exit(1);
  }
);
