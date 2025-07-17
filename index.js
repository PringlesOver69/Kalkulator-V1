// Henter h1 elemtentet med id "display_port" og lagrer det i en variabel slik at det kan redigeres
const display = document.querySelector('#display_port');
// Henter alle elementer med class="kalk_knapp"
const kalkKnapp = document.querySelectorAll('.kalk_knapp');
// Henter logg 'div'en som loggen skal legges i
const logg = document.querySelector('#logg');


kalkKnapp.forEach(knapp => {
    knapp.addEventListener('click', function () {
        const value = knapp.dataset.value;

        if (value === '=') {
          addAnswerToLogg(display.textContent);
          if (display.textContent.includes('%') && !(display.textContent.includes('+') || display.textContent.includes('-'))) {
            const conversion = convertPercent(display.textContent);
            display.textContent = eval(conversion);
          } else if (display.textContent.includes('%') && (display.textContent.includes('+') || display.textContent.includes('-'))) {
            let conversion = convertPercent(display.textContent);
            console.log(conversion);
            const conversion2 = conversion.replace(/[\+\-]/g, '*');
            console.log(conversion2);
            let answer = eval(conversion2);
            console.log(answer);
            let conversion3 = conversion.replace(/\d+\.\d+/g, '')
            console.log(conversion3);
            const finalAnswer = conversion3 + answer;
            console.log(finalAnswer);
            calculate(finalAnswer);
          } else {
            calculate(display.textContent);
          }
        } else if (value === 'clear') {
          display.textContent = '';
          logg.textContent = '';
        } else if (value === '|') {
          display.textContent = display.textContent.slice(0, -1);
        } else if (value === 'square') {
          addAnswerToLogg('sqrt(' + display.textContent + ')');
          squareRoot();
        } else if (value === '!') {
          factorial(display.textContent);
        } else if (value === '()') {
          paranthese(display.textContent);
        } else if (value === 'dropdown') {
          return;
        } else {
          display.textContent += value;
        }
    });
});

function calculate(content) {
    const result = eval(content);

    const maxLength = 10;
    let resultStr = result.toString();

    if (resultStr.length > maxLength) {
      if (resultStr.includes('.')) {
        const integerPartLength = resultStr.split('.')[0].length;
        const decimalsAllowed = maxLength - integerPartLength;
        resultStr = result.toFixed(decimalsAllowed > 0 ? decimalsAllowed : 0);
      } else {
        resultStr = result.toExponential(maxLength - 1);
      }
    }
    display.textContent = resultStr;
}

function squareRoot() {
  const currentValue = parseFloat(display.textContent);
  if (!isNaN(currentValue)) {
    const result = Math.sqrt(currentValue);

    const maxLength = 10;
    let resultStr = result.toString();

    if (resultStr.length > maxLength) {
      if (resultStr.includes('.')) {
        const integerPartLength = resultStr.split('.')[0].length;
        const decimalsAllowed = maxLength - integerPartLength;
        resultStr = result.toFixed(decimalsAllowed > 0 ? decimalsAllowed : 0);
      } else {
        resultStr = result.toExponential(maxLength - 1);
      }
    }

    display.textContent = resultStr;
  } else {
    display.textContent = 'Error';
  }
}

function factorial(n) {
    if (n.includes('.')) {
      display.textContent = 'Error!';
      return;
    } 
    let y = eval(n);
    if (y < 0) return display.textContent = 'Error';
    if (y === 0 || y === 1) return display.textContent = '1';

    let result = 1;
    for (let i = 2; i <= y; i++) {
        result *= i;
    }

    display.textContent = result;
}

function paranthese(contents) {
    const { amountOpen, amountClosed } = checkParanthese(contents)

    // Sjekker om det er flere '(' enn ')'. Hvis det er det så legger den til en ')'
    if (amountOpen > amountClosed) {
        display.textContent += ')';

    } else {
        display.textContent += '(';
    }
}

function checkParanthese(contents) {
    let amountClosed = 0;
    let amountOpen = 0;

    for (let tegn of contents) {
        if (tegn === '(') amountOpen++;
        if (tegn === ')') amountClosed++;
    }

    return { amountOpen, amountClosed };
}

function addAnswerToLogg(evaluation) {
  logg.textContent = evaluation;
}

function convertPercent(string) {
  let cleansedPart = string.replace(/(\d+(\.\d+)?)%/g, (match, tall) => {
    return parseFloat(tall) / 100;
  })

  return cleansedPart;
 }
