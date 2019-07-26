



// choose which grammar file to use

let FILENAME = 'lovetester';
//let FILENAME = 'wizardSchool';
//let FILENAME = 'bookreview';
//let FILENAME = 'artreview';
let N = 5;







let fs = require('fs');
let Filigree = require('filigree-text').Filigree;

let loadFil = () => {
  // read filigree file
  console.log('loading ' + FILENAME);
  let src = fs.readFileSync(`grammars/${FILENAME}.filigree`, 'utf-8');
  let fil = new Filigree(src);
  return fil;
}

let generate = (fil) => {
  if (fil.err) {
    // report error message
    return '<div class="error">' + fil.err.message + '</div>';
  }
  // generate text
  let text = fil.generate('start');
  // sanitize angle-brackets so they don't count as HTML on the page
  // this helps errors show up
  text = text.split('<').join('&lt');
  // convert newlines to HTML linebreaks
  text = text.split('\n').join('<br/>');
  return text;
}

// init webserver
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', function(request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  // generate some texts
  let fil = loadFil();
  let texts = [];
  for (let ii = 0; ii < N; ii++) {
    texts.push(generate(fil));
  }
  // put them in divs for css styling
  let text = texts.map(t => '<div class="filigree">' + t + '</div>').join('\n');
  // load html template from file
  let template = fs.readFileSync('views/index.html', 'utf-8');
  // insert content into template
  let html = template.split('{{slot}}').join(text);
  // return it!
  response.set('Content-Type', 'text/html');
  response.send(html);
});

// go!
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
