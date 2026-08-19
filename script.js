const PRODUCTS = [

  {
    id: 1,
    name: "Fresh Apples",
    category: "fruits",
    price: 120,
    unit: "1 kg",
    emoji: "🍎"
  },

  {
    id: 2,
    name: "Bananas",
    category: "fruits",
    price: 55,
    unit: "1 dozen",
    emoji: "🍌"
  },

  {
    id: 3,
    name: "Mango",
    category: "fruits",
    price: 140,
    unit: "1 kg",
    emoji: "🥭"
  },

  {
    id: 4,
    name: "Fresh Tomato",
    category: "vegetables",
    price: 40,
    unit: "1 kg",
    emoji: "🍅"
  },

  {
    id: 5,
    name: "Broccoli",
    category: "vegetables",
    price: 80,
    unit: "500 g",
    emoji: "🥦"
  },

  {
    id: 6,
    name: "Potatoes",
    category: "vegetables",
    price: 45,
    unit: "1 kg",
    emoji: "🥔"
  },

  {
    id: 7,
    name: "Full Cream Milk",
    category: "dairy",
    price: 65,
    unit: "1 litre",
    emoji: "🥛"
  },

  {
    id: 8,
    name: "Cheese",
    category: "dairy",
    price: 110,
    unit: "200 g",
    emoji: "🧀"
  },

  {
    id: 9,
    name: "Curd",
    category: "dairy",
    price: 45,
    unit: "400 g",
    emoji: "🥣"
  },

  {
    id: 10,
    name: "Chocolate Cookies",
    category: "snacks",
    price: 45,
    unit: "100 g",
    emoji: "🍪"
  },

  {
    id: 11,
    name: "Potato Chips",
    category: "snacks",
    price: 30,
    unit: "50 g",
    emoji: "🍟"
  },

  {
    id: 12,
    name: "Popcorn",
    category: "snacks",
    price: 50,
    unit: "100 g",
    emoji: "🍿"
  },

  {
    id: 13,
    name: "Orange Juice",
    category: "beverages",
    price: 90,
    unit: "1 litre",
    emoji: "🧃"
  },

  {
    id: 14,
    name: "Cold Drink",
    category: "beverages",
    price: 45,
    unit: "750 ml",
    emoji: "🥤"
  },

  {
    id: 15,
    name: "Green Tea",
    category: "beverages",
    price: 150,
    unit: "25 bags",
    emoji: "🍵"
  },

  {
    id: 16,
    name: "Shampoo",
    category: "personal",
    price: 180,
    unit: "180 ml",
    emoji: "🧴"
  },

  {
    id: 17,
    name: "Hand Wash",
    category: "personal",
    price: 95,
    unit: "250 ml",
    emoji: "🧼"
  },

  {
    id: 18,
    name: "Toothpaste",
    category: "personal",
    price: 90,
    unit: "150 g",
    emoji: "🪥"
  }

];


let cart = JSON.parse(
  localStorage.getItem("drinkitCart") || "[]"
);


/* ---------------------------
   STORAGE
--------------------------- */

function saveCart() {

  localStorage.setItem(
    "drinkitCart",
    JSON.stringify(cart)
  );

  updateCartCount();
}


function updateCartCount() {

  const count = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  document
    .querySelectorAll("#cartCount")
    .forEach(element => {
      element.textContent = count;
    });
}


updateCartCount();


/* ---------------------------
   TOAST
--------------------------- */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2000);
}


/* ---------------------------
   PRODUCT CARD
--------------------------- */

function createProductCard(product) {

  return `

    <article class="product-card">

      <div class="product-image">
        ${product.emoji}
      </div>

      <h3>
        ${product.name}
      </h3>

      <span class="product-unit">
        ${product.unit}
      </span>

      <div class="product-bottom">

        <strong>
          ₹${product.price}
        </strong>

        <button
          class="add-button"
          onclick="addToCart(${product.id})"
        >
          ADD
        </button>

      </div>

    </article>

  `;
}


/* ---------------------------
   HOME
--------------------------- */

const homeProducts =
  document.getElementById(
    "homeProducts"
  );

if (homeProducts) {

  homeProducts.innerHTML =
    PRODUCTS
      .slice(0, 10)
      .map(createProductCard)
      .join("");
}


/* ---------------------------
   PRODUCTS PAGE
--------------------------- */

const productsContainer =
  document.getElementById(
    "productsContainer"
  );

let currentCategory = "all";
let currentSearch = "";


