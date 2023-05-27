const form = document.querySelector('form');
const amountInput = document.querySelector('#amount');
const interestInput = document.querySelector('#interest');
const yearsInput = document.querySelector('#years');
const resultsDiv = document.querySelector('#results');
const monthlyPaymentSpan = document.querySelector('#monthly-payment');
const totalPaymentSpan = document.querySelector('#total-payment');
const totalInterestSpan = document.querySelector('#total-interest');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const amount = parseFloat(amountInput.value);
  const interest = parseFloat(interestInput.value) / 100 / 12;
  const years = parseInt(yearsInput.value) * 12;
  
  const monthlyPayment = (amount * interest * Math.pow(1 + interest, years)) / (Math.pow(1 + interest, years) - 1);
  const totalPayment = monthlyPayment * years;
  const totalInterest = totalPayment - amount;
  
  monthlyPaymentSpan.textContent = monthlyPayment.toFixed(2);
  totalPaymentSpan.textContent = totalPayment.toFixed(2);
  totalInterestSpan.textContent = totalInterest.toFixed(2);
  
  resultsDiv.style.display = 'block';
});
