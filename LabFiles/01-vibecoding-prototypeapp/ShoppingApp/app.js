const products = [
  { id: "apples", name: "Apples", description: "Crisp, sweet apples for snacking.", price: 1.99, priceUnit: "lb", quantityUnit: "pound", emoji: "🍎", color: "#f8e8db" },
  { id: "bananas", name: "Bananas", description: "Ripe bananas with a naturally sweet flavor.", price: 0.59, priceUnit: "lb", quantityUnit: "pound", emoji: "🍌", color: "#f8efcf" },
  { id: "oranges", name: "Oranges", description: "Juicy oranges with a bright citrus flavor.", price: 1.49, priceUnit: "lb", quantityUnit: "pound", emoji: "🍊", color: "#f8e5ce" },
  { id: "strawberries", name: "Strawberries", description: "Sweet strawberries, sold by the container.", price: 3.99, priceUnit: "container", quantityUnit: "container", emoji: "🍓", color: "#f7deda" },
  { id: "grapes", name: "Grapes", description: "Seedless grapes, sold by the bunch.", price: 2.99, priceUnit: "bunch", quantityUnit: "bunch", emoji: "🍇", color: "#e9e0ee" },
  { id: "watermelon", name: "Watermelon", description: "Refreshing seedless watermelon, sold individually.", price: 5.99, priceUnit: "each", quantityUnit: "each", emoji: "🍉", color: "#f5e2d6" },
  { id: "pineapple", name: "Pineapple", description: "Whole ripe pineapple, sold individually.", price: 3.49, priceUnit: "each", quantityUnit: "each", emoji: "🍍", color: "#f4eccd" },
  { id: "mangoes", name: "Mangoes", description: "Sweet mangoes, sold individually.", price: 1.25, priceUnit: "each", quantityUnit: "each", emoji: "🥭", color: "#f6e4cf" },
  { id: "lemons", name: "Lemons", description: "Fresh lemons for cooking or drinks.", price: 0.79, priceUnit: "each", quantityUnit: "each", emoji: "🍋", color: "#f4f0cf" },
  { id: "peaches", name: "Peaches", description: "Juicy peaches, sold by the pound.", price: 2.49, priceUnit: "lb", quantityUnit: "pound", emoji: "🍑", color: "#f7e2d8" },
];

const pageNames = {
  products: "Products",
  details: "Product Details",
  cart: "Shopping Cart",
  checkout: "Checkout",
};

const state = {
  page: "products",
  selectedProductId: null,
  cart: new Map(),
  lastOrder: null,
};

const pageTitle = document.querySelector("#page-title");
const pageContent = document.querySelector("#page-content");
const cartCount = document.querySelector("#cart-count");
const cartShortcut = document.querySelector("#cart-shortcut");
const liveMessage = document.querySelector("#live-message");
let messageTimer;

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartTotal() {
  return [...state.cart.entries()].reduce((total, [productId, quantity]) => {
    return total + getProduct(productId).price * quantity;
  }, 0);
}

function formatQuantity(product, quantity) {
  if (product.quantityUnit === "pound") {
    return `${quantity} lb`;
  }
  if (product.quantityUnit === "each") {
    return `${quantity} ${quantity === 1 ? "each" : "each"}`;
  }
  return `${quantity} ${product.quantityUnit}${quantity === 1 ? "" : "s"}`;
}

function updateCartBadge() {
  const count = state.cart.size;
  cartCount.textContent = count;
  cartShortcut.setAttribute("aria-label", `Shopping cart, ${count} ${count === 1 ? "product" : "products"}`);
}

function showMessage(message) {
  liveMessage.textContent = message;
  liveMessage.classList.add("is-visible");
  window.clearTimeout(messageTimer);
  messageTimer = window.setTimeout(() => liveMessage.classList.remove("is-visible"), 2200);
}

function productCard(product) {
  return `
    <article class="product-card">
      <button class="product-art" type="button" data-action="details" data-product-id="${product.id}" style="background:${product.color}" aria-label="View ${product.name} details">
        <span aria-hidden="true">${product.emoji}</span>
      </button>
      <div class="product-info">
        <div class="product-heading">
          <div>
            <p class="product-category">FRESH FRUIT</p>
            <h3>${product.name}</h3>
          </div>
          <button class="text-button" type="button" data-action="details" data-product-id="${product.id}">Details</button>
        </div>
        <p class="product-price"><strong>${money(product.price)}</strong> / ${product.priceUnit}</p>
        <div class="purchase-row">
          <label class="quantity-control">Quantity
            <input type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity="${product.id}" aria-label="Quantity of ${product.name}">
          </label>
          <button class="primary-button" type="button" data-action="add" data-product-id="${product.id}">Add to Cart</button>
        </div>
        <p class="inline-error" data-product-error="${product.id}" aria-live="polite"></p>
      </div>
    </article>
  `;
}