function renderProducts() {

  if (!productsContainer)
    return;


  let list = [...PRODUCTS];


  if (currentCategory !== "all") {

    list = list.filter(
      product =>
        product.category ===
        currentCategory
    );

  }


  if (currentSearch) {

    list = list.filter(product => {

      const search =
        currentSearch.toLowerCase();

      return (
        product.name
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search)
      );

    });

  }


  const sort =
    document.getElementById(
      "sortSelect"
    )?.value;


  if (sort === "low") {

    list.sort(
      (a, b) =>
        a.price - b.price
    );

  }


  if (sort === "high") {

    list.sort(
      (a, b) =>
        b.price - a.price
    );

  }


  productsContainer.innerHTML =
    list.length
      ? list
          .map(createProductCard)
          .join("")
      : `
        <div style="
          grid-column:1/-1;
          background:white;
          padding:60px;
          text-align:center;
          border-radius:12px;
        ">
          <div style="font-size:60px">
            🔍
          </div>

          <h2>
            No products found
          </h2>

          <p>
            Try another search.
          </p>
        </div>
      `;


  const resultText =
    document.getElementById(
      "resultText"
    );

  if (resultText) {

    resultText.textContent =
      `${list.length} products found`;

  }

}


renderProducts();


function filterProducts(category) {

  currentCategory = category;

  renderProducts();

}


const productSearch =
  document.getElementById(
    "productSearch"
  );


if (productSearch) {

  productSearch.addEventListener(
    "input",
    function () {

      currentSearch =
        this.value.trim();

      renderProducts();

    }
  );

}


const sortSelect =
  document.getElementById(
    "sortSelect"
  );


if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    renderProducts
  );

}


/* ---------------------------
   GLOBAL SEARCH
--------------------------- */

const globalSearch =
  document.getElementById(
    "globalSearch"
  );


if (globalSearch) {

  globalSearch.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" &&
        this.value.trim()
      ) {

        const query =
          encodeURIComponent(
            this.value.trim()
          );

        window.location.href =
          `products.html?search=${query}`;

      }

    }
  );

}


/* ---------------------------
   CATEGORY HOME
--------------------------- */

function goCategory(category) {

  window.location.href =
    `products.html?category=${category}`;

}


/* ---------------------------
   READ URL FILTERS
--------------------------- */

const params =
  new URLSearchParams(
    window.location.search
  );


const urlCategory =
  params.get("category");

const urlSearch =
  params.get("search");


if (urlCategory &&
    productsContainer) {

  currentCategory =
    urlCategory;

  renderProducts();

}


if (urlSearch &&
    productsContainer) {

  currentSearch =
    urlSearch;

  if (productSearch) {

    productSearch.value =
      urlSearch;

  }

  renderProducts();

}


/* ---------------------------
   ADD TO CART
--------------------------- */

function addToCart(id) {

  const product =
    PRODUCTS.find(
      item => item.id === id
    );


  if (!product)
    return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  saveCart();

  showToast(
    `${product.name} added to cart 🛒`
  );

}


/* ---------------------------
   CART PAGE
--------------------------- */

const cartItems =
  document.getElementById(
    "cartItems"
  );


