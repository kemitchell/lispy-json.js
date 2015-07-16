/*
 * Copyright 2015 Kyle E. Mitchell
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

var MAX_WIDTH = 72

function lispyJSON(depth, flush, argument) {
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
        var stringifiedElements = argument.map(function(element) {
          return lispyJSON(depth + 1, true, element) || 'null' })
        if (stringifiedElements.length === 0) {
          return '[ ]' }
        else {
          var leadingSpaces = indent(depth + 1)
          if (isArrayOfScalars(argument)) {
            var lastStringified = stringifiedElements.length - 1
            var rows = stringifiedElements
              .reduce(function(rows, stringified, stringifiedIndex) {
                var lastRowIndex = rows.length - 1
                var lastRow = rows[lastRowIndex]
                var isLast = stringifiedIndex === lastStringified
                var comma = (isLast ? '' : ',')
                var additionalLength = stringified.length + comma.length + 1
                if (leadingSpaces.length + lastRow.length + additionalLength > MAX_WIDTH) {
                  rows.push(' ' + stringified + comma) }
                else {
                  rows[lastRowIndex] = (
                    lastRow + ( lastRow.length > 0 ? ' ' : '' ) + stringified + comma )}
                return rows
              }, [''])
            return (
              '[ ' +
              rows
                .map(function(x) { return x.trim() })
                .join('\n' + leadingSpaces) +
              ' ]' ) }
          else {
            return (
              '[' +
              (flush ? ' ' : '\n' + leadingSpaces) +
              stringifiedElements.join(',\n' + leadingSpaces) + 
              ' ]' ) } } }
      else { // object
        var properties = new Array
        for (var key in argument) {
          if (argument.hasOwnProperty(key)) {
            var value = lispyJSON(
              depth + 1, false, argument[key])
            if (value) {
              properties.push(JSON.stringify(key) + ': ' + value) } } }
        if (properties.length === 0) {
          return '{ }' }
        else {
          return (
            '{' +
            (flush ? ' ' : '\n' + indent(depth + (flush ? 2 : 1))) +
            properties.join(',\n' + indent(depth + 1)) +
            ' }' ) } } } } }

module.exports = lispyJSON.bind(this, 0, true)
