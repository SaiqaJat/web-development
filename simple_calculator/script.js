

const num1El = document.getElementById('numb1');

const opEl   = document.getElementById('operator');

const num2El = document.getElementById('numb2');

const resEl  = document.getElementById('result');



let first = '';   // string for first number

let second = '';  // string for second number

let operator = ''; // '+','-','*','/','%'



function refreshUI(){

  num1El.value = first;
  opEl.value = operator;
  num2El.value = second;


  if (first === '' && second === '' && operator === '') {
    resEl.value = '0';
  } 
  else if (second === '') {
    resEl.value = first === '' ? '0' : first;
  }
   else {
    resEl.value = `${first} ${operator} ${second}`;
  }
}

function toFloat(str){
  if (str === '' || str === null) return 0;
  return parseFloat(str);
}

// perform calculation (no eval)
function compute(aStr, bStr, op) {

  const a = toFloat(aStr);
  const b = toFloat(bStr);

  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') {
    if (b === 0) return 'Error';
    return a / b;
  }
  if (op === '%') {


    return a * (b / 100);
  }
  return b; 
}


function onNumberInput(ch) {


  if (ch === '.') {

    if (operator === '') {

      if (first.includes('.')) return;

      if (first === '') first = '0'; // start with 0.

    } 
    else {
      if (second.includes('.')) return;

      if (second === '') second = '0';
    }
  }
  if (operator === '') {
    first += ch;
  } 
  else {
    second += ch;
  }
  refreshUI();
}


function onOperatorInput(opChar) {


  if (first === '') first = '0';


  if (operator !== '' && second !== '') {

    const ans = compute(first, second, operator);

    if (ans === 'Error') {
      resEl.value = 'Error (division by zero)';


      first = '';
      second = '';
      operator = '';
      return;
    }


    first = String(roundIfNeeded(ans));
    second = '';
    operator = opChar;
    refreshUI();
    return;
  }


  operator = opChar;
  refreshUI();
}


function onEquals() {
  if (operator === '') {


    resEl.value = first === '' ? '0' : first;
    return;
  }


  if (second === '') {
    second = first;
  }

  const ans = compute(first, second, operator);

  if (ans === 'Error') {

    resEl.value = 'Error (division by zero)';

    first = '';
    second = '';
    operator = '';
    return;

  }

  const final = String(roundIfNeeded(ans));
  resEl.value = final;
  first = final;
  second = '';
  operator = '';
  refreshUI();
}


function roundIfNeeded(n) {

  if (typeof n !== 'number') return n;

  return Math.abs(n - Math.round(n)) < 1e-12 ? Math.round(n) : parseFloat(n.toFixed(10));

}

function onClear() {

  first = '';
  second = '';
  operator = '';
  resEl.value = '0';

  refreshUI();
}


function onBackspace() {

  if (second !== '') {
    second = second.slice(0, -1);

  }
   else if (operator !== '') {
    operator = '';
  } 
  else {
    first = first.slice(0, -1);
  }
  refreshUI();
}


function onNegate() {

  if (operator === '') {
    if (first.startsWith('-')) first = first.slice(1);
    else first = (first === '' ? '-0' : '-' + first);
  } 
  else {
    if (second.startsWith('-')) second = second.slice(1);
    else second = (second === '' ? '-0' : '-' + second);
  }
  refreshUI();
}


document.querySelectorAll('.num').forEach(function(btn) {
  btn.addEventListener('click', function() {
    onNumberInput(btn.innerText);
  });
});


document.querySelectorAll('.op').forEach(function(btn) {
  btn.addEventListener('click', function() {
    onOperatorInput(btn.innerText);
  });
});

document.getElementById('equals').addEventListener('click', onEquals);






refreshUI();
    