function renderCart() {

  if (!cartItems)
    return;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div style="
        text-align:center;
        padding:70px 20px;
      ">

        <div style="
          font-size:70px;
        ">
          🛒
        </div>

        <h2>
          Your cart is empty
        </h2>

        <p style="
          color:#777;
          margin-top:8px;
        ">
          Add some groceries to continue.
        </p>

        <a
          href="products.html"
          class="primary-btn"
        >
          Start Shopping
        </a>

      </div>

    `;

    calculateBill();

    return;
  }


  cartItems.innerHTML =
    cart.map(item => `

      <div class="cart-item">

        <div class="cart-image">
          ${item.emoji}
        </div>

        <div class="cart-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${item.unit}
          </p>

          <strong>
            ₹${item.price}
          </strong>

          <div class="quantity">

            <button
              onclick="changeQuantity(
                ${item.id},
                -1
              )"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(
                ${item.id},
                1
              )"
            >
              +
            </button>

          </div>

        </div>

        <strong>
          ₹${item.price *
            item.quantity}
        </strong>

      </div>

    `).join("");


  calculateBill();

}


function changeQuantity(id, change) {

  const item =
    cart.find(
      product =>
        product.id === id
    );


  if (!item)
    return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  }


  saveCart();

  renderCart();

}


function calculateBill() {

  const itemTotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  const delivery =
    itemTotal === 0
      ? 0
      : itemTotal >= 499
        ? 0
        : 20;


  const handling =
    itemTotal === 0
      ? 0
      : 5;


  const grandTotal =
    itemTotal +
    delivery +
    handling;


  const itemTotalEl =
    document.getElementById(
      "itemTotal"
    );

  const deliveryEl =
    document.getElementById(
      "deliveryFee"
    );

  const handlingEl =
    document.getElementById(
      "handlingFee"
    );

  const grandTotalEl =
    document.getElementById(
      "grandTotal"
    );


  if (itemTotalEl)
    itemTotalEl.textContent =
      `₹${itemTotal}`;


  if (deliveryEl)
    deliveryEl.textContent =
      delivery === 0
        ? "FREE"
        : `₹${delivery}`;


  if (handlingEl)
    handlingEl.textContent =
      `₹${handling}`;


  if (grandTotalEl)
    grandTotalEl.textContent =
      `₹${grandTotal}`;


  const checkoutLink =
    document.getElementById(
      "checkoutLink"
    );


  if (checkoutLink) {

    if (cart.length === 0) {

      checkoutLink.classList.add(
        "disabled"
      );

    } else {

      checkoutLink.classList.remove(
        "disabled"
      );

    }

  }

}


renderCart();


/* ---------------------------
   CHECKOUT
--------------------------- */

const checkoutSummary =
  document.getElementById(
    "checkoutSummary"
  );


function renderCheckout() {

  if (!checkoutSummary)
    return;


  if (cart.length === 0) {

    checkoutSummary.innerHTML = `
      <p style="color:#777">
        Your cart is empty.
      </p>
    `;

    return;
  }


  checkoutSummary.innerHTML =
    cart.map(item => `

      <div class="bill-row">

        <span>
          ${item.name}
          × ${item.quantity}
        </span>

        <strong>
          ₹${item.price *
            item.quantity}
        </strong>

      </div>

    `).join("");


  const itemTotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  const delivery =
    itemTotal >= 499
      ? 0
      : 20;


  const total =
    itemTotal +
    delivery +
    5;


  const totalElement =
    document.getElementById(
      "checkoutTotal"
    );


  if (totalElement) {

    totalElement.textContent =
      `₹${total}`;

  }

}


renderCheckout();


/* ---------------------------
   PLACE ORDER
--------------------------- */

function placeOrder() {

  if (cart.length === 0) {

    showToast(
      "Your cart is empty."
    );

    return;

  }


  const name =
    document.getElementById(
      "customerName"
    ).value.trim();


  const phone =
    document.getElementById(
      "customerPhone"
    ).value.trim();


  const address =
    document.getElementById(
      "customerAddress"
    ).value.trim();


  if (!name ||
      !phone ||
      !address) {

    alert(
      "Please fill all delivery details."
    );

    return;

  }


  if (!/^[0-9]{10}$/.test(phone)) {

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;

  }


  const orderNumber =
    "DRK" +
    Math.floor(
      100000 +
      Math.random() * 900000
    );


  const orderNumberElement =
    document.getElementById(
      "orderNumber"
    );


  if (orderNumberElement) {

    orderNumberElement.textContent =
      `Order ID: ${orderNumber}`;

  }


  localStorage.setItem(
    "drinkitLastOrder",
    JSON.stringify({
      id: orderNumber,
      name,
      phone,
      address,
      items: cart,
      createdAt:
        new Date().toISOString()
    })
  );


  cart = [];

  saveCart();


  const modal =
    document.getElementById(
      "successModal"
    );


  if (modal) {

    modal.classList.add(
      "show"
    );

  }

}


function goHome() {

  window.location.href =
    "index.html";

}


/* ---------------------------
   LOCATION
--------------------------- */

function changeLocation() {

  const current =
    document.getElementById(
      "locationText"
    )?.textContent ||
    "Huzurganj";


  const newLocation =
    prompt(
      "Enter delivery location:",
      current
    );


  if (!newLocation ||
      !newLocation.trim())
    return;


  document
    .querySelectorAll(
      "#locationText"
    )
    .forEach(element => {

      element.textContent =
        newLocation.trim();

    });


  localStorage.setItem(
    "drinkitLocation",
    newLocation.trim()
  );


  showToast(
    "Delivery location updated 📍"
  );

}


/* ---------------------------
   LOAD LOCATION
--------------------------- */

const savedLocation =
  localStorage.getItem(
    "drinkitLocation"
  );


if (savedLocation) {

  document
    .querySelectorAll(
      "#locationText"
    )
    .forEach(element => {

      element.textContent =
        savedLocation;

    });

}