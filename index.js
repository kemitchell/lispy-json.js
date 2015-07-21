/* Copyright 2015 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

function indent(depth) {
  return new Array((depth * 2) + 1).join(' ') }

function isArrayOfScalars(array) {
  return array.every(function(element) {
    var type = typeof element
    return (
      type === 'string' ||
      type === 'number' ||
      type === 'boolean' ||
      element === null ) }) }

function formatArray(depth, flush, argument, MAX_WIDTH) {
  if (argument.length === 0) {
    return '[ ]' }
  else {
    var stringified = argument.map(function(element) {
      return lispyJSON(depth + 1, true, element, MAX_WIDTH) || 'null' })
    var leadingSpaces = indent(depth + 1)
    var singleLineLength = (
      leadingSpaces +
      stringified.reduce(function(length, element) {
        return length + element.length
      }, 0))
    var fitsOnSingleLine = singleLineLength < MAX_WIDTH
    if (isArrayOfScalars(argument)) {
      if (fitsOnSingleLine || stringified.length === 1) {
        return ( '[ ' + stringified.join(', ') + ' ]' ) }
      else { // 2 or more elements
        var anyTooLong = stringified.some(function(element) {
          return ( leadingSpaces + 1 + element.length ) > MAX_WIDTH })
        return (
          '[' +
          ( ( anyTooLong && !flush ) ? '\n' + leadingSpaces : ' ' ) +
          stringified.reduce(function(lines, element) {
            if (lines.length === 0) {
              return [ [ element ] ] }
            else {
              var lastLine = lines[lines.length - 1]
              var lastStringLength = lastLine.reduce(
                function(total, element) { return total + element.length },
                0) +
                ( ( lastLine.length - 1 ) * 2 )
              // Too long for the line
              if (( leadingSpaces.length + lastStringLength + element.length + 2 ) >= MAX_WIDTH) {
                lines.push([ element ]) }
              // Fits on the last line
              else {
                lastLine.push(element) }
              return lines }
          }, [ ])
            .map(function(line) { return line.join(', ') })
            .join(',\n' + leadingSpaces) +
          ' ]') } }
    else {
      return (
        '[' +
        (flush ? ' ' : '\n' + leadingSpaces) +
        stringified.join(',\n' + leadingSpaces) +
        ' ]' ) } } }

function formatObject(depth, flush, argument, MAX_WIDTH) {
  var properties = new Array
  for (var key in argument) {
    if (argument.hasOwnProperty(key)) {
      var value = lispyJSON(
        depth + 1, false, argument[key], MAX_WIDTH)
      if (value) {
        properties.push(JSON.stringify(key) + ': ' + value) } } }
  if (properties.length === 0) {
    return '{ }' }
  else {
    return (
      '{' +
      (flush ? ' ' : '\n' + indent(depth + (flush ? 2 : 1))) +
      properties.join(',\n' + indent(depth + 1)) +
      ' }' ) } }

function lispyJSON(depth, flush, argument, MAX_WIDTH) {
  MAX_WIDTH = MAX_WIDTH || 72
  var type = typeof argument
  if (type === 'string') {
    return JSON.stringify(argument) }
  else if (type === 'number') {
    return isFinite(argument) ? String(argument) : 'null' }
  else if (type === 'boolean') {
    return argument ? 'true' : 'false' }
  else if (type === 'object') {
    if (!argument) {
      return 'null' }
    else {
      if (Array.isArray(argument)) {
        return formatArray(depth, flush, argument, MAX_WIDTH) }
      else { // object
        return formatObject(depth, flush, argument, MAX_WIDTH) } } } }

module.exports = lispyJSON.bind(this, 0, true)
