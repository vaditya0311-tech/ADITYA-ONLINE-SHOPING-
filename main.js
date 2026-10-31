'use strict';

const products = [
  { id: 'berry-cake', category: 'cakes', emoji: '🍰', badge: 'Bestseller', name: 'Berry cloud cake', description: 'Vanilla sponge, whipped cream and heaps of fresh berries.', price: 520, background: '#f1ded6' },
  { id: 'choco-cake', category: 'cakes', emoji: '🍫', badge: 'Made today', name: 'Midnight chocolate cake', description: 'Deep cocoa layers with a silky chocolate ganache.', price: 580, background: '#e8d8ca' },
  { id: 'croissant', category: 'pastries', emoji: '🥐', badge: 'Oven-fresh', name: 'Butter croissant', description: 'Crisp, golden layers folded with real butter.', price: 120, background: '#f2e7d2' },
  { id: 'strawberry-tart', category: 'pastries', emoji: '🍓', badge: 'Seasonal', name: 'Strawberry tart', description: 'A crisp pastry shell filled with vanilla cream.', price: 190, background: '#f2dedc' },
  { id: 'cookies', category: 'cookies', emoji: '🍪', badge: 'Customer fave', name: 'Choc chip cookies', description: 'A little crisp on the edge, soft in the middle.', price: 160, background: '#e8dfd0' },
  { id: 'cupcake', category: 'cakes', emoji: '🧁', badge: 'Little treat', name: 'Vanilla buttercream cupcake', description: 'Soft vanilla cake finished with a swirl of buttercream.', price: 150, background: '#eadfea' },
  { id: 'cinnamon-roll', category: 'pastries', emoji: '🥮', badge: 'Warm & cosy', name: 'Cinnamon morning roll', description: 'Soft, spiced, swirled and finished with a sweet glaze.', price: 180, background: '#efe0cf' },
  { id: 'macarons', category: 'cookies', emoji: '🍬', badge: 'Box of 4', name: 'Pastel macarons', description: 'Delicate almond shells with a creamy centre.', price: 280, background: '#e3eadc' },
];

const money = amount => `₹${amount.toLocaleString('en-IN')}`;
const storedProfile = localStorage.getItem('sugarCrumbProfile');
let profile = storedProfile ? JSON.parse(storedProfile) : null;
const storedCart = localStorage.getItem('sugarCrumbCart');
let cart = storedCart ? JSON.parse(storedCart) : {};
let currentLocation = null;

