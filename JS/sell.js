// function to format amounts with commas
function formatAmountWithCommas(amount) {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const phoneAccessories = [
  { name: 'Phone Case', price: '₦1000' },
  { name: 'Screen Protector', price: '₦1500' },
  { name: 'Charging Cable', price: '₦800' },
  { name: 'Power Bank', price: '₦2000' },
  { name: 'Bluetooth Earphones', price: '₦3000' },
  { name: 'Wireless Charger', price: '₦1500' },
  { name: 'Car Phone Holder', price: '₦1200' },
  { name: 'Selfie Stick', price: '₦700' },
  { name: 'Headphones', price: '₦2500' },
  { name: 'Phone Stand', price: '₦600' },
  { name: 'USB Adapter', price: '₦900' },
  { name: 'Phone Grip', price: '₦300' },
  { name: 'Earbuds', price: '₦1800' },
  { name: 'Mobile Lens Kit', price: '₦2200' },
  { name: 'Smartwatch Band', price: '₦1500' },
  { name: 'AirPods', price: '₦1500' },
  { name: 'Bluetooth Earphones', price: '₦800' },
  { name: 'Charging Cable', price: '₦300' },
  { name: 'Durable Phone Case', price: '₦1000' },
  { name: 'Earbuds', price: '₦1800' },
  { name: 'Fingerprint Lock', price: '₦2500' },
  { name: 'Gaming Controller', price: '₦3500' },
  { name: 'Headphones', price: '₦2500' },
  { name: 'iPhone Case', price: '₦1000' },
  { name: 'JBL Speakers', price: '₦5000' },
  { name: 'Keyboard Cover', price: '₦800' },
  { name: 'LED Phone Case', price: '₦2000' },
  { name: 'Mobile Lens Kit', price: '₦2200' },
  { name: 'Noise Cancelling Earphones', price: '₦3500' },
  { name: 'OnePlus Charger', price: '₦1200' },
  { name: 'PopSocket', price: '₦500' },
  { name: 'Quick Charge Adapter', price: '₦1500' },
  { name: 'Ring Holder Stand', price: '₦600' },
  { name: 'Selfie Stick', price: '₦700' },
  { name: 'Smartwatch Band', price: '₦1500' },
  { name: 'Screen Protector', price: '₦1500' },
  { name: 'USB Adapter', price: '₦900' },
  { name: 'Wireless Charger', price: '₦1500' },
  { name: 'Xiaomi Power Bank', price: '₦2500' },
  { name: 'Zoom Lens', price: '₦3000' },
  { name: 'Zipper Earphones', price: '₦1200' },
  { name: 'Zigzag Phone Stand', price: '₦800' },
  { name: '360 Degree Phone Holder', price: '₦1200' },
  { name: 'Anti-Blue Light Glasses', price: '₦800' },
  { name: 'Foldable Bluetooth Keyboard', price: '₦2500' },
  { name: 'Game Controller Grip', price: '₦600' },
  { name: 'Holographic Phone Case', price: '₦1800' },
  { name: 'In-Ear Gaming Earphones', price: '₦2200' },
  { name: 'Jogging Arm Band', price: '₦500' },
  { name: 'Kevlar Charging Cable', price: '₦1200' },
  { name: 'Laptop Stand for Phones', price: '₦1500' },
  { name: 'Magnetic Car Mount', price: '₦700' },
  { name: 'NFC Tags for Phones', price: '₦400' },
  { name: 'Outdoor Waterproof Speaker', price: '₦3000' },
  { name: 'Portable UV Phone Sanitizer', price: '₦3500' },
  { name: 'Quad Lock Bike Mount', price: '₦2000' },
  { name: 'Retractable Charging Cable', price: '₦1000' },
  { name: 'Solar Power Bank', price: '₦4500' },
  { name: 'Telescopic Camera Lens', price: '₦2800' },
  { name: 'Universal Phone Holder Clip', price: '₦600' },
  { name: 'Virtual Reality Headset', price: '₦3500' },
  { name: 'Waterproof Phone Pouch', price: '₦800' },
];

const productInput = document.getElementById('productInput');
const autocompleteList = document.getElementById('autocompleteList');
const priceInput = document.getElementById('itemSellingPrice');

// Initial display of all products
displayAllProducts();

productInput.addEventListener('click', function () {
  autocompleteList.style.display = 'block';
});

productInput.addEventListener('input', function () {
  const inputValue = productInput.value.toLowerCase();
  const filteredProducts = phoneAccessories.filter((product) =>
    product.name.toLowerCase().includes(inputValue)
  );

  autocompleteList.innerHTML = '';

  // Display filtered suggestions
  if (filteredProducts.length === 0) {
    const listItem = document.createElement('li');
    listItem.textContent = 'Item Not Found';
    listItem.classList.add('autocomplete-list-item');

    autocompleteList.appendChild(listItem);
  } else {
    filteredProducts.forEach((product) => {
      const listItem = document.createElement('li');
      listItem.textContent = product.name;
      listItem.classList.add('autocomplete-list-item');

      listItem.addEventListener('click', function () {
        productInput.value = product.name;
        priceInput.value = product.price;
        autocompleteList.innerHTML = '';
      });
      autocompleteList.appendChild(listItem);
    });
  }
});

function displayAllProducts() {
  autocompleteList.innerHTML = '';
  phoneAccessories.forEach((product) => {
    const listItem = document.createElement('li');
    listItem.textContent = product.name;
    listItem.classList.add('autocomplete-list-item');

    listItem.addEventListener('click', function () {
      productInput.value = product.name;
      priceInput.value = formatAmountWithCommas(product.price);
      autocompleteList.style.display = 'none';
    });

    autocompleteList.appendChild(listItem);
  });
}

// Close the suggestions list when clicking outside
document.addEventListener('click', function (event) {
  if (!event.target.matches('#productInput')) {
    autocompleteList.style.display = 'none';
  }
});

// JS for the checkboxes and selling of an item
let checkboxStatus;
const balancePaymentInput = document.getElementById('productBalancePrice');

document.addEventListener('DOMContentLoaded', function () {
  const completedCheckbox = document.getElementById('completedCheckbox');
  const balanceCheckbox = document.getElementById('balanceCheckbox');
  const balancePayment = document.querySelector('.balancePayment');
  const balancePaymentInput = document.getElementById('productBalancePrice');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  function updateStatus() {
    if (completedCheckbox.checked) {
      checkboxStatus = 'Completed';
      balancePayment.style.display = 'none';
      balancePaymentInput.value = '';
      balancePaymentInput.disabled = true;
    } else {
      checkboxStatus = 'Balance';
      balancePayment.style.display = 'block';
      balancePaymentInput.disabled = false;
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

      if (checkbox === completedCheckbox) {
        completedCheckbox.checked = true;
        balancePayment.style.display = 'none';
        balancePaymentInput.disabled = true;
        balancePaymentInput.value = '';

        checkboxStatus = 'Completed';
      } else {
        balanceCheckbox.checked = true;
        balancePayment.style.display = 'block';
        balancePaymentInput.disabled = false;
        checkboxStatus = 'Balance';
      }
      updateStatus();
    });
  });

  balancePaymentInput.addEventListener('input', function () {
    const inputValue = balancePaymentInput.value.trim(); // Trim to remove leading/trailing spaces

    if (
      inputValue === '-' ||
      (!isNaN(inputValue) && parseFloat(inputValue) >= 0)
    ) {
      balanceCheckbox.checked = true;
      completedCheckbox.checked = false;
      completedCheckbox.removeAttribute('required');
      checkboxStatus = 'Balance';
    } else {
      return;

      // completedCheckbox.checked = true;
      // balanceCheckbox.checked = false;
      // checkboxStatus = 'Completed';
      // balancePayment.style.display = 'none';
      // balancePaymentInput.disabled = true;

      balanceCheckbox.checked = false;
      completedCheckbox.checked = false;
      checkboxStatus = 'Invalid';
    }

    updateStatus();
  });
});

