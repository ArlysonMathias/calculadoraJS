// pegando todos os elementos pelo id
const display = document.getElementById("display");
const displayText = document.getElementById("display").textContent;
const equal = document.getElementById("equal");
const deleteText = document.getElementById("delete");
const moreOrLess = document.getElementById("more-less");
const clearCalc = document.getElementById("clear");
const clearAll = document.getElementById("clear-all");
const porcent = document.getElementById("porcent");
const virg = document.getElementById("virg");
const divforOne = document.getElementById("div-for-one");
const poten = document.getElementById("poten");
const square = document.getElementById("square");

const nums = document.querySelectorAll("[id*=num]");
const operators = document.querySelectorAll("[id*=sign]");

let first = true;
let operator;
let previewNumber;
let currentNumber;
let deleteEqual;

const ajustVirg = () =>
  (display.textContent = display.textContent.replace(".", ","));

//inserindo numeros no display
const insertDisplay = (text) => {
  if (first) {
    display.textContent = text;
    first = false;
  } else {
    display.textContent += text;
  }

  display.textContent = display.textContent.substring(0, 17);
  currentNumber = display.textContent;
  deleteEqual = true;
};
const insert = (e) => insertDisplay(e.target.textContent);

nums.forEach((e) => e.addEventListener("click", insert));

//pegando o valor do operador

const insertOperator = (e) => {
  first = true;
  operator = e.target.textContent;

  if (operator == "x") {
    operator = "*";
  } else if (operator == "÷") {
    operator = "/";
  }

  previewNumber = display.textContent;
};

operators.forEach((e) => e.addEventListener("click", insertOperator));

// calculando os resultados

const calc = () => {
  if (previewNumber && operator) {
    let result = previewNumber + operator;

    if (currentNumber) {
      result += currentNumber;
    } else {
      result += previewNumber;
    }

    display.textContent = eval(result.replace(",", "."));

    ajustVirg();

    if (display.textContent == "NaN") {
      display.textContent = "0";
    }

    previewNumber = display.textContent;
    first = true;
    deleteEqual = false;
  }
};

equal.addEventListener("click", calc);

//apagar

const deleteLast = () => {
  if (deleteEqual) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1);
    } else {
      display.textContent = "0";
    }
    first = true;
  }
};

deleteText.addEventListener("click", deleteLast);

//inverter sinal

const invertSign = () => {
  display.textContent = parseFloat(display.textContent.replace(",", ".")) * -1;
  ajustVirg();
};

moreOrLess.addEventListener("click", invertSign);

//limpar a tela
const clearDisplay = () => {
  display.textContent = "0";
  first = true;
};

clearCalc.addEventListener("click", clearDisplay);

//limpar tudo
const clearAllDisplay = () => {
  display.textContent = "0";
  previewNumber = "0";
  currentNumber = "0";
  first = true;
};

clearAll.addEventListener("click", clearAllDisplay);

//calcular porcentagem
const calcPercentage = () => {
  display.textContent = parseFloat(display.textContent.replace(",", ".")) / 100;
  ajustVirg();
  currentNumber = display.textContent;
  first = true;
};

porcent.addEventListener("click", calcPercentage);

//calcular divisão por 1

const calcDivForOne = () => {
  display.textContent = 1 / parseFloat(display.textContent.replace(",", "."));
  ajustVirg();
  currentNumber = display.textContent;
  previewNumber = "0";
  first = true;
};

divforOne.addEventListener("click", calcDivForOne);

//calcular potência

const calcPoten = () => {
  display.textContent = Math.pow(
    parseFloat(display.textContent.replace(",", ".")),
    2
  );
  ajustVirg();
  currentNumber = display.textContent;
  previewNumber = "0";
  first = true;
};
poten.addEventListener("click", calcPoten);

//calcular Raiz

const calcSquare = () => {
  display.textContent = Math.sqrt(
    parseFloat(display.textContent.replace(",", "."))
  );
  ajustVirg();
  currentNumber = display.textContent;
  previewNumber = "0";
  first = true;
};

square.addEventListener("click", calcSquare);
