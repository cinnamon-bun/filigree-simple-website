let capFirst = (s) =>
    s[0].toUpperCase() + s.slice(1);
//=================================================================
// SETTINGS

// choose which grammar file to use

//let FILENAME = 'artreview';
//let FILENAME = 'bookreview';
//let FILENAME = 'headlines';
//let FILENAME = 'insults';
//let FILENAME = 'lovetester';
let FILENAME = 'wiggleworld';
//let FILENAME = 'wizardschool';


// how many messages to generate
let N = 50;

// if this is set, you'll get the same results every time.
// set to null to get different results every time.
let RANDOM_SEED = 'abc';

// draw boxes around the rule structure?
let SHOW_STRUCTURE = false;

// title to show at the top of the page
let TITLE = capFirst(FILENAME);





//=================================================================
// SERVER CODE

let fs = require('fs');
let Filigree = require('filigree-text').Filigree;

let loadFil = () => {
  // read filigree file
  console.log('loading ' + FILENAME);
  let src = fs.readFileSync(`grammars/${FILENAME}.filigree`, 'utf-8');
  let fil = new Filigree(src, RANDOM_SEED);
  return fil;
}

// declare a couple of wrapper functions to use, depending on whather we want to show the structure

// in this default version we neuter the angle brackets so we can see unreplaced rules in the output,
// otherwise they would be treated as actual HTML tags and hidden by the browser
let doNotWrapperFn = (rule, text) =>
  text
  .split('<').join('&lt');

// in this fancier wrapper function, we show the rule name in a box.
// but we can't show leftover unmatched <rules> in the output because we can't
// mess with their angle brackets without breaking the real HTML we're adding here.
let fancyWrapperFn = (rule, text) =>
  `<div class="container">
    <sup class="ruleName">${rule}</sup>
    <div class="output">${text}</div>
  </div>`;

// function to generate one message
let generateOneMessage = (fil) => {
  if (fil.err) {
    // report error message
    return '<div class="error">' + fil.err.message.split('<').join('&lt;') + '</div>';
  }
  // generate text
  let text = fil.generate('start', SHOW_STRUCTURE ? fancyWrapperFn : doNotWrapperFn);
  return text;
}

// create webserver
const express = require('express');
const app = express();
app.use(express.static('public'));

// when the page is loaded...
app.get('/', function(request, response) {
  // generate some texts
  let fil = loadFil();
  let texts = [];
  for (let ii = 0; ii < N; ii++) {
    texts.push(generateOneMessage(fil));
  }
  
  // put them each in divs for css styling
  let text = texts.map(t => '<div class="filigreeMessage">' + t + '</div>').join('\n');

  // add the title above the messages
  text = '<div class="title">' + TITLE + '</div>\n' + text;
  
  // load html template from file
  let template = fs.readFileSync('views/index.html', 'utf-8');
  
  // insert content into template
  let html = template.split('{{slot}}').join(text);

  // return it!
  response.set('Content-Type', 'text/html');
  response.send(html);
});

// start the server
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
