// Data Models
const allCategories = [
  { name: "Paan Corner", icon: "./Images/paan-cornor.jpg", link:"https://blinkit.com/cn/null/cid/229/1982"},
  { name: "Dairy, Bread & Eggs", icon: "./Images/deary.jpg", link: "https://blinkit.com/cn/null/cid/14/922"},
  { name: "Fruits & Vegetables", icon: "./Images/Slice.jpg", link: "https://blinkit.com/cn/null/cid/1487/1489"},
  { name: "Cold Drinks & Juices", icon: "./Images/Slice-4.jpg", link: "https://blinkit.com/cn/null/cid/332/1102" },
  { name: "Snacks & Munchies", icon: "./Images/Slice-5.jpg", link: "https://blinkit.com/cn/null/cid/1237/940"},
  { name: "Breakfast & Instant Food", icon: "./Images/Slice-6.jpg", link: "https://blinkit.com/cn/null/cid/15/954"},
  { name: "Sweet Tooth", icon: "./Images/Slice-7.jpg", link: "https://blinkit.com/cn/null/cid/9/944"},
  { name: "Bakery & Biscuits", icon: "./Images/Slice-8.jpg", link: "https://blinkit.com/cn/null/cid/888/28"},
  { name: "Tea, Coffee & Milk Drinks", icon: "./Images/Slice-9.jpg", link: "https://blinkit.com/cn/null/cid/12/957"},
  { name: "Atta, Rice & Dal", icon: "./Images/Slice-10.jpg", link: "https://blinkit.com/cn/null/cid/16/1165"},
  { name: "Masala, Oil & More", icon: "./Images/Slice-11.jpg", link: "https://blinkit.com/cn/null/cid/1557/50"},
  { name: "Sauces & Spreads", icon: "./Images/Slice-12.jpg", link: "https://blinkit.com/cn/null/cid/972/1131"},
  { name: "Chicken, Meat & Fish", icon: "./Images/Slice-13.jpg", link: "https://blinkit.com/cn/null/cid/4/1362"},
  { name: "Organic & Healthy Living", icon: "./Images/Slice-14.jpg", link: "https://blinkit.com/cn/null/cid/175/801"},
  { name: "Baby Care", icon: "./Images/Slice-15.jpg", link: "https://blinkit.com/cn/null/cid/7/1000"},
  { name: "Pharma & Wellness", icon: "./Images/Slice-16.jpg", link: "https://blinkit.com/cn/null/cid/287/1826"},
  { name: "Cleaning Essentials", icon: "./Images/Slice-17.jpg", link: "https://blinkit.com/cn/null/cid/18/986" },
  { name: "Home & Office", icon: "./Images/Slice-18.jpg", link: "https://blinkit.com/cn/null/cid/1379/1075"},
  { name: "Personal Care", icon: "./Images/Slice-19.jpg", link: "https://blinkit.com/cn/null/cid/163/696"},
  { name: "Pet Care", icon: "./Images/Slice-20.jpg", link: "https://blinkit.com/cn/null/cid/5/133"},
];

const productCatalog = [
  { id: 1, name: "Amul Taaza Toned Fresh Milk", weight: "500 ml", price: 27, mrp: 28, category: "Dairy, Bread & Eggs", icon: "🥛" },
  { id: 2, name: "Harvest Gold White Bread", weight: "400 g", price: 45, mrp: 50, category: "Dairy, Bread & Eggs", icon: "🍞" },
  { id: 3, name: "Farm Fresh Brown Table Eggs", weight: "6 pcs", price: 68, mrp: 75, category: "Dairy, Bread & Eggs", icon: "🥚" },
  { id: 4, name: "Amul Salted Butter", weight: "100 g", price: 58, mrp: 60, category: "Dairy, Bread & Eggs", icon: "🧈" },
  { id: 5, name: "Fresh Hybrid Red Tomatoes", weight: "500 g", price: 24, mrp: 30, category: "Fruits & Vegetables", icon: "🍅" },
  { id: 6, name: "Fresh Green Cabbage", weight: "1 pc", price: 35, mrp: 40, category: "Fruits & Vegetables", icon: "🥬" },
  { id: 7, name: "Cavendish Fresh Bananas", weight: "500 g", price: 38, mrp: 45, category: "Fruits & Vegetables", icon: "🍌" },
  { id: 8, name: "Lay's India's Magic Masala Chips", weight: "50 g", price: 20, mrp: 20, category: "Snacks & Munchies", icon: "🥔" },
  { id: 9, name: "Kurkure Masala Munch Crisp", weight: "75 g", price: 20, mrp: 20, category: "Snacks & Munchies", icon: "🍿" },
  { id: 10, name: "Coca-Cola Zero Sugar Can", weight: "300 ml", price: 40, mrp: 40, category: "Cold Drinks & Juices", icon: "🥤" },
  { id: 11, name: "Frooti Mango Fresh Drink", weight: "125 ml", price: 10, mrp: 10, category: "Cold Drinks & Juices", icon: "🥭" },
  { id: 12, name: "Maggi 2-Minute Masala Noodles", weight: "70 g", price: 14, mrp: 14, category: "Breakfast & Instant Food", icon: "🍜" },
  { id: 13, name: "Cadbury Dairy Milk Silk Chocolate", weight: "60 g", price: 80, mrp: 85, category: "Sweet Tooth", icon: "🍫" },
  { id: 14, name: "Aashirvaad Superior Sharbati Atta", weight: "5 kg", price: 285, mrp: 310, category: "Atta, Rice & Dal", icon: "🌾" }
];

