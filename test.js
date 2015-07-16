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
    [ '{ "a": [ 1, 2 ] }' ].join('\n'),
    'properly serializes array within object')

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
    format([ [ 'a', 1, true, null ] ]),
    [ '[ [ "a", 1, true, null ] ]' ].join('\n'),
    'inlines arrays of scalar values')

  test.equal(
    format([ [ 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta',
               'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu',
               'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon',
               'phi', 'chi', 'psi', 'omega'] ]),
    [ '[ [ "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta",',
      '    "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron",',
      '    "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi",',
      '    "omega" ] ]' ].join('\n'),
    'wraps long inline arrays')

  test.end() })
