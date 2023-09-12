const transactionEl = document.querySelector(".transactions");
const balanceNumberEl = document.querySelector(".balance-number");
const numberIncomeEl = document.querySelector(".number--income");
const numberExpenesEl = document.querySelector(".number--expenses");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");

const submitHandler = (event) => {
  event.preventDefault();
  const description = inputDescriptionEl.value;
  const amount = +inputAmountEl.value;
  const transactionItemHTML = `
   <li class="transaction transaction--${amount > 0 ? "income" : "expense"}">
      <span class="transaction__text">${description}</span>
      <span class="transaction__amount">${amount > 0 ? "+" : ""}${amount}</span>
      <button class="transaction__btn">X</button>
   </li>
  `;
  transactionEl.insertAdjacentHTML("beforeend", transactionItemHTML);
  inputDescriptionEl.value = "";
  inputAmountEl.value = "";
  inputDescriptionEl.blur();
  inputAmountEl.blur();

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome + amount;
    numberIncomeEl.textContent = +updatedIncome;
  } else {
    const currentExpenes = +numberExpenesEl.textContent;
    const updatedExpenes = currentExpenes + amount * -1;
    numberExpenesEl.textContent = updatedExpenes;
  }
  const income = +numberIncomeEl.textContent;
  const expenes = +numberExpenesEl.textContent;
  const updatedBalance = income - expenes;
  balanceNumberEl.textContent = updatedBalance;
  income - expenes < 0 && (balanceNumberEl.style.color = "red");
};

formEl.addEventListener("submit", submitHandler);

const clickHandler = (event) => {
  const clickEl = event.target.parentNode;
  clickEl.remove();

  const amountEl = clickEl.querySelector(".transaction__amount");
  const amount = +amountEl.textContent;

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome - amount;
    numberIncomeEl.textContent = updatedIncome;
  } else {
    const currentExpenes = +numberExpenesEl.textContent;
    const updatedExpenes = currentExpenes - amount * -1;
    numberExpenesEl.textContent = updatedExpenes;
  }

  const income = numberIncomeEl.textContent;
  const expenes = numberExpenesEl.textContent;
  balanceNumberEl.textContent = income - expenes;

  income - expenes < 0 && (balanceNumberEl.style.color = "red");
};

transactionEl.addEventListener("click", clickHandler);
