# Filigree Playground

A small webserver that generates Filigree text (on the server side).

Run it on Glitch:
https://glitch.com/edit/#!/filigree-playground

Example page it makes:
https://filigree-playground.glitch.me

This code is also on GitHub:
https://github.com/cinnamon-bun/filigree-simple-website

# Glitch instructions

## To see results

If you don't see the output pane with results, click the "Show" sunglasses button in the top left and choose "Next to the code".

## To work on files

Choose which grammar to use at the top of `server.js`.

Edit the grammar files in the `grammars/` folder.

Everything will reload as you type, if you give it a couple of seconds.

Making a new grammar file is slightly weird.
You have to include the folder name as part of the filename, like `grammars/whatever.filigree`.
That's the only way to get a file into a folder.

Filigreee syntax [documentation is over here](https://github.com/cinnamon-bun/filigree)

You can change the visual styles in `public/style.css`

Errors in Filigree files will show up in the output pane on the right.
Errors in the Javascript go into the Log pane at the bottom left (inside the Tools button)
