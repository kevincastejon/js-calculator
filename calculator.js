let calculators = [];

document.addEventListener("DOMContentLoaded", function () {
    let calcs = document.getElementsByTagName("calculator");
    let max = calcs.length;
    for (let i = 0; i < max; i++) {
        let calc = new Calculator();
        calculators.push(calc);
        calc.init(calcs[i]);
    }
    window.addEventListener("resize", function () {
        
        let max2 = calculators.length;
        for (let i = 0; i < max2; i++) {
            let calc = calculators[i];
            calc._resize();

        }
    });
});

class Calculator {

    init(calcDiv) {
        this._calcDiv = calcDiv;
        let themes = {
            white: {
                buttonColor: "#000000",
                buttonBackgroundColor: "#F0F0F0",
                backgroundColor: "#FFFFFF",
                screenColor: "#000000",
                screenBackgroundColor: "#FFFFFF",
                screenBorderColor: "#000000",
                borderColor: "#000000"
            },
            black: {
                buttonColor: "#FFFFFF",
                buttonBackgroundColor: "#1F1F1F",
                backgroundColor: "#000000",
                screenColor: "#FFFFFF",
                screenBackgroundColor: "#000000",
                screenBorderColor: "#FFFFFF",
                borderColor: "#FFFFFF"
            },
            red: {
                buttonColor: "#FFFFFF",
                buttonBackgroundColor: "#ff4242",
                backgroundColor: "#FF0000",
                screenColor: "#FFFFFF",
                screenBackgroundColor: "#FF0000",
                screenBorderColor: "#FFFFFF",
                borderColor: "#FFFFFF"
            },
            green: {
                buttonColor: "#000000",
                buttonBackgroundColor: "#80ff80",
                backgroundColor: "#00FF00",
                screenColor: "#000000",
                screenBackgroundColor: "#00FF00",
                screenBorderColor: "#000000",
                borderColor: "#000000"
            },
            blue: {
                buttonColor: "#FFFFFF",
                buttonBackgroundColor: "#7171ff",
                backgroundColor: "#0000FF",
                screenColor: "#FFFFFF",
                screenBackgroundColor: "#0000FF",
                screenBorderColor: "#FFFFFF",
                borderColor: "#FFFFFF"
            },
            yellow: {
                buttonColor: "#000000",
                buttonBackgroundColor: "#ffff91",
                backgroundColor: "#FFFF00",
                screenColor: "#000000",
                screenBackgroundColor: "#FFFF00",
                screenBorderColor: "#000000",
                borderColor: "#000000"
            },
            cian: {
                buttonColor: "#000000",
                buttonBackgroundColor: "#aefdfd",
                backgroundColor: "#00FFFF",
                screenColor: "#000000",
                screenBackgroundColor: "#00FFFF",
                screenBorderColor: "#000000",
                borderColor: "#000000"
            },
            magenta: {
                buttonColor: "#000000",
                buttonBackgroundColor: "#ff93ff",
                backgroundColor: "#FF00FF",
                screenColor: "#000000",
                screenBackgroundColor: "#FF00FF",
                screenBorderColor: "#000000",
                borderColor: "#000000"
            },
            inherit: {
                buttonColor: "inherit",
                buttonBackgroundColor: "inherit",
                backgroundColor: "inherit",
                screenColor: "inherit",
                screenBackgroundColor: "inherit",
                screenBorderColor: "inherit",
                borderColor: "inherit"
            }
        };
        themes["#FFFFFF"] = themes.light = themes.white;
        themes["#000000"] = themes.dark = themes.black;
        themes["#FF0000"] = themes.red;
        themes["#00FF00"] = themes.green;
        themes["#0000FF"] = themes.blue;
        themes["#FFFF00"] = themes.yellow;
        themes["#0000FF"] = themes.cian;
        themes["#FF00FF"] = themes.magenta;
        let currentTheme= "light";
        if (calcDiv.hasAttribute( "theme"))
        currentTheme = calcDiv.getAttribute("theme");
        

        let buttonColor = themes[currentTheme].buttonColor;
        let buttonBackgroundColor = themes[currentTheme].buttonBackgroundColor;
        let backgroundColor = themes[currentTheme].backgroundColor;
        let screenColor = themes[currentTheme].screenColor;
        let screenBackgroundColor = themes[currentTheme].screenBackgroundColor;
        let screenBorderColor = themes[currentTheme].screenBorderColor;
        let borderColor = themes[currentTheme].borderColor;

        if (calcDiv.hasAttribute("buttonColor")) buttonColor = calcDiv.getAttribute("buttonColor");
        if (calcDiv.hasAttribute("buttonBackgroundColor")) buttonBackgroundColor = calcDiv.getAttribute("buttonBackgroundColor");
        if (calcDiv.hasAttribute("backgroundColor")) backgroundColor = calcDiv.getAttribute("backgroundColor");
        if (calcDiv.hasAttribute("screenColor")) screenColor = calcDiv.getAttribute("screenColor");
        if (calcDiv.hasAttribute("screenBackgroundColor")) screenBackgroundColor = calcDiv.getAttribute("screenBackgroundColor");
        if (calcDiv.hasAttribute("screenBorderColor")) screenBorderColor = calcDiv.getAttribute("screenBorderColor");
        if (calcDiv.hasAttribute("borderColor")) borderColor = calcDiv.getAttribute("borderColor");

        let buttonsMapping = [['(', ')', '^', 'CE'],
                            ['7', '8', '9', '/'],
                            ['4', '5', '6', '*'],
                            ['1', '2', '3', '-'],
                            ['0', '.', '=', '+']];
        if (calcDiv.hasAttribute("keypadMapping")) buttonsMapping = JSON.parse(calcDiv.getAttribute("keypadMapping"));

        let html = '<div class="calculator" style="border: 1px solid; border-color:' + borderColor + ';height: 100%;box-sizing: border-box;background-color: ' + backgroundColor + ';"><p class="screen" style="overflow: auto;margin: 0;padding: 10px;border: 1px solid; border-color: ' + screenBorderColor + ';text-align: right;height: 20%;color: ' + screenColor + ';background-color: ' + screenBackgroundColor + ';box-sizing: border-box;background-color: ' + backgroundColor + ';">0</p><table class="calculatorTable" style="width: 100%;height: 80%;box-sizing: border-box;background-color: ' + backgroundColor + ';">';
        let maxI = buttonsMapping.length;
        let maxK = buttonsMapping[1].length;

        for (let i = 0; i < maxI; i++) {
            html += '<tr style="">';
            for (let k = 0; k < maxK; k++) {
                html += '<td style="';
                if(buttonsMapping[i][k]=="")html+=" disabled;opacity:0;"
                html += ' width: '+(100/maxK)+'%;height: '+(100/maxI)+'%;box-sizing: border-box;background-color: ' + backgroundColor + ';"><button style="width: 100%;height: 100%;color: ' + buttonColor + '; background-color: ' + buttonBackgroundColor + ';font-size:inherit;box-sizing: border-box;border:0px" ';
                if (buttonsMapping[i][k] == ')') html += 'disabled class="closePar" ';
                else if (buttonsMapping[i][k] == '(') html += 'class="openPar" ';
                else if (buttonsMapping[i][k] == '+') html += 'class="opPlus" ';
                else if (buttonsMapping[i][k] == '-') html += 'class="opMinus" ';
                else if (buttonsMapping[i][k] == '*') html += 'class="opMult" ';
                else if (buttonsMapping[i][k] == '/') html += 'class="opDiv" ';
                else if (buttonsMapping[i][k] == '^') html += 'class="opPow" ';
                else if (buttonsMapping[i][k] == '.') html += 'class="opComa" ';
                else if (buttonsMapping[i][k] == '0') html += 'class="keyZero" ';
                else if (buttonsMapping[i][k] == '1') html += 'class="keyOne" ';
                else if (buttonsMapping[i][k] == '2') html += 'class="keyTwo" ';
                else if (buttonsMapping[i][k] == '3') html += 'class="keyThree" ';
                else if (buttonsMapping[i][k] == '4') html += 'class="keyFour" ';
                else if (buttonsMapping[i][k] == '5') html += 'class="keyFive" ';
                else if (buttonsMapping[i][k] == '6') html += 'class="keySix" ';
                else if (buttonsMapping[i][k] == '7') html += 'class="keySeven" ';
                else if (buttonsMapping[i][k] == '8') html += 'class="keyEight" ';
                else if (buttonsMapping[i][k] == '9') html += 'class="keyNine" ';
                if (buttonsMapping[i][k] == 'CE') html += 'type="submit" onclick="calculators[' + calculators.indexOf(this) + '].reset();">CE</button></td>';
                else if (buttonsMapping[i][k] == '=') html += 'class="answerButton" type="submit" onclick="calculators[' + calculators.indexOf(this) + '].answer();">=</button></td>';
                else html += 'type="submit" onclick="calculators[' + calculators.indexOf(this) + '].addSymbol(\'' + buttonsMapping[i][k] + '\');">' + buttonsMapping[i][k] + '</button></td>';
            }
        }
        html += '</div"></table>';
        calcDiv.innerHTML = html;
        this._screenFontSize = "auto";
        this._buttonFontSize = "auto";
        this._verbose = calcDiv.hasAttribute("verbose");
        this._screen = calcDiv.querySelector(".screen");
        this._calculatorTable = calcDiv.querySelector(".calculatorTable");
        this._answerButton = calcDiv.querySelector(".answerButton");
        this._closeParButton = calcDiv.querySelector(".closePar");
        this._openParButton = calcDiv.querySelector(".openPar");
        this._opPlusButton = calcDiv.querySelector(".opPlus");
        this._opMinusButton = calcDiv.querySelector(".opMinus");
        this._opMultButton = calcDiv.querySelector(".opMult");
        this._opDivButton = calcDiv.querySelector(".opDiv");
        this._opPowButton = calcDiv.querySelector(".opPow");
        this._opComaButton = calcDiv.querySelector(".opComa");
        this._keyZeroButton = calcDiv.querySelector(".keyZero");
        this._keyOneButton = calcDiv.querySelector(".keyOne");
        this._keyTwoButton = calcDiv.querySelector(".keyTwo");
        this._keyThreeButton = calcDiv.querySelector(".keyThree");
        this._keyFourButton = calcDiv.querySelector(".keyFour");
        this._keyFiveButton = calcDiv.querySelector(".keyFive");
        this._keySixButton = calcDiv.querySelector(".keySix");
        this._keySevenButton = calcDiv.querySelector(".keySeven");
        this._keyEightButton = calcDiv.querySelector(".keyEight");
        this._keyNineButton = calcDiv.querySelector(".keyNine");
        if(this._closeParButton)this._closeParButton.style.opacity = 0.5;
        this._lastTypeBtn = "";
        this._nbOpenin = 0;
        this._resize();
    }

