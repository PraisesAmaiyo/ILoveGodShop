const deviceType = document.getElementById('deviceType');
const deviceOwnerName = document.getElementById('deviceOwnerName');
const deviceId = document.getElementById('deviceId');
const alternativeNumber = document.getElementById('alternativeNumber');
const deviceChargeFee = document.getElementById('deviceChargeFee');
const deviceStatus = document.getElementById('deviceStatus');

const chargingForm = document.querySelector('.charging-method-form');

if (chargingForm) {
  chargingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleChargingFormSubmit();

    deviceType.value = 'Phone';
    deviceOwnerName.value = '';
    deviceId.value = '';
    alternativeNumber.value = '';
    deviceChargeFee.value = '';
    deviceStatus.value = 'Collected';
  });
}

function handleChargingFormSubmit() {
  let selectedDeviceType = deviceType.value;
  let deviceOwnerNameInput = deviceOwnerName.value;
  let deviceIdInput = deviceId.value;
  let alternativeNumberInput = alternativeNumber.value;
  let deviceChargeFeeInput = Number(deviceChargeFee.value);
  let selectedDeviceStatus = deviceStatus.value;
  let id = Math.random();

  const chargeFormData = {
    selectedDeviceType,
    deviceOwnerNameInput,
    deviceIdInput,
    alternativeNumberInput,
    deviceChargeFeeInput,
    selectedDeviceStatus,
    id,
  };

  const storedData = JSON.parse(localStorage.getItem('chargeFormData')) || [];

  const allData = [chargeFormData, ...storedData];

  localStorage.setItem('chargeFormData', JSON.stringify(allData));

  return chargingForm;
}
