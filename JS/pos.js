// JavaScript to toggle withdrawal methods

document.addEventListener('DOMContentLoaded', function () {
  const withdrawalTypeDiv = document.querySelector(
    '.withdrawalTransactionType'
  );
  const transactionType = document.getElementById('transactionType');
  const withdrawalType = document.getElementById('withdrawalType');
  const posFeePaymentType = document.getElementById('posFeePaymentType');

  if (transactionType) {
    transactionType.addEventListener('change', function (e) {
      const selectedType = e.target.value;

      if (
        selectedType === 'Withdraw' ||
        selectedType === 'WithdrawAndTransfer' ||
        selectedType === 'BillPayment'
      ) {
        withdrawalTypeDiv.style.display = 'block';
      } else if (selectedType === 'Deposit') {
        withdrawalType.value = 'Cash';
        posFeePaymentType.value = 'Cash';
        withdrawalTypeDiv.style.display = 'none';
        posFeePaymentType.style.display = 'block';
      }

      //  if (selectedType === 'Deposit') {
      //   withdrawalType.value = 'Cash';

      //   const selectedOption =
      //     withdrawalType.querySelector(`option[value='Cash']`);
      //   if (selectedOption) {
      //     selectedOption.selected = true;
      //   }

      //   console.log('Withdrawal Type set to Cash');
      // }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const posSuccessfulCheckbox = document.getElementById(
    'posSuccessfulCheckbox'
  );
  const posPendingCheckbox = document.getElementById('posPendingCheckbox');
  const posRemarksDiv = document.querySelector('.posRemarksDiv');
  const posTransactionRemark = document.getElementById('posTransactionRemark');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  function updateStatus() {
    if (posSuccessfulCheckbox.checked) {
      posRemarksDiv.style.display = 'none';
      posTransactionRemark.value = 'Successful';
      posTransactionRemark.disabled = true;
    } else {
      posRemarksDiv.style.display = 'block';
      posTransactionRemark.disabled = false;
    }
  }

  updateStatus();

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
          otherCheckbox.removeAttribute('required');
        }
      });

      if (checkbox === posSuccessfulCheckbox) {
        posPendingCheckbox.checked = !checkbox.checked;
      } else {
        posSuccessfulCheckbox.checked = !checkbox.checked;
        posTransactionRemark.value = '';
      }

      //Backup
      // if (checkbox === posSuccessfulCheckbox) {
      //   posSuccessfulCheckbox.checked = true;
      //   posRemarksDiv.style.display = 'none';
      //   posTransactionRemark.disabled = true;
      //   posTransactionRemark.value = 'Successful';
      // } else {
      //   posPendingCheckbox.checked = true;
      //   posRemarksDiv.style.display = 'flex';
      //   posTransactionRemark.disabled = false;
      //   posTransactionRemark.value = '';
      // }
      updateStatus();
    });
  });

  posTransactionRemark.addEventListener('input', function () {
    const inputValue = posTransactionRemark.value.trim();

    posPendingCheckbox.checked = inputValue !== '';
    posSuccessfulCheckbox.checked = !posPendingCheckbox.checked;
    posSuccessfulCheckbox.removeAttribute('required');

    //Backup
    //  if (inputValue !== '') {
    //    posPendingCheckbox.checked = true;
    //    posSuccessfulCheckbox.checked = false;
    //    posSuccessfulCheckbox.removeAttribute('required');
    //  } else {
    //    posPendingCheckbox.checked = false;
    //    return;
    //  }

    updateStatus();
  });
});

// JavaScript for POS Form
const amount = document.getElementById('posTransactionAmount');
const fee = document.getElementById('posTransactionFee');
const posFeePaymentType = document.getElementById('posFeePaymentType');
const posForm = document.querySelector('.pos-method-form');

if (posForm) {
  posForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const transactionType = document.getElementById('transactionType');
    const withdrawalType = document.getElementById('withdrawalType');
    const posSuccessfulCheckbox = document.getElementById(
      'posSuccessfulCheckbox'
    );
    const posPendingCheckbox = document.getElementById('posPendingCheckbox');
    const posRemarksDiv = document.querySelector('.posRemarksDiv');
    const withdrawalTypeDiv = document.querySelector(
      '.withdrawalTransactionType'
    );
    const posTransactionRemark = document.getElementById(
      'posTransactionRemark'
    );

    handlePosFormSubmit(
      transactionType,
      withdrawalType,
      amount,
      fee,
      posFeePaymentType,
      posTransactionRemark
    );

    transactionType.value = 'Withdraw';
    withdrawalType.value = 'Card';
    posFeePaymentType.value = 'Card';
    amount.value = '';
    fee.value = '';
    posTransactionRemark.value = '';
    posSuccessfulCheckbox.checked = false;
    posPendingCheckbox.checked = false;
    withdrawalTypeDiv.style.display = 'block';
    posRemarksDiv.style.display = 'block';
  });
}

function handlePosFormSubmit(
  transactionType,
  withdrawalType,
  amount,
  fee,
  posFeePaymentType,
  posTransactionRemark
) {
  let selectedTransactionType = transactionType.value;
  let selectedWithdrawalType = withdrawalType.value;
  let posTransactionAmount = Number(amount.value);
  let posTransactionFee = Number(fee.value);
  let selectedPosFeePaymentType = posFeePaymentType.value;
  let posTransactionRemarkInput = posTransactionRemark.value;
  let id = Math.random();

  if (selectedTransactionType === 'Deposit') {
    selectedWithdrawalType = 'Cash';
  }

  const posFormData = {
    selectedTransactionType,
    selectedWithdrawalType,
    posTransactionAmount,
    posTransactionFee,
    id,
    selectedPosFeePaymentType,
    posTransactionRemarkInput,
  };

  console.log(posFormData);

  const storedData = JSON.parse(localStorage.getItem('posFormData')) || [];

  const allData = [posFormData, ...storedData];

  localStorage.setItem('posFormData', JSON.stringify(allData));

  return posFormData;
}
