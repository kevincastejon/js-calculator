# Calculator
### JS for HTML calculator that uses infix to postfix notation convert and resolves. 
### It also offers styles features, themes, and keypad layout customization. 
### It gives access to useful methods for JS users such as infixToPostFix ,resolvePostFix or resolveInfix methods.
## HTML Usage
Basic usage:
```HTML
    <calculator></calculator>
```
The calculator will fit 100% of its parent container width and height.<br>
You can add theme to the calculator. (The default one being "light" there is no need to specify it.)
```HTML
    <calculator theme="dark"></calculator>
```
There is the list of all the valid themes names:
- "light" or "white" or "#FFFFFF"
- "dark" or "black" or "#000000"
- "red" or "#FF0000"
- "green" or "#00FF00"
- "blue" or "#0000FF"
- "yellow" or "#FFFF00"
- "cyan" or "#00FFFF"
- "magenta" or "#FF00FF"
- "inherit"
<br>
You can add custom style options to the calculator (even if a theme is selected, custom style will be applied after the theme):

```html

<calculator theme="dark" buttonBackgroundColor="green" screenBorderColor="#00FF00"></calculator>
```

There is the list of all the available color attributes:
- buttonColor - The color of the text into the keypad buttons
- buttonBackgroundColor - The color of the keypad buttons background
- backgroundColor - The color of the background
- screenColor - The color of the text into the screen
- screenBackgroundColor - The color of the screen background
- screenBorderColor - The color of the screen border
- borderColor - The color of the calculator border
<br>
You can specify your own layout for the keypad, in a very flexible way. Simply write JSON string representing a matrix array of the desired keypad, use blank string "" when you want no button (will leave a space) and arrange to your needs!

```html

<calculator keypadMapping='[["1","2","3","CE"],
                            ["4", "5", "6", "="],
                            ["7", "8", "9", "0"],
                            ["(", "", "", ")"],
                            ["+", "-", "*", "/"]]'></calculator>
                            
```

One last attribute is the verbose one, that let the calculator show detailed operation and result into the developper's console through console.log
```html

<calculator verbose></calculator>

```
[See sources](https://github.com/lePioo/Calculator/blob/master/calculatorDemo.html)
[See demo](http://www.kevincastejon.fr/autres/demos/Calculator/calculatorDemo.html)
## JAVASCRIPT Usage
- addSymbol(string) => void <br>Adds a symbol to the screen. (WARNING! There is no validation of the symbol so be sure you don't pass in unhandled character inti this method!)
- reset() => void <br>Resets the calculator. Same as pressing "CE" key.
- answer() => void <br>Resolves the equation on the screen. Same as pressing "=" key.
- solvePostFix(string) => number <br> Returns the result of the postfix string equation passed in parameter.
- solveInfix(string) => number <br> Returns the result of the infix string equation passed in parameter.
- infixToPostfix(string) => string <br> Returns the postfix notation string of the infix notation string passed in parameters.