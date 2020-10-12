## To use Sass:
-- if using VS Code already, install extension "Live Sass Compiler"
-- in the settings, add below:
      "
      liveSassCompile.settings.formats": [
        {
            "format": "compressed",
            //"extensionName": ".css",
            "savePath": "/css"
        }
    ],
    "liveSassCompile.settings.generateMap": false
-- now you can use Sass with VS Code, just click on the blue panel icon "Watch Sass" or use any other way which suits you



## To run the app in the browser:
-- if using VS Code already, install extension "Live Server", and in the html click the right mouse button and pick "Open with Live Server" or use any other way which suits you


## Assumptions:
-- client browser supports ES6
-- if libraries would be allowed, for financial aspect of the app I would use decimal library to avoid floating errors
-- employee form and task form are completely independent
-- keyboard is used only for filling out the inputs
-- input "Kwota w PLN" accept only digits