function renderProducts() {
  return `
    <section aria-labelledby="products-heading">
      <div class="page-intro">
        <div>
          <p class="section-kicker">MARKET SELECTION</p>
          <h2 id="products-heading">A little fresh-picked joy.</h2>
          <p>Choose your fruit and make it a basket.</p>
        </div>
      </div>
      <div class="product-grid">${products.map(productCard).join("")}</div>
    </section>
  `;
}

function renderDetails() {
  const product = getProduct(state.selectedProductId);
  if (!product) {
    state.page = "products";
    return renderProducts();
  }

  return `
    <section aria-labelledby="details-heading">
      <p class="section-kicker">A CLOSER LOOK</p>
      <div class="details-layout">
        <div class="details-art" style="background:${product.color}" aria-hidden="true">${product.emoji}</div>
        <div class="details-copy">
          <a class="text-button" href="#products" data-page="products">&larr; Back to Products</a>
          <p class="product-category">FRESH FRUIT</p>
          <h2 id="details-heading">${product.name}</h2>
          <p class="details-description">${product.description}</p>
          <p class="details-price"><strong>${money(product.price)}</strong> / ${product.priceUnit}</p>
        </div>
      </div>
    </section>
  `;
}

function renderEmptyCart(page) {
  return `
    <section class="empty-state" aria-labelledby="empty-heading">
      <span class="empty-icon" aria-hidden="true">🧺</span>
      <p class="section-kicker">NOTHING IN THE BASKET</p>
      <h2 id="empty-heading">Your cart is empty.</h2>
      <p>Find something fresh for the table.</p>
      <a class="primary-button" href="#products" data-page="products">Browse Products</a>
      ${page === "checkout" ? '<p class="order-note">Order processing is unavailable until your basket has items.</p>' : ""}
    </section>
  `;
}

function cartRow(productId, quantity) {
  const product = getProduct(productId);
  return `
    <article class="cart-row">
      <div class="cart-product">
        <span class="cart-product-emoji" style="background:${product.color}" aria-hidden="true">${product.emoji}</span>
        <span><span class="cart-product-name">${product.name}</span><span class="cart-unit-price">${money(product.price)} / ${product.priceUnit}</span></span>
      </div>
      <div class="stepper" aria-label="Quantity of ${product.name}">
        <button class="stepper-button" type="button" data-action="decrement" data-product-id="${product.id}" aria-label="Decrease ${product.name} quantity">−</button>
        <input class="cart-quantity-input" type="number" min="1" step="1" value="${quantity}" data-cart-quantity="${product.id}" aria-label="Quantity of ${product.name}">
        <button class="stepper-button" type="button" data-action="increment" data-product-id="${product.id}" aria-label="Increase ${product.name} quantity">+</button>
      </div>
      <span class="line-total">${money(product.price * quantity)}</span>
      <button class="remove-button" type="button" data-action="remove" data-product-id="${product.id}">Remove</button>
    </article>
  `;
}

