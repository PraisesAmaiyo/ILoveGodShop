// function to format amounts with commas
function formatAmountWithCommas(amount) {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// JS to Render saved POS form data
const storedPosData = JSON.parse(localStorage.getItem('posFormData')) || [];

function renderPosTable() {
  const posTableBody = document.querySelector('.posTableDisplay tbody');

  posTableBody.innerHTML = '';

  storedPosData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 posTransTypeReport">${data.selectedTransactionType}</td>
    <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
      data.posTransactionAmount
    )}</td>
    <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
      data.posTransactionFee
    )}</td>
    <td class="py-1 posPaymentMethodReport">${data.selectedWithdrawalType}</td>
    <td class="py-1 posPaymentMethodRemark">${
      data.posTransactionRemarkInput
    }</td>
      `;

    posTableBody.appendChild(row);
  });
  updateTotalPosAmounts(storedPosData);
}

// JS to give total POS Amount and Fees
function updateTotalPosAmounts(data) {
  const totalPosAmount = document.getElementById('totalPosAmount');
  const totalPosFee = document.getElementById('totalPosFee');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.posTransactionAmount,
    0
  );
  const totalFee = data.reduce((sum, item) => sum + item.posTransactionFee, 0);

  totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
  totalPosFee.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalFee
  )}</strong>`;
}

renderPosTable();

// JS to Render Sold goods from LocalStorage
const storedSoldGoods =
  JSON.parse(localStorage.getItem('soldProductFormData')) || [];

function renderGoodsTable() {
  const goodsTableBody = document.querySelector('.soldTableDisplay tbody');

  goodsTableBody.innerHTML = '';

  storedSoldGoods.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 soldItemNameReport">${data.soldProductNameInput}</td>
    <td class="py-1 soldItemPriceReport">${`&#x20A6; ${formatAmountWithCommas(
      data.soldProductPriceInput
    )}`}</td>
    <td class="py-1 soldItemStatusReport">${data.checkboxStatus}</td>
    <td class="py-1 soldItemBalanceReport">${
      data.productBalancePriceInput === '-'
        ? '-'
        : `&#x20A6; ${formatAmountWithCommas(data.productBalancePriceInput)}`
    }</td>
    <td class="py-1 soldItemRemarkReport ">${data.soldProductRemarkInput}</td>
      `;
    goodsTableBody.appendChild(row);
  });
  updateTotalSoldAmounts(storedSoldGoods);
}

// JS to give total Sold Amount
function updateTotalSoldAmounts(data) {
  const totalSoldAmount = document.getElementById('totalSoldAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.soldProductPriceInput,
    0
  );

  totalSoldAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
}

renderGoodsTable();

// JS to Render saved Charged form data
const storedChargedData =
  JSON.parse(localStorage.getItem('chargeFormData')) || [];

function renderChargingTable() {
  const chargingTableBody = document.querySelector(
    '.chargingTableDisplay tbody'
  );

  chargingTableBody.innerHTML = '';

  storedChargedData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 chargedItemNameReport">${data.selectedDeviceType}</td>
    <td class="py-1 chargedItemPriceReport">&#x20A6; ${
      data.deviceChargeFeeInput
    }</td>
    <td class="py-1 chargedItemOwnerReport ">${data.deviceOwnerNameInput}</td>
    <td class="py-1 chargedItemIdReport ">${data.deviceIdInput}</td>
    <td class="py-1 chargedItemAltNumberReport ">${
      data.alternativeNumberInput
    }</td>
    <td class="py-1 chargedItemStatusReport ">${data.selectedDeviceStatus}</td>
      `;

    chargingTableBody.appendChild(row);
  });
  updateTotalChargedAmounts(storedChargedData);
}

// JS to give total Charged Amount
function updateTotalChargedAmounts(data) {
  const totalChargedAmount = document.getElementById('totalChargedAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.deviceChargeFeeInput,
    0
  );

  totalChargedAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
}
renderChargingTable();

// JS to Render saved Sim Registration form data
const storedSimRegData =
  JSON.parse(localStorage.getItem('simRegFormData')) || [];

function renderSimRegTable() {
  const SimRegTableBody = document.querySelector('.simRegTableDisplay tbody');

  SimRegTableBody.innerHTML = '';

  storedSimRegData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 simNameReport">${data.selectedSimName}</td>
    <td class="py-1 simPriceReport">&#x20A6; ${data.simRegAmountInput}</td>
    <td class="py-1 PhoneNumberReport">${data.phoneNumberInput}</td>
    <td class="py-1 simStatusReport ">${data.checkboxStatus}</td>
      `;

    SimRegTableBody.appendChild(row);
  });
  updateTotalSimRegAmounts(storedSimRegData);
}

// JS to give total SIM Reg Amount
function updateTotalSimRegAmounts(data) {
  const totalSimRegAmount = document.getElementById('totalSimRegAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.simRegAmountInput,
    0
  );

  console.log(totalAmount);

  totalSimRegAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
}

renderSimRegTable();
