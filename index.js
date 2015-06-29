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

function indentation(level) {
  return new Array((level * 2) + 1).join(' ') }

function lispyJSON(level, flush, value) {
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
          return lispyJSON(level + 1, true, element) || 'null' })
        if (stringifiedElements.length === 0) {
          return '[ ]' }
        else {
          indentationSpaces = indentation(level + 1)
          return (
            '[' +
            (flush ? ' ' : '\n' + indentationSpaces) +
            stringifiedElements.join(',\n' + indentationSpaces) + 
            ' ]' ) } }
      else { // object
        var properties = new Array
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var stringifiedValue = lispyJSON(level + 1, false, value[key])
            if (stringifiedValue) {
              properties.push(
                JSON.stringify(key) + ': ' + stringifiedValue) } } }
        if (properties.length === 0) {
          return '{ }' }
        else {
          return (
            '{' +
            (flush ? ' ' : '\n' + indentation(level + (flush ? 2 : 1))) +
            properties.join(',\n' + indentation(level + 1)) +
            ' }' ) } } } } }

module.exports = lispyJSON.bind(this, 0, true)
