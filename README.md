# Filigree Playground

A small webserver that generates text using Filigree (on the server side).

* [Open/edit it](https://glitch.com/edit/#!/filigree-playground) on Glitch
* [See the example page it makes](https://filigree-playground.glitch.me) hosted at Glitch
* This code is [also available on GitHub](https://github.com/cinnamon-bun/filigree-simple-website)
* The [Filigree library itself, and its documentation](https://github.com/cinnamon-bun/filigree)

# Glitch instructions

## To see results

If you don't see the output pane with results, click the "Show" sunglasses button in the top left and choose "Next to the code".

## To work on files

The top of `server.js` has a bunch of options including which grammar file to use,
and whether or not to show the structure of the results or only the plain text result.

Edit the grammar files in the `grammars/` folder.

Everything will reload as you type, if you give it a couple of seconds.

Making a new grammar file in Glitch is slightly weird.
You have to include the folder name as part of the filename, like `grammars/whatever.filigree`.
That's the only way to get a file into a folder.

Filigreee syntax [documentation is over here](https://github.com/cinnamon-bun/filigree)

You can change the visual styles in `public/style.css`

Errors in Filigree files will show up as part of the output page (in the right pane).
Errors in the Javascript go into Glitch's Log pane at the bottom left (inside the Tools button)

You can remove the Glitch logo from your page - look for "include the Glitch button" in `views/index.html`

# Screenshots

![](https://cdn.glitch.com/f3eb69a5-63dc-439c-bcd5-8d7344895c87%2Fscreenshot.png?v=1563411802823)

![](https://cdn.glitch.com/f3eb69a5-63dc-439c-bcd5-8d7344895c87%2Fscreenshot2.png?v=1565121372162)
