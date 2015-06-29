function indentation(level) {
  return new Array((level * 2) + 1).join(' ') }

function lispyJSON(level, value) {
  var type = typeof value
  if (type === 'string') {
    return JSON.stringify(value) }
  else if (type === 'number') {
    return isFinite(value) ? String(value) : 'null' }
  else if (type === 'boolean') {
    return value ? 'true' : 'false' }
  else if (type === 'object') {
    if (!value) {
      return 'null' }
    else {
      var indentationSpaces
      if (Array.isArray(value)) {
        var stringifiedElements = value.map(function(element) {
          return lispyJSON(level + 1, element) || 'null' })
        if (stringifiedElements.length === 0) {
          return '[ ]' }
        else {
          indentationSpaces = indentation(level + 1)
          return (
            '[' +
            (level === 0 ? ' ' : '\n' + indentationSpaces) +
            stringifiedElements.join(',\n' + indentationSpaces) + 
            ' ]' ) } }
      else { // object
        var properties = new Array
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var stringifiedValue = lispyJSON(level + 1, value[key])
            if (stringifiedValue) {
              properties.push(
                JSON.stringify(key) + ': ' + stringifiedValue) } } }
        if (properties.length === 0) {
          return '{ }' }
        else {
          indentationSpaces = indentation(level + 1)
          return (
            '{' +
            (level === 0 ? ' ' : '\n' + indentationSpaces) +
            properties.join(',\n' + indentationSpaces) +
            ' }' ) } } } } }

module.exports = lispyJSON.bind(this, 0)