let selectedCategory = "";
let cart = {}; // { id: count }

// Search Placeholder Animation
const searchTerms = ["paneer", "chocolate", "curd", "rice", "egg", "chips", "milk", "bread", "sugar", "butter"];
let termIndex = 0;
const searchInput = document.getElementById("globalSearchInput");

setInterval(() => {
  termIndex = (termIndex + 1) % searchTerms.length;
  if (searchInput) {
    searchInput.placeholder = `Search "${searchTerms[termIndex]}"`;
  }
}, 2500);

// Render Category Boxes
// Render Category Boxes
function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;

  grid.innerHTML = allCategories.map(cat => {
    const isActive = cat.name === selectedCategory ? "active" : "";
    const hasLink = !!cat.link;

    if (hasLink) {
      // Agar link hai to <a> tag banaye
      return `
        <a class="category-box ${isActive}" 
           href="${cat.link}" 
           target="_blank" 
           rel="noopener noreferrer"
           data-category="${cat.name}">
          <div class="category-thumb">
            <img src="${cat.icon}" alt="${cat.name}" 
                 style="object-fit: cover; height:100%; width:100%">
          </div>
        </a>
      `;
    } else {
      // Agar link nahi hai to normal <div> hi rahega (internal filter)
      return `
        <div class="category-box ${isActive}" 
             data-category="${cat.name}">
          <div class="category-thumb">
            <img src="${cat.icon}" alt="${cat.name}" 
                 style="object-fit: cover; height:100%; width:100%">
          </div>
        </div>
      `;
    }
  }).join("");

  // Sirf un boxes par click listener lagaye jinke paas link NAHI hai
  document.querySelectorAll(".category-box").forEach(box => {
    // Agar <a> tag hai aur usme real link hai, to default behavior mat roko
    if (box.tagName === "A" && box.getAttribute("href") !== "#") {
      return;
    }

    box.addEventListener("click", () => {
      filterByCategory(box.dataset.category);
    });
  });
}

// Filter and Render Products
function filterByCategory(categoryName) {
  selectedCategory = categoryName;
  const heading = document.getElementById("currentCategoryHeading");
  if (heading) heading.innerText = categoryName;
  
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const pGrid = document.getElementById("productsGrid");
  if (!pGrid) return;

  const filtered = productCatalog.filter(p => p.category === selectedCategory);

  if (filtered.length === 0) {
    pGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">No products found in this category.</p>`;
    return;
  }

  pGrid.innerHTML = filtered.map(p => {
    const qty = cart[p.id] || 0;
    return `
      <div class="product-card">
        <div>
          <div class="eta-badge">⏱ 8 MINS</div>
          <div class="product-img-box">${p.icon}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-weight">${p.weight}</div>
        </div>
        <div class="product-action-row">
          <div class="price-col">
            <span class="price-now">₹${p.price}</span>
            ${p.mrp > p.price ? `<span class="price-old">₹${p.mrp}</span>` : ""}
          </div>
          ${qty === 0 
            ? `<button class="btn-add-item" data-id="${p.id}" data-change="1">ADD</button>`
            : `<div class="qty-counter">
                <button data-id="${p.id}" data-change="-1">-</button>
                <span>${qty}</span>
                <button data-id="${p.id}" data-change="1">+</button>
               </div>`
          }
        </div>
      </div>
    `;
  }).join("");

  // Attach listeners for ADD & quantity buttons
  pGrid.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const change = parseInt(e.target.dataset.change);
      updateCart(id, change);
    });
  });
}

