var format = require('./')
var fs = require('fs')
var path = require('path')

require('tape')(function (test) {
  require('glob')
  .sync('examples/**/*.json')
  .forEach(function (file) {
    var content = fs.readFileSync(file)
    .toString()
    .trim()
    test.equal(
      format(eval('(' + content + ')')), // eslint-disable-line no-eval
      content,
      path.basename(file, '.json').replace(/-/g, ' ')
    )
  })
  test.end()
})
