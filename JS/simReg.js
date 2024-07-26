let checkboxStatus;

document.addEventListener('DOMContentLoaded', function () {
  const successfulCheckbox = document.getElementById('successfulCheckbox');
  const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  function updateStatus() {
    if (successfulCheckbox.checked) {
      checkboxStatus = 'Successful';
    } else {
      checkboxStatus = 'Unsuccessful';
    }
    console.log(checkboxStatus);
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

      if (checkbox === successfulCheckbox) {
        successfulCheckbox.checked = true;
        checkboxStatus = 'Successful';
      } else {
        unSuccessfulCheckbox.checked = true;
        checkboxStatus = 'UnSuccessful';
      }
      updateStatus();
    });
  });
});

// JS for Selling Products and adding to localStorage
const simType = document.getElementById('simType');
const phoneNumber = document.getElementById('phoneNumber');
const serialNumber = document.getElementById('serialNumber');
const successfulCheckbox = document.getElementById('successfulCheckbox');
const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');
const simRegAmount = document.getElementById('simRegAmount');

function handleSellProduct() {
  let selectedSimName = simType.value;
  let phoneNumberInput = phoneNumber.value;
  let serialNumberInput = serialNumber.value;
  let simRegAmountInput = Number(simRegAmount.value);
  let id = Math.random();

  const simRegFormData = {
    selectedSimName,
    phoneNumberInput,
    serialNumberInput,
    simRegAmountInput,
    checkboxStatus,
    id,
  };

  console.log(simRegFormData);

  const storedData = JSON.parse(localStorage.getItem('simRegFormData')) || [];

  const allData = [simRegFormData, ...storedData];

  localStorage.setItem('simRegFormData', JSON.stringify(allData));

  return simRegFormData;
}

const simRegistrationForm = document.querySelector('.simReg-method-form');

if (simRegistrationForm) {
  simRegistrationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSellProduct();

    simType.value = '';
    phoneNumber.value = '';
    serialNumber.value = '';
    simRegAmount.value = '';
    successfulCheckbox.checked = false;
    unSuccessfulCheckbox.checked = false;
  });
}