// Cart State & Drawer Updates
function updateCart(productId, change) {
  const currentQty = cart[productId] || 0;
  const newQty = currentQty + change;

  if (newQty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = newQty;
  }

  renderProducts();
  updateCartUI();
}

function updateCartUI() {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const navLabel = document.getElementById("navCartLabel");
  const drawerQty = document.getElementById("cartDrawerQty");
  const drawerBody = document.getElementById("cartDrawerBody");
  const drawerFooter = document.getElementById("cartDrawerFooter");
  const totalPay = document.getElementById("cartTotalPay");

  if (navLabel) navLabel.innerText = totalItems > 0 ? `${totalItems} items` : "My Cart";
  if (drawerQty) drawerQty.innerText = totalItems;

  if (totalItems === 0) {
    drawerBody.innerHTML = `
      <div style="text-align: center; margin-top: 60px;">
        <div style="font-size: 60px;">🛒</div>
        <h3 style="font-size: 18px; margin-top: 10px;">Your cart is empty</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">Add items to start shopping</p>
      </div>`;
    if (drawerFooter) drawerFooter.style.display = "none";
    return;
  }

  let subtotal = 0;
  let itemsHTML = "";

  Object.keys(cart).forEach(id => {
    const p = productCatalog.find(item => item.id == id);
    if (p) {
      const itemTotal = p.price * cart[id];
      subtotal += itemTotal;
      itemsHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="font-size: 13px; font-weight: 600;">${p.name}</div>
            <div style="font-size: 12px; color: var(--text-muted);">₹${p.price} × ${cart[id]}</div>
          </div>
          <div style="font-weight: 800; font-size: 14px;">₹${itemTotal}</div>
        </div>
      `;
    }
  });

  const deliveryFee = subtotal > 199 ? 0 : 15;
  const grandTotal = subtotal + deliveryFee;

  drawerBody.innerHTML = `
    ${itemsHTML}
    <div class="bill-card">
      <h4>Bill Details</h4>
      <div class="bill-item-row">
        <span>Items subtotal</span>
        <span>₹${subtotal}</span>
      </div>
      <div class="bill-item-row">
        <span>Delivery charge</span>
        <span>${deliveryFee === 0 ? '<span style="color:var(--brand-green)">FREE</span>' : `₹${deliveryFee}`}</span>
      </div>
      <div class="bill-item-row grand">
        <span>Grand Total</span>
        <span>₹${grandTotal}</span>
      </div>
    </div>
  `;

  if (drawerFooter) drawerFooter.style.display = "block";
  if (totalPay) totalPay.innerText = `₹${grandTotal}`;
}

// Modal and Drawer Toggles
const loginModal = document.getElementById("loginModalBackdrop");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");

document.getElementById("openLoginBtn")?.addEventListener("click", () => {
  loginModal?.classList.add("active");
});

document.getElementById("closeLoginBtn")?.addEventListener("click", () => {
  loginModal?.classList.remove("active");
});

document.getElementById("continueLoginBtn")?.addEventListener("click", () => {
  loginModal?.classList.remove("active");
});

document.getElementById("openCartBtn")?.addEventListener("click", () => {
  cartDrawer?.classList.add("active");
  cartBackdrop?.classList.add("active");
});

function closeCart() {
  cartDrawer?.classList.remove("active");
  cartBackdrop?.classList.remove("active");
}

document.getElementById("closeCartBtn")?.addEventListener("click", closeCart);
cartBackdrop?.addEventListener("click", closeCart);

document.getElementById("deliveryWidget")?.addEventListener("click", () => {
  alert("Address selector feature opened!");
});

document.getElementById("brandLogo")?.addEventListener("click", (e) => {
  e.preventDefault();
  filterByCategory("Dairy, Bread & Eggs");
});

document.getElementById("heroShopBtn")?.addEventListener("click", () => {
  filterByCategory("Fruits & Vegetables");
});

document.getElementById("payNowBtn")?.addEventListener("click", () => {
  alert("Order placed successfully! 🚀");
  cart = {};
  updateCartUI();
  renderProducts();
  closeCart();
});

// Initialize App
window.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  updateCartUI();
});