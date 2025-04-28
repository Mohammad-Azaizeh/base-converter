
 
let fromBase = 10; //default is decimal
let toBase = 2;    //default is binary

const fromButtons = document.querySelectorAll('#from-base button');
const toButtons = document.querySelectorAll('#to-base button');
const numberInput = document.getElementById('number');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');


function selectBase(buttons, isFrom) {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));  // remove selected class from all buttons
      button.classList.add('selected');

      // update the base variable
      if (isFrom) {
        fromBase = parseInt(button.getAttribute('data'));
      } else {
        toBase = parseInt(button.getAttribute('data'));
      }
    });
  });
}

selectBase(fromButtons, true);
selectBase(toButtons, false);

// check if the input is correct according to the selected base(2,8,10,16)
function isValidInput(input, base) {
  const regexes = {
    2: /^[01]+$/, // binary: digits 0-1
    8: /^[0-7]+$/,  // octal: digits 0-7
    10: /^[0-9]+$/,   // decimal: digits 0-9
    16: /^[0-9a-fA-F]+$/  // hexadecimal: 0-9 and A-F
  };
  return regexes[base].test(input);
}

convertButton.addEventListener('click', () => {
  const inputVal = numberInput.value.trim();

  if (!isValidInput(inputVal, fromBase)) {
    alert(`Invalid number for base ${fromBase}`); // return error massage if the digit in the base is incorrect
    return;
  }

   
  const decimal = parseInt(inputVal, fromBase); // convert the input from it's base to decimal
  let converted = decimal.toString(toBase).toUpperCase(); // convert decimal to the targeted base and capitalize the letters

//symbols for each base
  const baseSymbols = { 2: '₂', 8: '₈', 10: '₁₀', 16: '₁₆' };

  // display the result
  resultDiv.textContent = `Result: ${inputVal}${baseSymbols[fromBase]} = ${converted}${baseSymbols[toBase]}`;
  
  // clear the input after conversion
  numberInput.value = '';
});
