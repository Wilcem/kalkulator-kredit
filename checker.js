var globalPrevYear = 0;

function getCurrencyFormatted(A) {
  return accounting.formatMoney(A, "", 2, ".", ",");
}

//show currency
function showCurrency(idInput, idDiv) {
  var amount = document.getElementById(idInput).value;
  var amountFormatted = getCurrencyFormatted(amount);
  document.getElementById(idDiv).innerHTML = amountFormatted;
}

//show division
function showDivision(idInput, idDiv, rule) {
  var amount = document.getElementById(idInput).value;
  var amountFormatted = "";
  if (rule == "year_to_month") {
    amountFormatted = parseFloat(amount) / 12;
    amountFormatted = amountFormatted.toFixed(2);
  }

  if (rule == "month_to_year") {
    amountFormatted = parseFloat(amount) * 12;
    amountFormatted = amountFormatted.toFixed(0);
  }

  if (rule == "month_to_year_float") {
    amountFormatted = parseFloat(amount) * 12;
    amountFormatted = amountFormatted.toFixed(2);
  }

  document.getElementById(idDiv).innerHTML = amountFormatted;
}

//plus minus
function plusMinus(type, divName, formName, arrInterest) {
  idInput = "input_" + formName;
  var year = parseInt(document.getElementById(idInput).value);

  if (type == "minus") {
    if (year > 1) year = year - 1;
  } else year++;

  document.getElementById(idInput).value = year;
  document.getElementById(idInput).focus();

  addInterestFloating(divName, formName, arrInterest);
}

//add interest floating
function addInterestFloating(divName, formName, arrInterest) {
  idInput = "input_" + formName;
  var year = parseInt(document.getElementById(idInput).value);

  if (!is_int(year)) return false;

  for (i = 1; i <= year; i++) {
    if (!document.getElementById("divName" + i)) {
      var div = document.createElement("div");
      div.id = "divName" + i;

      var input = document.createElement("input");
      input.name = "interest_year[]";
      input.className = "input_short";

      if (
        typeof arrInterest[i - 1] !== "undefined" &&
        arrInterest[i - 1] !== null
      )
        input.value = arrInterest[i - 1];
      else input.value = 0;

      div.appendChild(document.createTextNode("Bunga tahun ke-" + i + ": "));
      div.appendChild(input);
      div.appendChild(document.createTextNode("%"));

      document.getElementById(divName).appendChild(div);
    }
  }

  //remove old child
  if (globalPrevYear > year) {
    for (i = year + 1; i <= globalPrevYear; i++) {
      if (document.getElementById("divName" + i)) {
        document
          .getElementById(divName)
          .removeChild(document.getElementById("divName" + i));
      }
    }
  }

  //prev year
  if (is_int(year)) globalPrevYear = year;

  return false;
}

//is int
function is_int(value) {
  if (parseFloat(value) == parseInt(value) && !isNaN(value)) {
    return true;
  } else {
    return false;
  }
}
