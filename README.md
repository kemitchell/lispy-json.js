At the command line:

```shellsession
$ npm install --global lispy-json
$ lispy-json < example.json
{ "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language, used to ...",
            "GlossSeeAlso": [ "GML", "XML" ] },
          "GlossSee": "markup" } } } } }
```

In JavaScript, via [npm](https://npmjs.com):

```javascript
var stringify = require('lispy-json')

console.log(stringify({an: 'object'}))
```
