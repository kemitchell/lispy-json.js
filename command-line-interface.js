#!/usr/bin/env node

var input = ''

process.stdin
  .on('data', function(buffer) {
    input += buffer.toString() })
  .on('end', function() {
    console.log(require('./')(JSON.parse(input))) })

process.stdin.resume()
