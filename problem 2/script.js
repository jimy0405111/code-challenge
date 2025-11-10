const fromTokenSelect = document.getElementById('from-token');
const toTokenSelect = document.getElementById('to-token');
const inputAmount = document.getElementById('input-amount');
const outputAmount = document.getElementById('output-amount');
const errorMsg = document.getElementById('error-msg');
const swapBtn = document.getElementById('swap-btn');

let prices = {};
let tokens = [];

// Fetch token prices
async function fetchPrices() {
  try {
    const res = await fetch('https://interview.switcheo.com/prices.json');
    prices = await res.json();
    populateTokenSelect();
  } catch (err) {
    console.error('Error fetching prices', err);
  }
}

// Populate token dropdowns
function populateTokenSelect() {
  tokens = Object.keys(prices);
  tokens.forEach(token => {
    const optionFrom = document.createElement('option');
    optionFrom.value = token;
    optionFrom.innerText = token;
    fromTokenSelect.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = token;
    optionTo.innerText = token;
    toTokenSelect.appendChild(optionTo);
  });

  // Default selections
  fromTokenSelect.value = tokens[0];
  toTokenSelect.value = tokens[1] || tokens[0];
}

// Calculate output amount
function calculateOutput() {
  const fromToken = fromTokenSelect.value;
  const toToken = toTokenSelect.value;
  const amount = parseFloat(inputAmount.value);

  if (isNaN(amount) || amount <= 0) {
    outputAmount.value = '';
    errorMsg.innerText = 'Enter a valid amount.';
    return;
  }

  if (fromToken === toToken) {
    outputAmount.value = amount.toFixed(4);
    errorMsg.innerText = '';
    return;
  }

  if (!prices[fromToken] || !prices[toToken]) {
    outputAmount.value = '';
    errorMsg.innerText = 'Price data not available for selected tokens.';
    return;
  }

  const rate = prices[fromToken] / prices[toToken];
  outputAmount.value = (amount * rate).toFixed(4);
  errorMsg.innerText = '';
}

// Event listeners
inputAmount.addEventListener('input', calculateOutput);
fromTokenSelect.addEventListener('change', calculateOutput);
toTokenSelect.addEventListener('change', calculateOutput);

swapBtn.addEventListener('click', () => {
  if (!inputAmount.value || parseFloat(inputAmount.value) <= 0) {
    errorMsg.innerText = 'Enter a valid amount.';
    return;
  }
  alert(`Swapped ${inputAmount.value} ${fromTokenSelect.value} to ${outputAmount.value} ${toTokenSelect.value}!`);
});

fetchPrices();