function saveCart() {
  localStorage.setItem('sugarCrumbCart', JSON.stringify(cart));
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.replaceChildren();

  products.filter(product => filter === 'all' || product.category === filter).forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-visual" style="--product-bg:${product.background}">
        <span class="product-label">${product.badge}</span>
        <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><h3>${product.name}</h3><span class="product-price">${money(product.price)}</span></div>
        <p>${product.description}</p>
        <button class="add-button" type="button" data-add="${product.id}">Add to basket&nbsp; +</button>
      </div>`;
    grid.appendChild(card);
  });
}

function renderCart() {
  const items = document.getElementById('basketItems');
  items.replaceChildren();
  const entries = products.filter(product => cart[product.id] > 0);
  const count = entries.reduce((total, product) => total + cart[product.id], 0);
  const subtotal = entries.reduce((total, product) => total + product.price * cart[product.id], 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('basketSubtotal').textContent = money(subtotal);

  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-basket';
    empty.innerHTML = 'Your basket is waiting for something sweet. <a href="#shop">Browse the menu →</a>';
    items.appendChild(empty);
    return;
  }

  entries.forEach(product => {
    const row = document.createElement('div');
    row.className = 'basket-item';
    row.innerHTML = `
      <span class="basket-item-emoji" aria-hidden="true">${product.emoji}</span>
      <div><div class="basket-item-name">${product.name}</div><span class="basket-item-price">${money(product.price)} each</span></div>
      <div class="quantity-control" aria-label="Quantity for ${product.name}">
        <button type="button" data-change="-1" data-id="${product.id}" aria-label="Remove one ${product.name}">−</button>
        <span>${cart[product.id]}</span>
        <button type="button" data-change="1" data-id="${product.id}" aria-label="Add one ${product.name}">+</button>
      </div>
      <button type="button" class="remove-item" data-remove="${product.id}">Remove</button>`;
    items.appendChild(row);
  });
}

function setProfile(nextProfile) {
  profile = nextProfile;
  localStorage.setItem('sugarCrumbProfile', JSON.stringify(profile));
  document.getElementById('checkoutEmail').value = profile.email;
  document.getElementById('checkoutAddress').value = profile.address;
  document.getElementById('loginEmail').value = profile.email;
  document.getElementById('loginAddress').value = profile.address;
  document.getElementById('loginButton').textContent = 'My account';
}

function updateMap(container, latitude, longitude) {
  const frame = document.createElement('iframe');
  const padding = 0.008;
  const bounds = `${longitude - padding}%2C${latitude - padding}%2C${longitude + padding}%2C${latitude + padding}`;
  frame.className = 'map-frame';
  frame.title = 'Map showing your delivery location';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer';
  frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bounds}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  container.replaceChildren(frame);
}

function requestLocation() {
  const message = document.getElementById('deliveryLocationMessage');
  if (!navigator.geolocation) {
    message.textContent = 'Location is not supported by this browser. You can still enter your full delivery address.';
    return;
  }

  message.textContent = 'Finding your location…';
  navigator.geolocation.getCurrentPosition(
    position => {
      currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      updateMap(document.getElementById('deliveryMap'), currentLocation.latitude, currentLocation.longitude);
      updateMap(document.getElementById('checkoutMap'), currentLocation.latitude, currentLocation.longitude);
      message.textContent = 'Location found! Please still enter your full address for delivery.';
    },
    error => {
      const errorMessage = error.code === error.PERMISSION_DENIED
        ? 'Location permission was denied. Please enter your full delivery address instead.'
        : 'We could not find your location. Please enter your full delivery address instead.';
      message.textContent = errorMessage;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
  );
}

function openLogin() {
  const dialog = document.getElementById('loginDialog');
  if (!dialog.open) dialog.showModal();
}

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProducts();
  renderCart();
  if (profile) setProfile(profile);

  document.querySelectorAll('.category-tab').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.category-tab.active')?.classList.remove('active');
      button.classList.add('active');
      renderProducts(button.dataset.filter);
    });
  });

  document.getElementById('productGrid').addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    const id = button.dataset.add;
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    button.textContent = 'Added to basket ✓';
    window.setTimeout(() => { button.textContent = 'Add to basket  +'; }, 1100);
  });

  document.getElementById('basketItems').addEventListener('click', event => {
    const changeButton = event.target.closest('[data-change]');
    const removeButton = event.target.closest('[data-remove]');
    if (changeButton) {
      const id = changeButton.dataset.id;
      cart[id] += Number(changeButton.dataset.change);
      if (cart[id] <= 0) delete cart[id];
    } else if (removeButton) {
      delete cart[removeButton.dataset.remove];
    } else {
      return;
    }
    saveCart();
    renderCart();
  });

  const dialog = document.getElementById('loginDialog');
  document.getElementById('loginButton').addEventListener('click', openLogin);
  document.getElementById('closeLogin').addEventListener('click', () => dialog.close());
  document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setProfile({
      email: document.getElementById('loginEmail').value.trim(),
      address: document.getElementById('loginAddress').value.trim(),
    });
    dialog.close();
  });

  document.getElementById('deliveryLocationButton').addEventListener('click', requestLocation);
  document.getElementById('checkoutLocationButton').addEventListener('click', requestLocation);
  document.getElementById('checkoutForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = document.getElementById('checkoutMessage');
    message.classList.remove('error');
    if (!form.reportValidity()) return;
    if (!Object.values(cart).some(quantity => quantity > 0)) {
      message.textContent = 'Your basket is empty. Add a treat from the menu first.';
      message.classList.add('error');
      return;
    }
    if (!profile) {
      message.textContent = 'Please sign in with your email and delivery address to place an order.';
      message.classList.add('error');
      openLogin();
      return;
    }
    const email = document.getElementById('checkoutEmail').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    if (email !== profile.email || address !== profile.address) {
      setProfile({ email, address });
    }
    message.textContent = 'Thanks! Your order is ready. This demo does not send orders to a bakery.';
    cart = {};
    saveCart();
    renderCart();
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}

document.addEventListener('DOMContentLoaded', init);
