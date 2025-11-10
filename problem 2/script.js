const fromTokenSelect = document.getElementById('from-token');
const toTokenSelect = document.getElementById('to-token');
const inputAmount = document.getElementById('input-amount');
const outputAmount = document.getElementById('output-amount');
const errorMsg = document.getElementById('error-msg');
const swapBtn = document.getElementById('swap-btn');

// Your JSON data
const priceData = [
  {"currency":"BLUR","price":0.20811525423728813},
  {"currency":"bNEO","price":7.1282679},
  {"currency":"BUSD","price":0.9998782611186441},
  {"currency":"USD","price":1},
  {"currency":"ETH","price":1645.9337373737374},
  {"currency":"GMX","price":36.345114372881355},
  {"currency":"STEVMOS","price":0.07276706779661017},
  {"currency":"LUNA","price":0.40955638983050846},
  {"currency":"RATOM","price":10.250918915254237},
  {"currency":"STRD","price":0.7386553389830508},
  {"currency":"EVMOS","price":0.06246181355932203},
  {"currency":"IBCX","price":41.26811355932203},
  {"currency":"IRIS","price":0.0177095593220339},
  {"currency":"ampLUNA","price":0.49548589830508477},
  {"currency":"KUJI","price":0.675},
  {"currency":"STOSMO","price":0.431318},
  {"currency":"USDC","price":0.9998782611186441},
  {"currency":"axlUSDC","price":0.989832},
  {"currency":"ATOM","price":7.186657333333334},
  {"currency":"STATOM","price":8.512162050847458},
  {"currency":"OSMO","price":0.3772974333333333},
  {"currency":"rSWTH","price":0.00408771},
  {"currency":"STLUNA","price":0.44232210169491526},
  {"currency":"LSI","price":67.69661525423729},
  {"currency":"OKB","price":42.97562059322034},
  {"currency":"OKT","price":13.561577966101694},
  {"currency":"SWTH","price":0.004039850455012084},
  {"currency":"USC","price":0.994},
  {"currency":"WBTC","price":26002.82202020202},
  {"currency":"wstETH","price":1872.2579742372882},
  {"currency":"YieldUSD","price":1.0290847966101695},
  {"currency":"ZIL","price":0.01651813559322034}
];

// Convert JSON to a price map
const prices = {};
priceData.forEach(item => {
  prices[item.currency] = item.price;
});

// Populate dropdowns
const tokens = Object.keys(prices);

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

// Default selection
fromTokenSelect.value = tokens[0];
toTokenSelect.value = tokens[1] || tokens[0];

// Calculate output
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

// Initial calculation
calculateOutput();