    addSymbol(symbol) {
        let n = symbol;

        if (this._screen.innerHTML == "0" && (this._isNumericString(n) || n == "(" || n == "-")) this._screen.innerHTML = "";
        if (n == "." && this._isNumericString(this._lastTypeBtn) == false) this.addSymbol("0");
        if (n == "(" && this._isNumericString(this._screen.innerHTML[this._screen.innerHTML.length - 1])) n = "*(";
        if (this._screen.innerHTML[this._screen.innerHTML.length - 1] == ")" && (this._isNumericString(n) || n == "(" || n == ".")) n = "*" + n;

        this._screen.innerHTML += n;
        this._lastTypeBtn = symbol;
        if (symbol == "(") {
            this._nbOpenin++;
        } else if (symbol == ")") this._nbOpenin--;
        this._screen.scrollLeft = this._screen.scrollWidth;
        this._updateKeypad();
    }

    reset() {
        this._lastTypeBtn = "";
        this._nbOpenin = 0;
        this._updateKeypad();
        this._screen.innerHTML = "0";
    }

    answer() {
        this._nbOpenin = 0;
        this._updateKeypad();
        var infix = this._screen.innerHTML.replace(/x/g, "*");
        if (infix[infix.length - 1] == "+" || infix[infix.length - 1] == "-" || infix[infix.length - 1] == "*" || infix[infix.length - 1] == "/" || infix[infix.length - 1] == "^") infix = infix.substr(0, infix.length - 1);
        infix = this._replaceUnaryMinusByChar(infix);
        var postfix = this._infixToPostfix(infix);
        this._screen.innerHTML = this._solvePostFix(postfix);
        this._screen.scrollTop = this._screen.scrollHeight;
        if (this._verbose) {
            console.log("infix :", infix);
            console.log("postfix :", postfix);
            console.log("result :", this._screen.innerHTML);
        }
    }
    _resize() {
        var ratioBase=150/200;
        var sizeRatio=this._calcDiv.offsetWidth / this._calcDiv.offsetHeight;
        var ratio;
        if (sizeRatio <= ratioBase) 
            ratio = this._calcDiv.offsetWidth/150;
        
        else
            ratio = this._calcDiv.offsetHeight/200;
        console.log(this._calcDiv.offsetWidth , this._calcDiv.offsetHeight);

        if (this._buttonFontSize == "auto") 
            this._calcDiv.style.fontSize = ratio + "em";
         else 
            this._calcDiv.style.fontSize = this._screenFontSize;
        
    }
    _updateKeypad() {
        if (this._lastTypeBtn == "") {
            this._disableButton(this._closeParButton);
            this._enableButton(this._opComaButton);
            this._enableFiveCalculOps();
        } else if (this._isOneOfFiveCalculOps(this._lastTypeBtn)) {
            if ((this._lastTypeBtn == "+") || (this._lastTypeBtn == "-"))
                this._disableFiveCalculOps();
            else
                this._disableFiveCalculOps(true);
            this._disableButton(this._closeParButton);
            this._enableButton(this._opComaButton);
        } else if ((this._lastTypeBtn == "(")) {
            this._disableFiveCalculOps(true);
            this._disableButton(this._closeParButton);
            this._disableButton(this._answerButton);
            this._enableButton(this._opComaButton);
        } else if (this._lastTypeBtn == ")") {
            this._enableButton(this._opComaButton);
            if (this._isParenthesisOpen == false) {
                this._enableButton(this._answerButton);
                this._disableButton(this._closeParButton);
            }
        } else if (this._isNumericString(this._lastTypeBtn)) {
            this._enableFiveCalculOps();
            if (this._isParenthesisOpen)
                this._enableButton(this._closeParButton);
        } else if (this._lastTypeBtn == ".") {
            this._disableButton(this._opComaButton);
        }
    }
    get _isParenthesisOpen() {
        return (this._nbOpenin > 0);
    }
    _isOneOfFiveCalculOps(str) {
        return ((str == "+") || (str == "-") || (str == "*") || (str == "/") || (str == "^"));
    }
    _enableFiveCalculOps(excludeMinus = false) {
        this._enableButton(this._opPlusButton);
        if (!excludeMinus) this._enableButton(this._opMinusButton);
        this._enableButton(this._opMultButton);
        this._enableButton(this._opDivButton);
        this._enableButton(this._opPowButton);
    }
    _disableFiveCalculOps(excludeMinus = false) {
        this._disableButton(this._opPlusButton);
        if (!excludeMinus) this._disableButton(this._opMinusButton);
        this._disableButton(this._opMultButton);
        this._disableButton(this._opDivButton);
        this._disableButton(this._opPowButton);
    }
    _enableButton(button) {
        if(button==null)return;
        button.disabled = false;
        button.style.opacity = 1;
    }
    _disableButton(button) {
        if(button==null)return;
        button.disabled = true;
        button.style.opacity = 0.5;
    }
    _replaceUnaryMinusByChar(expressionString) {
        var str = expressionString;
        str = str.split("").reverse().join("");
        str = str.replace(/-(?=[\(\*\+\-\/\^])|-$/g, "_");
        str = str.split("").reverse().join("");
        return (str);
    }
    _isNumericString(str) {
        return (!isNaN(parseFloat(str)) && isFinite(str));
    }

    _cleanArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    solvePostFix(postfixString) {
        return (this._solvePostFix(postfixString));
    }
    solveInfix(infixString) {
        return (this.solvePostFix(this.infixToPostfix(infixString)));
    }
    infixToPostfix(infixString) {
        return (this._infixToPostfix(infixString));
    }
    _infixToPostfix(infixString) {


        if (infixString[0] == ".") infixString = "0" + infixString;
        let outputQueue = "";
        let operatorStack = [];
        let operators = {
            "_": {
                precedence: 5,
                associativity: "Right"
            },
            "^": {
                precedence: 4,
                associativity: "Right"
            },
            "/": {
                precedence: 3,
                associativity: "Left"
            },
            "*": {
                precedence: 3,
                associativity: "Left"
            },
            "+": {
                precedence: 2,
                associativity: "Left"
            },
            "-": {
                precedence: 2,
                associativity: "Left"
            }
        }
        infixString = infixString.replace(/\s+/g, "");
        infixString = this._cleanArray(infixString.split(/([\+\-\*\/\^\_\(\)])/));
        for (let i = 0; i < infixString.length; i++) {
            let token = infixString[i];
            if (this._isNumericString(token)) {
                outputQueue += token + " ";
            } else if ("_^*/+-".indexOf(token) !== -1) {
                let o1 = token;
                let o2 = operatorStack[operatorStack.length - 1];
                while ("_^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                    outputQueue += operatorStack.pop() + " ";
                    o2 = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(o1);
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue += operatorStack.pop() + " ";
                }
                operatorStack.pop();
            }
        }
        while (operatorStack.length > 0) {
            outputQueue += operatorStack.pop() + " ";
        }
        return outputQueue;
    }
    _solvePostFix(postfixString) {
        postfixString = postfixString.split(" ");
        let resultArr = [];
        let max = postfixString.length;
        for (let i = 0; i < max; i++) {
            if (this._isNumericString(postfixString[i])) resultArr.push(parseFloat(postfixString[i]));
            else {
                if (postfixString[i] == "_") {
                    let a = resultArr.pop();
                    resultArr.push(a * (-1));
                } else if (postfixString[i] == "+") {
                    let b = resultArr.pop(),
                        a = resultArr.pop();
                    resultArr.push(a + b);
                } else if (postfixString[i] == "-") {
                    let b = resultArr.pop(),
                        a = resultArr.pop();
                    resultArr.push(a - b);
                } else if (postfixString[i] == "*") {
                    let b = resultArr.pop(),
                        a = resultArr.pop();
                    resultArr.push(a * b);
                } else if (postfixString[i] == "/") {
                    let b = resultArr.pop(),
                        a = resultArr.pop();
                    resultArr.push(a / b);
                } else if (postfixString[i] == "^") {
                    let b = resultArr.pop(),
                        a = resultArr.pop();
                    resultArr.push(Math.pow(a, b));
                }
            }
        }
        return resultArr[0];
    }
}