// JS for Selling Products and adding to localStorage
const soldProductName = document.getElementById('productInput');
const soldProductPrice = document.getElementById('soldProductPrice');
const productBalancePrice = document.getElementById('productBalancePrice');
const soldProductRemark = document.getElementById('soldProductRemark');

function handleSellProduct() {
  let soldProductNameInput = soldProductName.value;
  let soldProductPriceInput = Number(soldProductPrice.value);
  let productBalancePriceInput = Number(productBalancePrice.value);
  let soldProductRemarkInput = soldProductRemark.value;
  let id = Math.random();

  if (productBalancePriceInput === 0 || productBalancePriceInput === '') {
    productBalancePriceInput = '-';
  }

  const soldProductFormData = {
    soldProductNameInput,
    soldProductPriceInput,
    productBalancePriceInput,
    soldProductRemarkInput,
    checkboxStatus,
    id,
  };

  const storedData =
    JSON.parse(localStorage.getItem('soldProductFormData')) || [];

  const allData = [soldProductFormData, ...storedData];

  localStorage.setItem('soldProductFormData', JSON.stringify(allData));

  return soldProductFormData;
}

const sellProductForm = document.querySelector('.sell-product-form');

if (sellProductForm) {
  sellProductForm.addEventListener('submit', function (e) {
    const balancePayment = document.querySelector('.balancePayment');
    const balancePaymentInput = document.getElementById('productBalancePrice');

    e.preventDefault();
    handleSellProduct();

    soldProductName.value = '';
    priceInput.value = '';
    soldProductPrice.value = '';
    productBalancePrice.value = '';
    soldProductRemark.value = '';
    completedCheckbox.checked = false;
    balanceCheckbox.checked = false;
    balancePayment.style.display = 'block';
    balancePaymentInput.disabled = false;
  });
}

// // JS to dispaly Item to be sold
// const sellButtons = document.querySelectorAll('.sellButton');
// const modalProductName = document.querySelector('.SellingItemName');
// const soldItemBoughtPrice = document.getElementById('soldItemBoughtPrice');

// sellButtons.forEach((button, index) => {
//   button.addEventListener('click', function (e) {
//     sellProductContainer.classList.add('active');
//     main.classList.add('blur');
//     sidebar.classList.add('blur');
//     main.classList.add('no-scroll');

//     const tableRow = e.target.closest('.table-body-row');
//     const selectedIndex = index;

//     const selectedItem = storedGoodsData[selectedIndex];

//     if (selectedItem) {
//       const productName = selectedItem.addProductNameInput;
//       const amountBought = formatAmountWithCommas(
//         selectedItem.addProductBoughtPriceInput
//       );

//       modalProductName.textContent = productName;
//       soldItemBoughtPrice.value = amountBought;
//     }
//   });
// });
