var format = require('./')

require('tape')(function(test) {

  test.equal(
    format({}), '{ }',
    'serializes an empty object with space')

  test.equal(
    format([]), '[ ]',
    'serializes an empty array with space')

  test.equal(
    format(''), '""',
    'serializes an empty string')

  test.equal(
    format(3.14), '3.14',
    'serializes a number')

  test.equal(
    format(null), 'null',
    'serializes null')

  test.equal(
    format(true), 'true',
    'serializes true')

  test.equal(
    format(false), 'false',
    'serializes false')

  test.equal(
    format({ a: 1 }),
    '{ "a": 1 }',
    'properly serializes a one-property object')

  test.equal(
    format({ a: [ 1, 2 ] }),
    [ '{ "a": [',
      '    1,',
      '    2 ] }' ].join('\n'),
    'properly serializes array withihn object')

  test.equal(
    format({ a: { b: 1 } }),
    [ '{ "a": {',
      '    "b": 1 } }'].join('\n'),
    'properly serializes nested objects')

  test.equal(
    format({ a: [ { b: 1 } ], c: 2 }),
    [ '{ "a": [',
      '    { "b": 1 } ],',
      '  "c": 2 }' ].join('\n'),
    'properly serializes objects in arrays')

  test.equal(
    format([ [ 1, 2 ] ]),
    [ '[ [ 1,',
      '    2 ] ]' ].join('\n'),
    'properly serializes arrays in arrays')

  test.end() })
