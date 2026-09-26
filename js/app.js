/* ============================================================
   VENDORA — App logic: cart, rendering, UI
   ============================================================ */

/* ---------- Cart (localStorage) ---------- */
const CART_KEY = "vendora_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function findItem(id) {
  return PRODUCTS.find(p => p.id === id) || FOOD.find(p => p.id === id);
}

function addToCart(id, qty) {
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty += (qty || 1);
  else cart.push({ id, qty: qty || 1 });
  saveCart(cart);
  updateCartUI();
  const item = findItem(id);
  showToast("✔ " + (item ? item.name : "Item") + " added to cart");
}
function removeFromCart(id) {
  saveCart(getCart().filter(l => l.id !== id));
  updateCartUI();
  if (typeof renderCheckout === "function") renderCheckout();
}
function changeQty(id, delta) {
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty < 1) return removeFromCart(id);
  saveCart(cart);
  updateCartUI();
  if (typeof renderCheckout === "function") renderCheckout();
}
function cartCount() { return getCart().reduce((n, l) => n + l.qty, 0); }
function cartSubtotal() {
  return getCart().reduce((sum, l) => {
    const item = findItem(l.id);
    return sum + (item ? item.price * l.qty : 0);
  }, 0);
}

/* ---------- Cart UI ---------- */
function updateCartUI() {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
  const wrap = document.getElementById("drawerItems");
  if (!wrap) return;
  const cart = getCart();
  if (!cart.length) {
    wrap.innerHTML = '<div class="cart-empty"><div class="big">🛒</div><b>Your cart is empty</b><p style="margin-top:6px;font-size:14px">Browse our store and add something you love.</p></div>';
  } else {
    wrap.innerHTML = cart.map(l => {
      const item = findItem(l.id);
      if (!item) return "";
      return `
      <div class="cart-item">
        <img src="${item.img}" alt="" onerror="this.outerHTML='<div class=ph-sm>📦</div>'">
        <div>
          <h4>${item.name}</h4>
          <div class="ci-price">${formatNaira(item.price)} each</div>
          <div class="qty" style="margin-top:6px">
            <button onclick="changeQty('${item.id}',-1)" aria-label="Decrease">−</button>
            <span>${l.qty}</span>
            <button onclick="changeQty('${item.id}',1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <b style="color:var(--navy)">${formatNaira(item.price * l.qty)}</b>
          <button class="ci-remove" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>`;
    }).join("");
  }
  const sub = cartSubtotal();
  const subEl = document.getElementById("drawerSubtotal");
  if (subEl) subEl.textContent = formatNaira(sub);
  const note = document.getElementById("deliveryNote");
  if (note) {
    note.textContent = sub >= STORE.freeDeliveryOver
      ? "🎉 You qualify for FREE delivery!"
      : "Add " + formatNaira(STORE.freeDeliveryOver - sub) + " more for free delivery";
  }
  const checkoutBtn = document.getElementById("drawerCheckout");
  if (checkoutBtn) checkoutBtn.disabled = !cart.length;
  if (checkoutBtn) checkoutBtn.style.opacity = cart.length ? "1" : ".5";
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("show");
  document.getElementById("cartOverlay").classList.add("show");
  updateCartUI();
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("show");
  document.getElementById("cartOverlay").classList.remove("show");
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast"; el.className = "toast";
    document.body.appendChild(el);
  }
  el.innerHTML = '<span class="tick">✔</span>' + msg.replace(/^✔\s*/, "");
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Rendering helpers ---------- */
function stars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function productCard(p) {
  const sale = p.oldPrice ? `<span class="badge">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : "";
  return `
  <article class="card">
    <div class="card-media">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.outerHTML='<div class=ph>📦</div>'">
      ${sale}
    </div>
    <div class="card-body">
      <span class="card-cat">${p.cat}</span>
      <h3 class="card-title">${p.name}</h3>
      <div class="stars">${stars(p.rating)}<small>(${p.sold}+ sold)</small></div>
      <div class="price-row">
        <span class="price">${formatNaira(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatNaira(p.oldPrice)}</span>` : ""}
      </div>
      <button class="btn btn-gold btn-sm btn-block" onclick="addToCart('${p.id}')">Add to Cart</button>
    </div>
  </article>`;
}

function foodCard(f) {
  return `
  <article class="food-card">
    <div class="food-media">
      <img src="${f.img}" alt="${f.name}" loading="lazy"
           onerror="this.outerHTML='<div class=ph>🍕</div>'">
    </div>
    <div class="food-body">
      <h3>${f.name}</h3>
      <p>${f.desc}</p>
      <div class="stars">${stars(f.rating)}</div>
      <div class="food-row">
        <span class="price">${formatNaira(f.price)}</span>
        <button class="btn btn-gold btn-sm" onclick="addToCart('${f.id}')">Add to Order</button>
      </div>
    </div>
  </article>`;
}

/* ---------- Shop page ---------- */
let shopState = { cat: "all", q: "", sort: "featured" };

function renderShop() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  let list = PRODUCTS.filter(p =>
    (shopState.cat === "all" || p.cat === shopState.cat) &&
    (p.name.toLowerCase().includes(shopState.q) || p.desc.toLowerCase().includes(shopState.q))
  );
  if (shopState.sort === "low") list.sort((a, b) => a.price - b.price);
  if (shopState.sort === "high") list.sort((a, b) => b.price - a.price);
  if (shopState.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  document.getElementById("resultCount").textContent = list.length + " product" + (list.length === 1 ? "" : "s");
  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : '<div class="cart-empty" style="grid-column:1/-1"><div class="big">🔍</div><b>No products match your search</b><p style="margin-top:6px">Try a different keyword or category.</p></div>';
}

function setShopCat(cat, chipEl) {
  shopState.cat = cat;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  if (chipEl) chipEl.classList.add("active");
  renderShop();
}

/* ---------- Food page ---------- */
let foodCat = "All";
function renderFood() {
  const grid = document.getElementById("foodGrid");
  if (!grid) return;
  const list = FOOD.filter(f => foodCat === "All" || f.cat === foodCat);
  grid.innerHTML = list.map(foodCard).join("");
}
function setFoodCat(cat, chipEl) {
  foodCat = cat;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  if (chipEl) chipEl.classList.add("active");
  renderFood();
}

/* ---------- Checkout ---------- */
function renderCheckout() {
  const wrap = document.getElementById("checkoutWrap");
  if (!wrap) return;
  const cart = getCart();
  if (!cart.length) {
    wrap.innerHTML = `
      <div class="panel success-box">
        <div class="big">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <a class="btn btn-navy" href="shop.html">Continue Shopping</a>
      </div>`;
    return;
  }
  const subtotal = cartSubtotal();
  const delivery = subtotal >= STORE.freeDeliveryOver ? 0 : STORE.deliveryFee;
  wrap.innerHTML = `
    <div class="panel">
      <h3>Delivery Details</h3>
      <form id="orderForm" onsubmit="return placeOrder(event)">
        <div class="form-grid">
          <div class="field"><label>Full Name *</label><input name="name" required placeholder="e.g. Adaeze Okonkwo"></div>
          <div class="field"><label>Phone Number *</label><input name="phone" required placeholder="e.g. 0803 123 4567"></div>
          <div class="field full"><label>Email Address</label><input name="email" type="email" placeholder="you@example.com"></div>
          <div class="field full"><label>Delivery Address *</label><input name="address" required placeholder="Street, area, city"></div>
          <div class="field full"><label>Order Notes (optional)</label><textarea name="notes" rows="2" placeholder="Landmarks, gift note, extra spicy..."></textarea></div>
        </div>
        <h3 style="margin:24px 0 14px">Delivery Method</h3>
        <div class="radio-row">
          <label class="radio-opt"><input type="radio" name="method" value="Home Delivery" checked>
            <span><b>Home Delivery</b><small>Delivered to your address · ${formatNaira(delivery)}</small></span></label>
          <label class="radio-opt"><input type="radio" name="method" value="Store Pickup">
            <span><b>Store Pickup</b><small>Collect at ${STORE.address} · Free</small></span></label>
        </div>
        <h3 style="margin:24px 0 14px">Payment Method</h3>
        <div class="radio-row">
          <label class="radio-opt"><input type="radio" name="payment" value="Pay on Delivery" checked>
            <span><b>Pay on Delivery</b><small>Cash or transfer when your order arrives</small></span></label>
          <label class="radio-opt"><input type="radio" name="payment" value="Bank Transfer">
            <span><b>Bank Transfer</b><small>We'll send account details after you order</small></span></label>
          <label class="radio-opt"><input type="radio" name="payment" value="Card Online (coming soon)" disabled>
            <span><b>Card Online</b><small>Paystack checkout — available soon</small></span></label>
        </div>
      </form>
    </div>
    <div class="panel">
      <h3>Order Summary</h3>
      <div id="summaryItems"></div>
      <div class="summary-line"><span>Subtotal</span><span>${formatNaira(subtotal)}</span></div>
      <div class="summary-line"><span>Delivery</span><span>${delivery === 0 ? "FREE 🎉" : formatNaira(delivery)}</span></div>
      <div class="summary-line summary-total"><span>Total</span><span>${formatNaira(subtotal + delivery)}</span></div>
      <button class="btn btn-gold btn-block" style="margin-top:18px" onclick="submitIfValid()">Place Order via WhatsApp</button>
      <p style="font-size:12.5px;color:var(--muted);margin-top:10px;text-align:center">Your order is sent to our team instantly — we confirm price, stock and delivery time before payment.</p>
    </div>`;
  document.getElementById("summaryItems").innerHTML = cart.map(l => {
    const item = findItem(l.id);
    return item ? `<div class="summary-line"><span>${item.name} × ${l.qty}</span><span>${formatNaira(item.price * l.qty)}</span></div>` : "";
  }).join("");
}

function submitIfValid() {
  const f = document.getElementById("orderForm");
  if (!f.reportValidity()) return;
  f.requestSubmit();
}

function placeOrder(e) {
  e.preventDefault();
  const f = e.target;
  const data = Object.fromEntries(new FormData(f));
  const cart = getCart();
  const subtotal = cartSubtotal();
  const delivery = subtotal >= STORE.freeDeliveryOver ? 0 : STORE.deliveryFee;
  const items = cart.map(l => {
    const item = findItem(l.id);
    return `• ${item.name} × ${l.qty} — ${formatNaira(item.price * l.qty)}`;
  }).join("\n");

  const msg =
    `*NEW ORDER — ${STORE.name}*\n\n` +
    `*Items:*\n${items}\n\n` +
    `Subtotal: ${formatNaira(subtotal)}\n` +
    `Delivery: ${delivery === 0 ? "FREE" : formatNaira(delivery)}\n` +
    `*TOTAL: ${formatNaira(subtotal + delivery)}*\n\n` +
    `*Customer:*\n${data.name}\n${data.phone}\n${data.email || "—"}\n` +
    `Address: ${data.method === "Store Pickup" ? "Store pickup" : data.address}\n` +
    `Method: ${data.method}\nPayment: ${data.payment}\n` +
    (data.notes ? `Notes: ${data.notes}\n` : "");

  saveCart([]);
  updateCartUI();
  window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  const wrap = document.getElementById("checkoutWrap");
  wrap.innerHTML = `
    <div class="panel success-box">
      <div class="big">🎉</div>
      <h2>Order placed!</h2>
      <p>WhatsApp is opening with your order details. Our team will confirm your order shortly.<br>If it didn't open, call us at <b>${STORE.phoneDisplay}</b>.</p>
      <a class="btn btn-navy" href="index.html">Back to Home</a>
    </div>`;
  return false;
}

/* ---------- Misc UI ---------- */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".icon-btn, .nav-links, .menu-toggle")) {
    document.getElementById("navLinks")?.classList.remove("open");
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCart();
});

function heroSearch(e) {
  e.preventDefault();
  const q = document.getElementById("heroQuery").value.trim();
  window.location.href = "shop.html?q=" + encodeURIComponent(q);
}
