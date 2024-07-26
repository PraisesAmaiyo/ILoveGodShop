// function to format amounts with commas
function formatAmountWithCommas(amount) {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// JS for Adding Products
const addProductName = document.getElementById('addProductName');
const addProductBoughtPrice = document.getElementById('addProductBoughtPrice');
const addProductSellingPrice = document.getElementById(
  'addProductSellingPrice'
);
const addProductQuantity = document.getElementById('addProductQuantity');

function handleAddProductSubmit() {
  let addProductNameInput = addProductName.value;
  let addProductBoughtPriceInput = Number(addProductBoughtPrice.value);
  let addProductSellingPriceInput = Number(addProductSellingPrice.value);
  let addProductQuantityInput = Number(addProductQuantity.value);
  let id = Math.random();

  const addProductFormData = {
    addProductNameInput,
    addProductBoughtPriceInput,
    addProductSellingPriceInput,
    addProductQuantityInput,
    id,
  };

  const storedData =
    JSON.parse(localStorage.getItem('addProductFormData')) || [];

  const allData = [addProductFormData, ...storedData];

  localStorage.setItem('addProductFormData', JSON.stringify(allData));

  return addProductFormData;
}

const addProductForm = document.querySelector('.add-product-form');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    //  e.preventDefault();
    handleAddProductSubmit();

    addProductName.value = '';
    addProductBoughtPrice.value = '';
    addProductSellingPrice.value = '';
    addProductQuantity.value = '';
    closeModal();
  });
}

// JS to render items from LocalStorage
const storedGoodsData =
  JSON.parse(localStorage.getItem('addProductFormData')) || [];

function renderAddedGoods() {
  const goodsTableBody = document.querySelector('.product-table tbody');

  goodsTableBody.innerHTML = '';

  storedGoodsData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1 productSerialNumber">${index + 1}</td>
    <td class="py-1 productName">${data.addProductNameInput}</td>
    <td class="py-1 productAmountBought">&#x20A6;${formatAmountWithCommas(
      data.addProductBoughtPriceInput
    )}</td>
    <td class="py-1 productQuantity">${data.addProductQuantityInput}</td>
    <td class="py-1 productSellingPrice">&#x20A6;${formatAmountWithCommas(
      data.addProductSellingPriceInput
    )}</td>
    <td class="py-1 "><button class="hero-btn-light updatePriceButton"  data-product-id="${
      data.id
    }">UPDATE PRICE</button></td>
   `;

    goodsTableBody.appendChild(row);
  });
}

renderAddedGoods();

// JS to dispaly Item to be sold
const updatePriceButton = document.querySelectorAll('.updatePriceButton');
const updatePriceContainer = document.querySelector('.updatePrice');
const updatePriceNameInput = document.getElementById('updatePriceName');
const productBoughtPriceInput = document.getElementById('productBoughtPrice');
const previousItemPriceInput = document.getElementById('previousItemPrice');
const newItemPriceInput = document.getElementById('newItemPrice');
const saveProductButton = document.querySelector('.saveProductButton');

updatePriceButton.forEach((button, index) => {
  button.addEventListener('click', function (e) {
    updatePriceContainer.classList.add('active');
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');

    const productId = this.dataset.productId;
    const productData = storedGoodsData.find(
      (product) => product.id.toString() === productId
    );

    if (productData) {
      updatePriceNameInput.value = productData.addProductNameInput;
      productBoughtPriceInput.value = productData.addProductBoughtPriceInput;
      previousItemPriceInput.value = productData.addProductSellingPriceInput;
      updatePriceContainer.classList.add('active');
    } else {
      console.error(`Product with id ${productId} not found in local storage.`);
    }
  });
});

// Handle form submission
saveProductButton.addEventListener('click', function (e) {
  //   e.preventDefault();

  const updatedProductName = updatePriceNameInput.value;
  const updatedProductBoughtPrice = productBoughtPriceInput.value;
  const updatedNewItemPrice = newItemPriceInput.value;

  const storedData =
    JSON.parse(localStorage.getItem('addProductFormData')) || [];

  const productIndex = storedData.findIndex(
    (product) => product.addProductNameInput === updatedProductName
  );

  storedData[productIndex].addProductSellingPriceInput = updatedNewItemPrice;

  localStorage.setItem('addProductFormData', JSON.stringify(storedData));

  closeModal();
});

// JS for Selling Products and adding to localStorage
const soldProductPrice = document.getElementById('soldProductPrice');
const productBalancePrice = document.getElementById('productBalancePrice');
const soldProductRemark = document.getElementById('soldProductRemark');

function handleSellProduct() {
  //   let soldItemNameInput = soldItemName.innerText;
  let soldProductPriceInput = Number(soldProductPrice.value);
  let productBalancePriceInput = Number(productBalancePrice.value);
  let soldProductRemarkInput = soldProductRemark.value;
  let id = Math.random();

  if (productBalancePriceInput === 0 || productBalancePriceInput === '') {
    productBalancePriceInput = '-';
  }

  const soldProductFormData = {
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

    soldProductPrice.value = '';
    productBalancePrice.value = '';
    soldProductRemark.value = '';
    completedCheckbox.checked = false;
    balanceCheckbox.checked = false;
    balancePayment.style.display = 'flex';
    balancePaymentInput.disabled = false;
    closeModal();
  });
}

// JS for modal
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');

const closeModalButton = document.querySelectorAll('.closeModal');
const closeImageModalBtn = document.querySelectorAll('.closeImageModal');

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
});

function closeModal() {
  updatePriceContainer.classList.remove('active');
  addProductContainer.classList.remove('active');

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');
}

// JS for Modal

const addButton = document.querySelector('.addProductButton');
const addProductContainer = document.querySelector('.addProduct');

addButton.addEventListener('click', function () {
  addProductContainer.classList.add('active');
  main.classList.add('blur');
  sidebar.classList.add('blur');
  main.classList.add('no-scroll');
});
