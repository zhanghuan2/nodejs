#!/usr/bin/env node

var program = require('commander');
program
  .version('0.0.1')
  .option('a, add', 'Add project')
  .option('l, list', 'list project')
  .parse(process.argv);
console.log(process.argv);
if (program.add) console.log('add cmd');
if (program.list) console.log('list cmd');

//if(!program.args.length){
//  program.help()
//}