function renderCart() {
  if (state.cart.size === 0) {
    return renderEmptyCart("cart");
  }

  return `
    <section aria-labelledby="cart-heading">
      <div class="page-intro"><div><p class="section-kicker">YOUR PICKS</p><h2 id="cart-heading">Shopping Cart</h2></div></div>
      <div class="cart-list">
        <div class="cart-column-head" aria-hidden="true"><span>Product</span><span>Quantity</span><span>Total</span><span></span></div>
        ${[...state.cart.entries()].map(([productId, quantity]) => cartRow(productId, quantity)).join("")}
        <div class="cart-summary">
          <div class="summary-total"><span>Subtotal</span><strong>${money(getCartTotal())}</strong></div>
          <div class="action-group">
            <a class="secondary-button" href="#products" data-page="products">Continue Shopping</a>
            <a class="primary-button" href="#checkout" data-page="checkout">Checkout</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function checkoutItem(productId, quantity) {
  const product = getProduct(productId);
  return `
    <div class="checkout-item">
      <span class="checkout-item-name"><span class="checkout-item-emoji" aria-hidden="true">${product.emoji}</span>${product.name}</span>
      <span class="checkout-item-quantity">${formatQuantity(product, quantity)}</span>
      <span class="checkout-item-total">${money(product.price * quantity)}</span>
    </div>
  `;
}

function renderConfirmation() {
  if (!state.lastOrder) {
    return "";
  }

  return `
    <section class="confirmation" aria-labelledby="confirmation-heading">
      <span class="confirmation-icon" aria-hidden="true">✓</span>
      <p class="section-kicker">ORDER COMPLETE</p>
      <h2 id="confirmation-heading">Your fruit is on its way.</h2>
      <p>This is a prototype confirmation. No payment was taken.</p>
      <p class="order-note">Order total: <strong>${money(state.lastOrder.total)}</strong></p>
      <a class="secondary-button" href="#products" data-page="products">Back to Products</a>
    </section>
  `;
}

function renderCheckout() {
  if (state.cart.size === 0) {
    return state.lastOrder ? renderConfirmation() : renderEmptyCart("checkout");
  }

  return `
    <section aria-labelledby="checkout-heading">
      <div class="page-intro"><div><p class="section-kicker">ALMOST THERE</p><h2 id="checkout-heading">Checkout</h2></div></div>
      <div class="checkout-panel">
        <h2>Order Summary</h2>
        <div class="checkout-items">${[...state.cart.entries()].map(([productId, quantity]) => checkoutItem(productId, quantity)).join("")}</div>
        <div class="cart-summary">
          <div class="summary-total"><span>Total</span><strong>${money(getCartTotal())}</strong></div>
          <div class="action-group">
            <a class="secondary-button" href="#cart" data-page="cart">Back to Shopping Cart</a>
            <button class="primary-button" type="button" data-action="process-order">Process Order</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  pageTitle.textContent = pageNames[state.page];
  document.querySelectorAll(".primary-nav [data-page]").forEach((link) => {
    if (link.dataset.page === state.page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const views = { products: renderProducts, details: renderDetails, cart: renderCart, checkout: renderCheckout };
  pageContent.innerHTML = views[state.page]();
  updateCartBadge();
}

function navigate(page, options = {}) {
  if (page === "details" && !state.selectedProductId) {
    page = "products";
  }

  state.page = page;
  const hash = `#${page}`;
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    render();
  }

  if (options.focus) {
    window.requestAnimationFrame(() => pageContent.focus());
  }
}

function addToCart(productId) {
  const input = pageContent.querySelector(`[data-product-quantity="${productId}"]`);
  const error = pageContent.querySelector(`[data-product-error="${productId}"]`);
  const quantity = input.valueAsNumber;
  if (!Number.isInteger(quantity) || quantity < 1) {
    error.textContent = "Enter a whole quantity of 1 or more.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  state.cart.set(productId, (state.cart.get(productId) ?? 0) + quantity);
  state.lastOrder = null;
  showMessage(`${getProduct(productId).name} added to your basket.`);
  render();
}

function changeCartQuantity(productId, quantity, input) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    input.value = state.cart.get(productId);
    showMessage("Choose a whole quantity of 1 or more, or remove the item.");
    return;
  }

  state.cart.set(productId, quantity);
  state.lastOrder = null;
  render();
}

function processOrder() {
  if (state.cart.size === 0) {
    return;
  }

  state.lastOrder = { total: getCartTotal() };
  state.cart.clear();
  showMessage("Order confirmed. No payment was processed.");
  render();
}

document.addEventListener("click", (event) => {
  const pageLink = event.target.closest("a[data-page]");
  if (pageLink) {
    event.preventDefault();
    navigate(pageLink.dataset.page, { focus: true });
    return;
  }

  const brandLink = event.target.closest(".brand");
  if (brandLink) {
    event.preventDefault();
    navigate("products", { focus: true });
    return;
  }

  if (event.target.closest("#cart-shortcut")) {
    navigate("cart", { focus: true });
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const { action, productId } = actionButton.dataset;
  if (action === "details") {
    state.selectedProductId = productId;
    navigate("details", { focus: true });
  } else if (action === "add") {
    addToCart(productId);
  } else if (action === "remove") {
    state.cart.delete(productId);
    state.lastOrder = null;
    render();
  } else if (action === "increment" || action === "decrement") {
    const current = state.cart.get(productId);
    const next = action === "increment" ? current + 1 : current - 1;
    if (next < 1) {
      showMessage("Use Remove to take this item out of your basket.");
    } else {
      state.cart.set(productId, next);
      state.lastOrder = null;
      render();
    }
  } else if (action === "process-order") {
    processOrder();
  }
});

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-cart-quantity]");
  if (input) {
    changeCartQuantity(input.dataset.cartQuantity, input.valueAsNumber, input);
  }
});

window.addEventListener("hashchange", () => {
  const requestedPage = window.location.hash.slice(1);
  state.page = Object.hasOwn(pageNames, requestedPage) ? requestedPage : "products";
  if (state.page === "details" && !state.selectedProductId) {
    state.page = "products";
    window.history.replaceState(null, "", "#products");
  }
  render();
});

const initialPage = window.location.hash.slice(1);
if (Object.hasOwn(pageNames, initialPage) && initialPage !== "details") {
  state.page = initialPage;
}
render();